using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ProjetoGarage.BL.Code
{
    public class JSONReaderRequestBody : IJSONReaderRequestBody
    {
        public int UserId { get; set; }
        public int UserCompanyId { get; set; }
        public string Database { get; set; }
        public string Procedure { get; set; }
        public int Page { get; set; }
        public int Limit { get; set; }
        public int Start { get; set; }
        public string Filter { get; set; }
        public string FilterGrid { get; set; }
        public string Sort { get; set; }
        public string Query { get; set; }
        public string Group { get; set; }
        public string Params { get; set; }
        public string TokenData { get; set; }
        public string Operation { get; set; }
        public string PostData { get; set; }
        public NameValueCollection Headers { get; set; }
        public NameValueCollection ServerVariables { get; set; }
        public Action<XDocument> OnProcess { get; set; }
    }
}
