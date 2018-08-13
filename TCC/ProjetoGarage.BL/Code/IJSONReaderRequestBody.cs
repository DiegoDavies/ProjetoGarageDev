using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ProjetoGarage.BL.Code
{
    public interface IJSONReaderRequestBody
    {
        int UserId { get; set; }
        int UserCompanyId { get; set; }
        string Database { get; set; }
        string Procedure { get; set; }
        int Page { get; set; }
        int Limit { get; set; }
        int Start { get; set; }
        string Filter { get; set; }
        string FilterGrid { get; set; }
        string Sort { get; set; }
        string Query { get; set; }
        string Group { get; set; }
        string Params { get; set; }
        string TokenData { get; set; }
        string Operation { get; set; }
        string PostData { get; set; }
        NameValueCollection Headers { get; set; }
        NameValueCollection ServerVariables { get; set; }
        Action<XDocument> OnProcess { get; set; }
    }
}
