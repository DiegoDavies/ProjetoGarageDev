using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml.Linq;
using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace ProjetoGarage.BL.Code
{
    public class GenerateXls
    {
        private XDocument xDocument;
        private string excelConfigurationJSON = string.Empty;

        public GenerateXls(XDocument xDocument, string excelConfigurationJson)
        {
            this.xDocument = xDocument;
            this.excelConfigurationJSON = excelConfigurationJson;
            CreateTokenFile();
        }

        public void CreateTokenFile()
        {
            var excelConfiguration = GetExcelConfiguration();
            string temporaryPath = Path.Combine(Path.GetTempPath(), excelConfiguration.Guid);
            List<XElement> lista = xDocument.Root.Elements().ToList();

            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet ws = package.Workbook.Worksheets.Add("Plan1");
                for (int rowIndex = 0, len = lista.Count; rowIndex < len; rowIndex++)
                {
                    int cell = 1;
                    XElement elemento = lista[rowIndex];
                    List<XElement> attributes = elemento.Elements().ToList();
                    for (int i = 0; i < excelConfiguration.Colunas.Count; i++)
                    {
                        var coluna = excelConfiguration.Colunas[i];
                        var attribute = attributes.FirstOrDefault(t => t.Name.ToString().Equals(coluna.DataIndex));

                        cell = ProcessAttribute(attribute, ws, cell, coluna, rowIndex + 2);
                    }
                }
                ws.Cells.AutoFitColumns();
                if (!Directory.Exists(temporaryPath))
                {
                    Directory.CreateDirectory(temporaryPath);
                }
                Stream stream = File.Create(Path.Combine(temporaryPath, excelConfiguration.NomeArquivo));
                package.SaveAs(stream);
                stream.Close();
            }
        }

        private ExcelConfiguration GetExcelConfiguration()
        {
            ExcelConfiguration excelConfiguration = JsonConvert.DeserializeObject<ExcelConfiguration>(this.excelConfigurationJSON);
            return excelConfiguration;
        }

        private int ProcessAttribute(XElement attribute, ExcelWorksheet worksheet, int cell, Coluna coluna, int workSheetRowIndex)
        {
            CultureInfo currentCulture = CultureInfo.CurrentCulture;
            CultureInfo currentUICulture = CultureInfo.CurrentUICulture;

            Thread.CurrentThread.CurrentCulture = CultureInfo.GetCultureInfo("en-US");
            Thread.CurrentThread.CurrentUICulture = CultureInfo.GetCultureInfo("en-US");

            if (attribute != null)
            {
                worksheet.Cells[1, cell].Value = coluna.Header;
                worksheet.Cells[1, cell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; ;
                if (!String.IsNullOrWhiteSpace(attribute.Value))
                {
                    switch (coluna.Format)
                    {
                        case "Numero":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToInt32(attribute.Value.Replace(",", ""));
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = coluna.FormatString != "" ? coluna.FormatString : "####0";
                            worksheet.Cells[workSheetRowIndex, cell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                            break;
                        case "Contábil":
                        case "Moeda":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDecimal(attribute.Value.Replace(",", ""));
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = coluna.FormatString != "" ? coluna.FormatString : "###,##0.00##";
                            worksheet.Cells[workSheetRowIndex, cell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                            break;
                        case "Data":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDateTime(attribute.Value);
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = "dd/mm/yyyy";
                            worksheet.Cells[workSheetRowIndex, cell].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                            break;
                        case "Hora":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDateTime(attribute.Value);
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = "hh:mm:ss";
                            break;
                        case "Porcentagem":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDouble(attribute.Value);
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = "##0,00 %";
                            break;
                        case "Fração":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDouble(attribute.Value);
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = "# ??/??";
                            break;
                        case "Científico":
                            worksheet.Cells[workSheetRowIndex, cell].Value = Convert.ToDouble(attribute.Value);
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = coluna.FormatString;
                            break;
                        case "Texto":
                            worksheet.Cells[workSheetRowIndex, cell].Value = attribute.Value;
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = @"";
                            break;
                        default:
                            worksheet.Cells[workSheetRowIndex, cell].Value = attribute.Value;
                            worksheet.Cells[workSheetRowIndex, cell].Style.Numberformat.Format = @"";
                            break;
                    }
                }
                cell++;
            }

            Thread.CurrentThread.CurrentCulture = currentCulture;
            Thread.CurrentThread.CurrentUICulture = currentUICulture;
            return cell;
        }
    }
}