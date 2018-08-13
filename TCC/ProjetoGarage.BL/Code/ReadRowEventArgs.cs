using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoGarage.BL.Code
{
    public class ReadRowEventArgs: CancelEventArgs
    {
        public IDictionary<string, Object> RowData { get; private set; }
        public IDataReader DataReader { get; private set; }
        public string Procedure { get; private set; }
        public string Json { get; private set; }

        public ReadRowEventArgs(string procedure, IDictionary<string, Object> rowData, IDataReader dataReader, string json)
        {
            Procedure = procedure;
            RowData = rowData;
            DataReader = dataReader;
            Json = json;
        }
    }
}
