using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace ProjetoGarage.BL.Handlers
{
    public class Data : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Code.Data dt = new Code.Data();
            dt.ProcessRequest(context);
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}
