using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;
using System.Web.SessionState;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.DependencyInjection;

namespace ProjetoGarage.BL.Handlers
{
    class VerificaSessao : IHttpHandler, IRequiresSessionState
    {
        public void ProcessRequest(System.Web.HttpContext context)
        {
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
                //if (HttpContext.Current.Request.Cookies["cookie"] != null)
                //{
                //    cookie = HttpContext.Current.Request.Cookies["cookie"].Value.ToString();
                //    logado = true;
                //}
                //else
                //{
                //    cookie = Guid.NewGuid().ToString();
                //    var cookieS = new HttpCookie("cookie", cookie);
                //    HttpContext.Current.Response.Cookies.Set(cookieS);
                //    HttpContext.Current.Request.Cookies.Set(cookieS);
                //    HttpContext.Current.Request.Cookies["cookie"].Value = cookie;
                //    HttpContext.Current.Request.Cookies["cookie"].Expires = DateTime.Now.AddMinutes(1);
                //    logado = false;
                //}
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

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
