﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Services;
using System.Web.Security;
using System.Web.SessionState;
using System.Data.SqlClient;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

namespace ProjetoGarage.BL.Handlers
{
    class Login : IHttpHandler, IRequiresSessionState
    {
        public SqlConnection con;

        Code.ConnectDB db = new Code.ConnectDB();

        [WebMethod(EnableSession = true)]
        public void ProcessRequest(HttpContext context)
        {
            string login = context.Request.Params["login"];
            string senha = context.Request.Params["senha"];

            con = db.OpenConnection();
            Code.ModeloLogin modeloLogin = null;
            SqlCommand cmd = new SqlCommand("SELECT * FROM Usuario WHERE UPPER(Login) = UPPER('" + login + "') AND UPPER(SENHA) = UPPER('" + senha + "')", con);
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    DateTime expires = DateTime.Now.AddMinutes(30);
                    modeloLogin = new Code.ModeloLogin
                    {
                        UsuarioId = dr.GetInt32(0),
                        Nome = dr.GetString(1),
                        Login = dr.GetString(2),
                        Senha = dr.GetString(3),
                        Resultado = true
                    };

                    FormsAuthenticationTicket authticket = new FormsAuthenticationTicket(1,
                        modeloLogin.Login,
                        DateTime.Now,
                        expires,
                        true,
                        "",
                        FormsAuthentication.FormsCookiePath);

                    context.Session["login"] = modeloLogin.Login;
                    context.Session["UsuarioId"] = modeloLogin.UsuarioId;
                    context.Session["UsuarioNome"] = modeloLogin.Nome;
                    context.Session["DataExpires"] = expires;

                    string hash = FormsAuthentication.Encrypt(authticket);

                    HttpCookie authcookie = new HttpCookie(FormsAuthentication.FormsCookieName, hash);

                    authcookie.Expires = authticket.IsPersistent ? authticket.Expiration : authcookie.Expires;

                    context.Response.Cookies.Add(authcookie);
                }
            }
            else
            {
                modeloLogin = new Code.ModeloLogin
                {
                    UsuarioId = 0,
                    Login = "",
                    Senha = "",
                    Resultado = false
                };

                FormsAuthentication.SignOut();
                context.Session.Abandon();
                //
                HttpCookie aspNetCookie = new HttpCookie("ASP.NET_SessionId", "");
                aspNetCookie.Expires = DateTime.Now.AddYears(-1);
                context.Response.Cookies.Add(aspNetCookie);
                //
                //context.Response.Redirect(context.Request.UrlReferrer.ToString());
            }
            dr.Close();
            db.CloseConnection(con);
            string mdLogin = JsonConvert.SerializeObject(modeloLogin);

            //Code.Login lg = new Code.Login();
            //string mdLogin = lg.Processar(login, senha, context);
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
