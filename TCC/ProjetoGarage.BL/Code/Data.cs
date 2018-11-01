using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
using System.Xml.Linq;

namespace ProjetoGarage.BL.Code
{
    public class Data : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext app)
        {
            var request = app.Request;
            var response = app.Response;
            try
            {
                switch (request.HttpMethod.ToUpper())
                {
                    case "OPTIONS":
                        {
                            response.Write("{\"Message\": \"Procede\"}");
                            break;
                        }
                    case "GET":
                    case "PUT":
                    case "POST":
                    case "DELETE":
                        {
                            response.Write(ProcessRequests(app));
                            response.StatusCode = 200;
                            break;
                        }
                }
            }
            catch (Exception ex)
            {
                ProcessError(ex, app);
            }
            finally
            {
                response.ContentType = "application/json";
                response.ContentEncoding = UTF8Encoding.UTF8;
                try
                {
                    response.AddHeader("DateTime", DateTime.Now.ToString());
                }
                catch (Exception ex)
                {

                }
                response.End();
            }
        }

        public string ProcessRequests(HttpContext app)
        {
            var postData = GetPostData(app);
            var queryString = app.Request.QueryString;
            string database = GetQueryValue(queryString, "database");
            string procedure = GetQueryValue(queryString, "procedure", GetFallbackProcedure(app));
            string page = GetQueryValue(queryString, "page");
            string limit = GetQueryValue(queryString, "limit");
            string start = GetQueryValue(queryString, "start");
            string filter = GetQueryValue(queryString, "filter");
            string filterGrid = GetQueryValue(queryString, "filterGrid");
            string sort = GetQueryValue(queryString, "sort");
            string group = GetQueryValue(queryString, "group");
            string operation = app.Request.HttpMethod;
            string query = GetQueryValue(queryString, "query");
            string @params = GetQueryValue(queryString, "params");
            
            IJSONReaderRequestBody jsonReaderRequestBody = new SQLJSONReaderRequestBody()
            {
                UserId = app.Session["UsuarioId"] != null ? Convert.ToInt32(app.Session["UsuarioId"]) : 0,
                UserCompanyId = 1,
                Database = database,
                Procedure = procedure,
                Page = app.Request.HttpMethod == "GET" ? int.Parse(page) : 0,
                Limit = app.Request.HttpMethod == "GET" ? int.Parse(limit) : 0,
                Start = app.Request.HttpMethod == "GET" ? int.Parse(start) : 0,
                Filter = filter,
                FilterGrid = filterGrid,
                Sort = sort,
                Query = query,
                Group = @group,
                Operation = operation,
                PostData = postData,
                Params = @params,
                Headers = app.Request.Headers,
                ServerVariables = app.Request.ServerVariables
            };
            JSONHandler js = new JSONHandler();
            string retorno = js.GetJson(jsonReaderRequestBody);
            return retorno;
        }

        private string GetFallbackProcedure(HttpContext app)
        {
            return !IsLogonUrl(app) ? string.Empty : "";
        }

        private static bool IsLogonUrl(HttpContext app)
        {
            return app.Request.Url.AbsolutePath.Equals("/logon", StringComparison.InvariantCultureIgnoreCase);
        }

        private string GetQueryValue(NameValueCollection queryString, string key)
        {
            return GetQueryValue(queryString, key, string.Empty);
        }

        private string GetQueryValue(NameValueCollection queryString, string key, string fallbackValue)
        {
            return queryString.AllKeys.Contains(key, StringComparer.InvariantCultureIgnoreCase) ? queryString[key] : fallbackValue;
        }

        private string GetPostData(HttpContext app)
        {
            string postData = null;
            if (app.Request.InputStream != null)
            {
                using (StreamReader streamReader = new StreamReader(app.Request.InputStream, app.Request.ContentEncoding))
                {
                    try
                    {
                        postData = streamReader.ReadToEnd();
                        postData = !string.IsNullOrEmpty(postData) ? XDocument.Parse(postData).ToString() : postData;
                    }
                    catch (Exception)
                    {
                        postData = string.Empty;
                    }
                }
            }
            return postData;
        }

        public void ProcessError(Exception ex, HttpContext app)
        {
            if (ex.GetBaseException() != null)
            {
                ex = ex.GetBaseException();
            }

            HttpContext.Current.ClearError();
            var response = HttpContext.Current.Response;
            response.Clear();
            var sb = new StringBuilder();
            var sw = new StringWriter(sb);

            using (JsonWriter jsonWriter = new JsonTextWriter(sw))
            {
                jsonWriter.Formatting = Formatting.Indented;
                jsonWriter.WriteStartObject();

                ExceptionMessageBuilder(ex, jsonWriter);

                jsonWriter.WriteEndObject();
            }

            var buffer = Encoding.UTF8.GetBytes(sb.ToString());

            var erroDeUploadNoIE = app.Request.ContentType.StartsWith("multipart/form-data;", StringComparison.InvariantCultureIgnoreCase) &&
                                   !string.IsNullOrEmpty(app.Request.UserAgent) &&
                                   app.Request.UserAgent.ToLower().Contains("msie");
            response.ContentEncoding = Encoding.UTF8;
            response.ContentType = !erroDeUploadNoIE ? "application/json" : "text/plain";
            response.StatusCode = !erroDeUploadNoIE ? 500 : 200;
            response.StatusDescription = "Server Error";
            response.TrySkipIisCustomErrors = true;

            response.OutputStream.Write(buffer, 0, buffer.Length);
        }

        void ExceptionMessageBuilder(Exception ex, JsonWriter jsonWriter)
        {
            // SqlException
            if (ex is SqlException)
            {
                var sqlException = (SqlException)ex;

                jsonWriter.WritePropertyName("errorCode");
                jsonWriter.WriteValue(sqlException.ErrorCode);

                jsonWriter.WritePropertyName("message");
                jsonWriter.WriteValue(ex.Message);

                jsonWriter.WritePropertyName("number");
                jsonWriter.WriteValue(sqlException.Number);

                jsonWriter.WritePropertyName("procedure");
                jsonWriter.WriteValue(sqlException.Procedure);

                jsonWriter.WritePropertyName("LineNumber");
                jsonWriter.WriteValue(sqlException.LineNumber);
            }
            else
            {
                jsonWriter.WritePropertyName("message");
                jsonWriter.WriteValue(ex.Message);
            }
#if DEBUG
            jsonWriter.WritePropertyName("stackTrace");
            jsonWriter.WriteValue(ex.StackTrace);
#endif
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
