using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.ReportAppServer.Controllers;
using CrystalDecisions.ReportAppServer.DataDefModel;
using CrystalDecisions.Shared;
using Newtonsoft.Json;
using ConnectionInfo = CrystalDecisions.Shared.ConnectionInfo;

namespace ProjetoGarage.BL.Code
{
    public class ReportPdf
    {
        private string reportDir;
        private ReportModel model;
        private ReportDocument reportDoc;

        public byte[] GenerateReport(string reportModel, string reportDirectory)
        {
            var exportFileName = Path.GetTempFileName();
            reportDoc = new ReportDocument();
            reportDoc.InitReport += ReportInitEvent;
            reportDir = reportDirectory;

            GetParametersData(reportModel);

            LoadReportFile();

            reportDoc.ExportToDisk(ExportFormatType.PortableDocFormat, exportFileName);
            byte[] returnValue = File.ReadAllBytes(exportFileName);
            try
            {
                File.Delete(exportFileName);
                Unload();
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                Debug.WriteLine(ex.GetType().FullName);
                Debug.WriteLine(ex.StackTrace);
            }
            return returnValue;
        }

        public ReportModel GetModel(string reportModel)
        {
            return JsonConvert.DeserializeObject<ReportModel>(reportModel);
        }
        private void GetParametersData(string reportModel)
        {
            model = reportModel != null
                ? GetModel(reportModel)
                : null;
        }

        private void LoadReportFile()
        {
            string reportPath = string.Concat(reportDir, reportDir[reportDir.Length - 1] != '\\' ? "\\" : string.Empty, model.Name);
            reportDoc.Load(reportPath);
            if (reportDoc.IsLoaded)
            {
                SetLogon();
                SetParameters();
            }
        }

        private void SetParameters()
        {
            foreach (ReportParamModel param in model.Params)
            {
                SetCurrentValueForParameterField(param.Param, param.Value);
            }
        }

        private ConnectionInfo GetConnectionInfo(string connectionName)
        {
            var connStrBuilder =
                new SqlConnectionStringBuilder(ConfigurationManager.ConnectionStrings[connectionName].ToString());

            var info = new ConnectionInfo
            {
                UserID = connStrBuilder.UserID,
                Password = connStrBuilder.Password,
                ServerName = connStrBuilder.DataSource,
                DatabaseName = connStrBuilder.InitialCatalog
            };
            return info;
        }

        private void SetLogon()
        {
            ConnectionInfo info = GetConnectionInfo("Padrao");
            for (int i = 0; i < reportDoc.DataSourceConnections.Count; i++)
            {
                reportDoc.DataSourceConnections[i].SetConnection(info.ServerName,
                    info.DatabaseName,
                    info.UserID,
                    info.Password);
            }
        }

        private void SetCurrentValueForParameterField(string fieldName, string fieldValue)
        {
            try
            {
                if (fieldValue == "" &&
                    reportDoc.ParameterFields[fieldName].ParameterValueType == ParameterValueKind.NumberParameter)
                    fieldValue = "0";

                reportDoc.SetParameterValue(fieldName, fieldValue);

                var paramDiscreteValue = new ParameterDiscreteValue();
                var paramVals = new ParameterValues();

                paramDiscreteValue.Value = fieldValue;
                paramVals.Add(paramDiscreteValue);

                reportDoc.ParameterFields[fieldName].CurrentValues = paramVals;
                reportDoc.DataDefinition.ParameterFields[fieldName].ApplyCurrentValues(paramVals);
            }
            catch (Exception ex)
            {
                //LogRegister.Log(string.Format("Identificacao da classe: CReportViewer.SetCurrentValueForParameterField{0}{1}{0}", Environment.NewLine, ex), 20);
            }
        }

        protected void Unload()
        {
            try
            {
                reportDoc.Close();
                reportDoc.Dispose();
                GC.Collect();
            }
            catch (Exception ex)
            {
            }
        }

        private void ReportInitEvent(object sender, EventArgs e)
        {
            ReportDefController2 reportDefController = reportDoc.ReportClientDocument.ReportDefController;

            if (reportDefController != null)
            {
                reportDefController.ProductLocaleID = CeLocale.ceLocalePortugueseBrazilian;
            }
        }

        public class ReportModel
        {
            public string Name { get; set; }
            public string ExportName { get; set; }
            public List<ReportParamModel> Params { get; set; }
        }

        public class ReportParamModel
        {
            public string Param { get; set; }
            public string Value { get; set; }
        }
    }
}
