using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoGarage.BL.Code
{
    class SQLJSONReaderRequestBody : JSONReaderRequestBody
    {
        public void ValidateServerVariables()
        {
            NameValueCollection newServerVariables = new NameValueCollection();
            var serverVariables = ServerVariables.AllKeys.Where(key => !key.Equals("ALL_HTTP") && !key.Equals("ALL_RAW")).ToList();
            foreach (var serverVariable in serverVariables)
            {
                newServerVariables.Add(serverVariable, ServerVariables[serverVariable]);
            }
            ServerVariables = newServerVariables;
        }
    }
}
