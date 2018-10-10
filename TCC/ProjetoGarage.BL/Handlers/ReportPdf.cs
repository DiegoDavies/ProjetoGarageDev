using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web;
using System.Web.SessionState;
using CrystalDecisions.CrystalReports.Engine;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Newtonsoft.Json.Linq;

namespace ProjetoGarage.BL.Handlers
{
    public class ReportPdf : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string reportDownloadFileName = DateTime.Now.ToString("yyyy-MM-dd HH-mm-ss-ffff");
            HttpResponse response = context.Response;
            string modelData = context.Request.Params["m"];
            string download = context.Request.Params["download"];

            Code.ReportPdf rptPdf = new Code.ReportPdf();
            var model = rptPdf.GetModel(modelData);

            response.BinaryWrite(rptPdf.GenerateReport(modelData, context.Server.MapPath("/resources/reports/")));

            response.ContentType = "application/pdf";
            if (download == null || !download.Equals("no", StringComparison.InvariantCultureIgnoreCase))
            {
                response.AddHeader("content-disposition",
                    string.Concat("attachment;filename=", !string.IsNullOrEmpty(model.ExportName) ? model.ExportName : model.Name.Replace(".rpt", string.Empty), "-", reportDownloadFileName, ".pdf"));
            }

            response.End();
        }

        public List<string> recuperaArquivoBanco(string unifyFiles)
        {
            try
            {
                List<string> filesName = new List<string>();

                using (SqlConnection sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["BS"].ConnectionString))
                {
                    string query = @"
                            SELECT CONVERT(INT,RTRIM(LTRIM(StringValue))) AS ArquivoId
	                          INTO #SplitArquivo
	                          FROM dbo.Split(@ArquivoId,',');
	                        
	                        SELECT A.Caminho + A.Nome AS NameFile 
                              FROM Arquivo          A 
                              JOIN #SplitArquivo    SA ON SA.ArquivoId = A.ArquivoId";
                    using (SqlCommand command = new SqlCommand(query, sqlConnection))
                    {
                        command.Parameters.Add("@ArquivoId", SqlDbType.VarChar).Value = unifyFiles;
                        sqlConnection.Open();
                        using (SqlDataReader dataReader = command.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                filesName.Add(dataReader.GetString(dataReader.GetOrdinal("NameFile")));
                            }
                            dataReader.Close();
                        }
                        sqlConnection.Close();
                    }
                }
                return filesName;
            }
            catch (Exception ex)
            {
                throw new Exception("recuperaArquivoBanco");
            }
        }

        private byte[] AddTemplate(string[] fileNames)
        {
            byte[] bytes;
            try
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    Document doc = new Document(PageSize.A4, 6.34f, 6.34f, 6.34f, 6.34f);
                    PdfWriter writer = PdfWriter.GetInstance(doc, ms);

                    doc.Open();

                    PdfReader reader;
                    PdfImportedPage page;
                    PdfContentByte cb = writer.DirectContent;

                    foreach (string arquivo in fileNames)
                    {
                        try
                        {
                            reader = new PdfReader(arquivo);
                            for (int i = 1; i <= reader.NumberOfPages; i++)
                            {
                                doc.NewPage();
                                page = writer.GetImportedPage(reader, i);
                                var y = doc.PageSize.Height - page.Height;
                                cb.AddTemplate(page, 0, y);
                            }
                            writer.FreeReader(reader);
                            reader.Close();
                        }
                        catch (Exception e)
                        {
                            continue;
                        }
                    }
                    doc.Close();
                    bytes = ms.GetBuffer();
                    ms.Flush();
                    ms.Close();
                }

                return bytes;
            }
            catch (Exception e)
            {
                throw new Exception("AddTemplate");
            }
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }

}
