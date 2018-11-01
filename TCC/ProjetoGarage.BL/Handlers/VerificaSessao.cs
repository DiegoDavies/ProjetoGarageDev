using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;
using System.Web.SessionState;

namespace ProjetoGarage.BL.Handlers
{
    class VerificaSessao : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Code.Log lg = new Code.Log();
            bool logout = Convert.ToBoolean(context.Request.Params["logout"]);
            if (!logout)
            {
                bool logado = false;
                string session = string.Empty;
                if (context.Session != null)
                {
                    if (Convert.ToDateTime(context.Session["DataExpires"]) <= DateTime.Now)
                    {
                        if (context.Session["UsuarioNome"] != null)
                        {
                            session = context.Session["UsuarioNome"].ToString();
                        }
                        FormsAuthentication.SignOut();
                        context.Session.Abandon();
                        //
                        HttpCookie aspNetCookie = new HttpCookie("ASP.NET_SessionId", "");
                        aspNetCookie.Expires = DateTime.Now.AddHours(-1);
                        context.Response.Cookies.Add(aspNetCookie);
                    }
                    else if (context.Session["UsuarioNome"] != null)
                    {
                        session = context.Session["UsuarioNome"].ToString();
                        logado = true;
                    }
                }
                var column = new Dictionary<string, string>
                {
                    { "Logado", logado.ToString() },
                    { "Session", session }
                };
                context.Response.Write(JsonConvert.SerializeObject(column));
            }
            else
            {
                if (context.Session["UsuarioNome"] != null)
                {
                    FormsAuthentication.SignOut();
                    context.Session.Abandon();
                    //
                    HttpCookie aspNetCookie = new HttpCookie("ASP.NET_SessionId", "");
                    aspNetCookie.Expires = DateTime.Now.AddHours(-1);
                    context.Response.Cookies.Add(aspNetCookie);
                }
            }

        }

        public bool IsReusable { get; } = false;
    }
}
