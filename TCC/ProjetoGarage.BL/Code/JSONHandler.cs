using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml.Linq;
using Newtonsoft.Json;

namespace ProjetoGarage.BL.Code
{
    public class JSONHandler : IJSONReader
    {
        #region Constantes

        const string RECORDS_TOTAL = "TotalLinhas";

        const string RESULT = "result";

        const string SUCCESS = "success";

        private const string TOKEN_DATA = "tokenData";

        private const string NODE_BS = "TCC";
        private const string NODE_CONFIG = "config";
        private const string NODE_PAGE = "Page";
        private const string NODE_LIMIT = "Limit";
        private const string NODE_START = "Start";
        private const string NODE_GROUP = "Group";
        private const string NODE_SORT = "Sort";
        private const string NODE_FILTER = "Filter";
        private const string NODE_AUDITORIA = "auditoria";
        private const string NODE_USUARIO_ID = "UsuarioId";
        private const string NODE_USUARIO_EMPRESA_ID = "UsuarioEmpresaId";
        private const string NODE_PARAMS = "params";
        private const string NODE_HEADERS = "Headers";
        private const string NODE_SERVER_VARIABLES = "ServerVariables";
        //Sql Parameters
        private const string SQL_PARAMETER_XML_IN = "XmlIn";
        private const string SQL_PARAMETER_XML_OUT = "XmlOut";
        private const string NODE_QUERY = "Query";

        #endregion

        #region Variables

        string connectionString = string.Empty;
        #endregion

        #region Ctor

        public JSONHandler()
        {
            connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Padrao"].ToString();
        }

        #endregion

        #region Methods
        public string GetJson(IJSONReaderRequestBody jsonReaderRequestBody)
        {
            string jsonResultSet = string.Empty;
            StringBuilder jsonExtraResultSet = new StringBuilder();
            int extraResultSetCount = 0;
            string xmlIn = BuildXmlIn(jsonReaderRequestBody);
#if DEBUG
            DebugJsonReaderRequestBody(jsonReaderRequestBody, xmlIn);
#endif
            string xmlOut = string.Empty;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(jsonReaderRequestBody.Procedure, connection))
                {
                    command.CommandTimeout = 0;
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(SQL_PARAMETER_XML_IN, SqlDbType.Xml).Value = xmlIn;
                    command.Parameters.Add(SQL_PARAMETER_XML_OUT, SqlDbType.Xml).Direction = ParameterDirection.Output;
                    command.Connection = connection;
                    command.Connection.Open();
                    ConfigureDatabase(jsonReaderRequestBody, connection);
                    SqlTransaction transaction = connection.BeginTransaction();
                    command.Transaction = transaction;
                    using (SqlDataReader dataReader = command.ExecuteReader())
                    {
                        try
                        {
                            jsonResultSet = DataReaderToJson(dataReader, jsonReaderRequestBody.TokenData);
                            while (!dataReader.IsClosed && dataReader.NextResult())
                            {
                                extraResultSetCount++;
                                jsonExtraResultSet.Append(string.Format("\t\t\t\t\t\t,\"resultSet{0}\" : ", extraResultSetCount));
                                jsonExtraResultSet.Append(DataReaderToJson(dataReader, jsonReaderRequestBody.TokenData));
                                jsonExtraResultSet.Append(Environment.NewLine);
#if DEBUG
                                //Em caso do funcionamento em DEBUG, ele coloca o xml de saída para ser utilizado na camada cliente.
#endif
                            }
                            if (extraResultSetCount > 0)
                            {
                                StringBuilder tempString = new StringBuilder();
                                tempString.AppendLine(jsonResultSet.Substring(0, jsonResultSet.LastIndexOf("}") - 1));
                                tempString.AppendLine(jsonExtraResultSet.ToString());
                                tempString.AppendLine(string.Concat(",\"resultSetsCount\" : ", extraResultSetCount));
                                jsonExtraResultSet.Append(Environment.NewLine);
                                tempString.AppendLine("}");
                                jsonResultSet = tempString.ToString();
                            }

                            if (!dataReader.IsClosed)
                            {
                                dataReader.Close();
                            }

                            xmlOut = command.Parameters[SQL_PARAMETER_XML_OUT].Value.ToString();
#if DEBUG
                            jsonResultSet = string.Concat(jsonResultSet, "\n\n/*\n", XDocument.Parse(command.Parameters[SQL_PARAMETER_XML_OUT].Value.ToString()).ToString(), "\n\n*/");
#endif

                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            transaction.Rollback();
                            throw ex;
                        }
                        finally
                        {
                            if (dataReader != null)
                            {
                                if (!dataReader.IsClosed)
                                {
                                    dataReader.Close();
                                }
                                dataReader.Dispose();
                            }
                        }
                    }
                    command.Connection.Close();
                    try
                    {
                        jsonReaderRequestBody.OnProcess?.Invoke(XDocument.Parse(xmlOut));
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
            return jsonResultSet;
        }
#if DEBUG
        private void DebugJsonReaderRequestBody(IJSONReaderRequestBody jsonReaderRequestBody, string xmlIn)
        {
            StringBuilder debugText = new StringBuilder();
            debugText.AppendLine(string.Format("USE {0}", jsonReaderRequestBody.Database));
            debugText.AppendLine("GO");
            debugText.AppendLine("DECLARE @XmlOut XML");

            debugText.Append("EXEC ");
            debugText.Append(jsonReaderRequestBody.Procedure);
            debugText.Append(" '");
            debugText.Append(xmlIn);
            debugText.Append("', @XmlOut OUT");
            debugText.AppendLine(Environment.NewLine);
            Debug.WriteLine(debugText);
        }
#endif
        private string BuildXmlIn(IJSONReaderRequestBody jsonReaderRequestBody)
        {
            Dictionary<string, object> parametros = new Dictionary<string, object>();
            Dictionary<string, SqlDbType> tipos = new Dictionary<string, SqlDbType>();

            XElement xPostData = null;

            XElement xParametros = new XElement(NODE_PARAMS);
            GetParametros(jsonReaderRequestBody.Params, parametros, tipos);
            for (var i = 0; i < parametros.Count; i++)
            {
                xParametros.Add(new XElement(parametros.ElementAt(i).Key, parametros.ElementAt(i).Value.ToString()));
            }

            XElement xHeaders = new XElement(NODE_HEADERS);
            for (var i = 0; i < jsonReaderRequestBody.Headers.Count; i++)
            {
                string key = jsonReaderRequestBody.Headers.AllKeys[i];
                xHeaders.Add(new XElement(key, jsonReaderRequestBody.Headers[key]));
            }

            XElement xServerVariables = new XElement(NODE_SERVER_VARIABLES);
            if (jsonReaderRequestBody is SQLJSONReaderRequestBody)
            {
                ((SQLJSONReaderRequestBody)jsonReaderRequestBody).ValidateServerVariables();
            }

            var serverVariables = jsonReaderRequestBody.ServerVariables.AllKeys.ToList();
            for (var i = 0; i < serverVariables.Count; i++)
            {
                string key = serverVariables[i];
                xServerVariables.Add(new XElement(key, jsonReaderRequestBody.ServerVariables[key]));
            }

            try
            {
                if (!string.IsNullOrEmpty(jsonReaderRequestBody.PostData))
                {
                    xPostData = XDocument.Parse(jsonReaderRequestBody.PostData).Root;
                }
            }
            catch (Exception ex)
            {
                if (!string.IsNullOrEmpty(jsonReaderRequestBody.PostData))
                {
                    xPostData = new XElement("postData", jsonReaderRequestBody.PostData);
                }
            }

            XElement xAuditoria = new XElement(NODE_AUDITORIA,
                                    new XElement(NODE_USUARIO_ID, jsonReaderRequestBody.UserId),
                                    new XElement(NODE_USUARIO_EMPRESA_ID, jsonReaderRequestBody.UserCompanyId)
                                    );

            if (!string.IsNullOrEmpty(jsonReaderRequestBody.Sort))
            {
                var tempSort = new StringBuilder();
                dynamic sortItems = JsonConvert.DeserializeObject(jsonReaderRequestBody.Sort);
                foreach (var sortItem in sortItems)
                {
                    tempSort.Append(string.Concat(sortItem.property, " ", sortItem.direction, ","));
                }
                jsonReaderRequestBody.Sort = tempSort.ToString();
                jsonReaderRequestBody.Sort = jsonReaderRequestBody.Sort.Substring(0, jsonReaderRequestBody.Sort.Length - 1);
            }

            string xmlIn = new XDocument(new XElement(NODE_BS,
                                            new XElement(NODE_CONFIG,
                                                new XElement(NODE_PAGE, jsonReaderRequestBody.Page),
                                                new XElement(NODE_LIMIT, jsonReaderRequestBody.Limit),
                                                new XElement(NODE_START, jsonReaderRequestBody.Start),
                                                new XElement(NODE_GROUP, jsonReaderRequestBody.Group),
                                                new XElement(NODE_SORT, jsonReaderRequestBody.Sort),
                                                new XElement(NODE_QUERY, jsonReaderRequestBody.Query),
                                                new XElement(NODE_FILTER, jsonReaderRequestBody.Filter)
                                            ),
                                            xAuditoria,
                                            xPostData,
                                            xParametros,
                                            xHeaders,
                                            xServerVariables
                                        )
                                    ).ToString(SaveOptions.None);
            return xmlIn;
        }

        private static void ConfigureDatabase(IJSONReaderRequestBody jsonReaderRequestBody, SqlConnection connection)
        {
            if (!string.IsNullOrEmpty(jsonReaderRequestBody.Database))
            {
                connection.ChangeDatabase(jsonReaderRequestBody.Database);
            }
        }

        public string GetJsonX(int idUsuario,
                              string database,
                              string procedure,
                              int page,
                              int limit,
                              int start,
                              string filter,
                              string filterGrid,
                              string sort,
                              string query,
                              string group,
                              string extraArgs,
                              string tokenData,
                              string ip,
                              string nomeDaMaquina,
                              string windowsUserName)
        {
            string returnValue = string.Empty;
            string codModulo = string.Empty;
            string codFuncionalidade = string.Empty;
            string codConcessionariaSelecionadas = string.Empty;
            Dictionary<string, object> parametros = new Dictionary<string, object>();
            Dictionary<string, SqlDbType> tipos = new Dictionary<string, SqlDbType>();

            GetParametros(extraArgs, parametros, tipos);

            XElement xParametros = new XElement(NODE_PARAMS);

            for (var i = 0; i < parametros.Count; i++)
            {
                xParametros.Add(new XElement(parametros.ElementAt(i).Key, parametros.ElementAt(i).Value.ToString()));
            }

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(procedure, conn);

                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("XmlIn", SqlDbType.Xml).Value = new XDocument(new XElement(NODE_BS,
                                                                                            new XElement(NODE_CONFIG,
                                                                                               new XElement(NODE_PAGE, page),
                                                                                               new XElement(NODE_LIMIT, limit),
                                                                                               new XElement(NODE_START, start),
                                                                                               new XElement(NODE_GROUP, group),
                                                                                               new XElement(NODE_SORT, sort),
                                                                                               new XElement(NODE_FILTER, filter)
                                                                                            ),
                                                                                            new XElement(NODE_AUDITORIA,
                                                                                               new XElement(NODE_USUARIO_ID, idUsuario),
                                                                                               new XElement("IP", ip),
                                                                                               new XElement("HostName", nomeDaMaquina),
                                                                                               new XElement("UserName", windowsUserName)
                                                                                            ),
                                                                                            xParametros
                                                                                        )
                                                                                    ).ToString();
                command.Parameters.Add("XmlOut", SqlDbType.Xml).Direction = ParameterDirection.Output;

                command.Connection = conn;
                command.Connection.Open();

                if (!string.IsNullOrEmpty(database))
                {
                    command.Connection.ChangeDatabase(database);
                }

                using (SqlDataReader dataReader = command.ExecuteReader(CommandBehavior.SequentialAccess))
                {
                    try
                    {
                        returnValue = DataReaderToJson(dataReader, tokenData);
                        if (!dataReader.IsClosed)
                        {
                            dataReader.Close();
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        if (dataReader != null)
                        {
                            dataReader.Dispose();
                        }
                    }
                }
                command.Connection.Close();
            }
            return returnValue;
        }

        private void AdicionaParametrosExtras(SqlCommand command, Dictionary<string, SqlDbType> tipos, Dictionary<string, object> parametros)
        {
            foreach (var item in parametros)
            {
                command.Parameters.Add(item.Key, tipos[item.Key]).Value = item.Value.ToString();
            }
        }

        private static void GetParametros(string extraArgs, Dictionary<string, object> parametros, Dictionary<string, SqlDbType> tipos)
        {
            if (!string.IsNullOrEmpty(extraArgs))
            {
                dynamic extraArgsItems = JsonConvert.DeserializeObject(extraArgs);
                foreach (var extraParamsItem in extraArgsItems)
                {
                    if (!parametros.ContainsKey(extraParamsItem.Name))
                    {
                        parametros.Add(extraParamsItem.Name, extraParamsItem.Value);

                        tipos.Add(extraParamsItem.Name,
                                  extraParamsItem.Value.Type == Newtonsoft.Json.Linq.JTokenType.Integer
                                      ? SqlDbType.Int
                                      : extraParamsItem.Value.Type == Newtonsoft.Json.Linq.JTokenType.String
                                            ? SqlDbType.VarChar
                                            : extraParamsItem.Value.Type == Newtonsoft.Json.Linq.JTokenType.Date
                                                  ? SqlDbType.Date
                                                  : extraParamsItem.Value.Type == Newtonsoft.Json.Linq.JTokenType.Float
                                                        ? SqlDbType.Decimal
                                                        : SqlDbType.VarChar
                            );
                    }
                }
            }
        }

        string DataReaderToJson(SqlDataReader rdr, string tokenData)
        {
            return DataReaderToJson(rdr, tokenData, false);
        }
        string DataReaderToJson(SqlDataReader rdr, string tokenData, bool closeReader)
        {
            string returnValue = string.Empty;
            string schema = string.Empty;
            try
            {
                StringBuilder sb = new StringBuilder();
                StringWriter sw = new StringWriter(sb);

                using (JsonWriter jsonWriter = new JsonTextWriter(sw))
                {
                    int totalRecords = -1;
                    bool msgSuccess = true;
                    jsonWriter.Formatting = Formatting.Indented;
                    jsonWriter.DateTimeZoneHandling = DateTimeZoneHandling.Local;

                    jsonWriter.WriteStartObject();
                    jsonWriter.WritePropertyName(RESULT);

                    jsonWriter.WriteStartArray();

                    for (int i = 0; i < rdr.FieldCount; i++)
                    {
                        schema = string.Concat(schema, rdr.GetName(i), " - ", rdr.GetFieldType(i), Environment.NewLine);
                    }

                    while (rdr.Read())
                    {

                        jsonWriter.WriteStartObject();

                        int fields = rdr.FieldCount;

                        for (int i = 0; i < fields; i++)
                        {
                            string colName = rdr.GetName(i);
                            if (colName.Equals(RECORDS_TOTAL) && totalRecords.Equals(-1))
                            {
                                totalRecords = Convert.ToInt32(rdr.GetInt32(i));
                                continue;
                            }
                            if (colName.Equals(RECORDS_TOTAL) && !totalRecords.Equals(-1))
                            {
                                continue;
                            }
                            jsonWriter.WritePropertyName(rdr.GetName(i));
                            if (rdr.IsDBNull(i))
                            {
                                jsonWriter.WriteNull();
                                continue;
                            }

                            try
                            {
                                if (rdr.GetFieldType(i) == typeof(int))
                                {
                                    jsonWriter.WriteValue(rdr.GetInt32(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(string))
                                {
                                    jsonWriter.WriteValue(rdr.GetString(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(double))
                                {
                                    jsonWriter.WriteValue(rdr.GetDouble(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(decimal))
                                {
                                    jsonWriter.WriteValue(rdr.GetDecimal(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(long))
                                {
                                    jsonWriter.WriteValue(rdr.GetInt64(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(DateTime))
                                {
                                    jsonWriter.WriteValue(rdr.GetDateTime(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(byte))
                                {
                                    jsonWriter.WriteValue(rdr.GetByte(i));
                                }
                                else if (rdr.GetFieldType(i) == typeof(short))
                                {
                                    jsonWriter.WriteValue(rdr.GetInt16(i));
                                }
                                else
                                {
                                    jsonWriter.WriteValue(rdr[i]);
                                }

                            }
                            catch (Exception ex)
                            {
                                jsonWriter.WriteComment(colName);
                                jsonWriter.WriteComment(ex.Message);
                                jsonWriter.WriteComment(ex.StackTrace);
                                jsonWriter.WriteValue("");
                            }
                        }
                        jsonWriter.WriteEndObject();
                    }

                    jsonWriter.WriteEndArray();

                    if (!string.IsNullOrEmpty(tokenData))
                    {
                        jsonWriter.WritePropertyName(TOKEN_DATA);
                        jsonWriter.WriteStartObject();

                        jsonWriter.WritePropertyName("Logon");
                        jsonWriter.WriteValue(string.Empty);

                        jsonWriter.WritePropertyName("Nome");
                        jsonWriter.WriteValue(string.Empty);

                        jsonWriter.WritePropertyName("Dominio");
                        jsonWriter.WriteValue(string.Empty);

                        jsonWriter.WritePropertyName("DataHora");
                        jsonWriter.WriteValue(DateTime.Now);

                        jsonWriter.WriteEndObject();
                    }
                    jsonWriter.WritePropertyName(RECORDS_TOTAL);
                    jsonWriter.WriteValue(totalRecords);
                    jsonWriter.WritePropertyName(SUCCESS);
                    jsonWriter.WriteValue(true);
                    jsonWriter.WriteEndObject();
                }
                returnValue = sb.ToString();
            }
            catch (Exception ex)
            {
                StringBuilder sb = new StringBuilder();
                StringWriter sw = new StringWriter(sb);
                using (JsonWriter jsonWriter = new JsonTextWriter(sw))
                {
                    jsonWriter.WriteStartObject();
                    jsonWriter.WriteComment(ex.Message);
                    jsonWriter.WriteComment(Environment.NewLine);
                    jsonWriter.WriteComment(schema);
                    jsonWriter.WriteComment(Environment.NewLine);
                    jsonWriter.WriteComment(ex.StackTrace);
                    jsonWriter.WriteEndObject();
                }
                returnValue = sb.ToString();
            }
            finally
            {
                if (rdr != null && closeReader)
                {
                    if (!rdr.IsClosed)
                    {
                        rdr.Close();
                    }
                    rdr.Dispose();
                }
            }
            return returnValue;
        }
        #endregion

        #region Events
        public event EventHandler<ReadRowEventArgs> OnReadRow;
        #endregion
    }
}
