using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace ProjetoGarage.BL.Handlers
{
    class Login : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string login = context.Request.Params["login"];
            string senha = context.Request.Params["senha"];

            Code.Login lg = new Code.Login();
            string mdLogin = lg.Processar(login, senha);
            context.Response.Write(mdLogin);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
