using System;
using System.IO;
using System.Web;
using System.Web.SessionState;
using System.Xml.Linq;
using ProjetoGarage.BL.Code;
using System.Linq;

namespace ProjetoGarage.BL.Handlers
{
    public class GenerateXls : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Params != null && !context.Request.Params.AllKeys.Contains("GetToken"))
            {
                XDocument xDocument = GetXMLdata(context);
                Code.GenerateXls obj = new Code.GenerateXls(xDocument, context.Request.Params["excelConfig"]);

                context.Response.ContentType = "text/html";
                context.Response.Write(context.Request.Params["excelConfig"]);

                context.Response.End();
            }
            else if (context.Request.Params != null &&
                     context.Request.Params.AllKeys.Contains("GetToken"))
            {
                string token = context.Request.Params["GetToken"];
                string guid = context.Request.Params["Guid"];
                string fileName = Path.Combine(Path.GetTempPath(), guid, token);
                if (File.Exists(fileName))
                {
                    context.Response.ContentType = "text/html";
                    context.Response.AddHeader("Content-Disposition", "attachment; filename=" + token + ".xlsx");
                    context.Response.BinaryWrite(File.ReadAllBytes(fileName));
                }
                else
                {
                    context.Response.ContentType = "text/html";
                }

                File.Delete(fileName);
                context.Response.End();
            }
        }

        private static XDocument GetXMLdata(HttpContext context)
        {
            JSONHandler jsonHandler = new JSONHandler();
            IJSONReaderRequestBody jsonReaderRequestBody = new JSONReaderRequestBody()
            {
                UserId = context.Session["UsuarioId"] != null ? int.Parse(context.Session["UsuarioId"].ToString()) : -1,
                UserCompanyId = context.Session["UsuarioEmpresaId"] != null ? int.Parse(context.Session["UsuarioEmpresaId"].ToString()) : -1,
                Database = "ProjetoGarage",
                Procedure = context.Request.Params["procedure"],
                Page = 1,
                Params = context.Request.Params["params"],
                Limit = Int32.MaxValue,
                Start = 1,
                Headers = context.Request.Headers,
                ServerVariables = context.Request.ServerVariables
            };
            string returnValue = jsonHandler.GetJson(jsonReaderRequestBody);
            XNode xmlNode = Newtonsoft.Json.JsonConvert.DeserializeXNode(returnValue, "data");
            XDocument xDocument = XDocument.Parse(xmlNode.ToString());
            return xDocument;
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}