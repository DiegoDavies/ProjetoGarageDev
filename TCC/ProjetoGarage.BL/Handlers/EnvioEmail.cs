using System.Web;
using System.Web.SessionState;

namespace ProjetoGarage.BL.Handlers
{
    public class EnvioEmail : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Code.EnvioEmail email = new Code.EnvioEmail();
            email.ProcessRequest(context);
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}
