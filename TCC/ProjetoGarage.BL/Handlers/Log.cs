using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ProjetoGarage.BL.Handlers
{
    class Log : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string procedure = context.Request.Params["procedure"];
            string urlUtilizada = context.Request.Params["urlUtilizada"];
            string method = context.Request.Params["method"];
            string usuario = context.Request.Params["usuario"];
            string erro = context.Request.Params["erro"];
            int usuarioId = Convert.ToInt32(context.Request.Params["usuarioId"]);

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
