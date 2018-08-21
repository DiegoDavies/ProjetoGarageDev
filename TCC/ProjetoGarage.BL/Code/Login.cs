using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace ProjetoGarage.BL.Code
{
    public class Login : System.Web.UI.Page, IRequiresSessionState
    {
        public SqlConnection con;

        ConnectDB db = new ConnectDB();

        [WebMethod(EnableSession = true)]
        public string Processar(string login, string senha, HttpContext context)
        {
            con = db.OpenConnection();
            ModeloLogin modeloLogin = null;
            SqlCommand cmd = new SqlCommand("SELECT * FROM Usuario WHERE UPPER(Login) = UPPER('" + login + "') AND UPPER(SENHA) = UPPER('" + senha + "')", con);
            SqlDataReader dr = cmd.ExecuteReader();
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    modeloLogin = new ModeloLogin
                    {
                        UsuarioId = dr.GetInt32(0),
                        Nome = dr.GetString(1),
                        Login = dr.GetString(2),
                        Senha = dr.GetString(3),
                        PerfilId = dr.GetInt32(4),
                        Resultado = true
                    };

                    FormsAuthenticationTicket authticket = new FormsAuthenticationTicket(1,
                        modeloLogin.Login,
                        DateTime.Now,
                        DateTime.Now.AddMinutes(20),
                        true,
                        "",
                        FormsAuthentication.FormsCookiePath);

                    context.Session["login"] = modeloLogin.Login;
                    context.Session["UsuarioId"] = modeloLogin.UsuarioId;
                    context.Session["UsuarioNome"] = modeloLogin.Nome;
                    context.Session["UsuarioPerfil"] = modeloLogin.PerfilId;

                    string hash = FormsAuthentication.Encrypt(authticket);

                    HttpCookie authcookie = new HttpCookie(FormsAuthentication.FormsCookieName, hash);

                    authcookie.Expires = authticket.IsPersistent ? authticket.Expiration : authcookie.Expires;

                    context.Response.Cookies.Add(authcookie);

                    //HttpContext.Current.Session.Add("SessionUser", modeloLogin.Login);
                    //Session.Add("SessionUser", modeloLogin);
                }
            }
            else
            {
                modeloLogin = new ModeloLogin
                {
                    UsuarioId = 0,
                    Login = "",
                    Senha = "",
                    PerfilId = 0,
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
            return JsonConvert.SerializeObject(modeloLogin);
        }
    }
}
