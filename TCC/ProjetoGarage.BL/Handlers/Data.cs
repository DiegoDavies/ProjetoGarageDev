using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ProjetoGarage.BL.Handlers
{
    public class Data : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            Code.Data dt = new Code.Data();
            dt.ProcessRequet(context);
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}
