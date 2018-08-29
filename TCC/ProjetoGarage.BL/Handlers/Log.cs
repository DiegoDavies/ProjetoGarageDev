using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace ProjetoGarage.BL.Handlers
{
    class Log : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            string procedure = context.Request.Params["procedure"];
            string urlUtilizada = context.Request.Params["urlUtilizada"];
            string method = context.Request.Params["method"];
            string usuario = context.Session["UsuarioNome"] != null ? context.Session["UsuarioNome"].ToString() : string.Empty;
            string erro = context.Request.Params["erro"];
            int usuarioId = context.Session["UsuarioId"] != null ? Convert.ToInt32(context.Session["UsuarioId"]) : -1;

            Code.Log lg = new Code.Log();
            lg.Processar(procedure, urlUtilizada, method, usuarioId, usuario, erro);
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
