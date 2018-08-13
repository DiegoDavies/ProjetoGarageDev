using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace ProjetoGarage.BL.Code
{
    public class Login : System.Web.UI.Page
    {
        public SqlConnection con;

        ConnectDB db = new ConnectDB();

        public string Processar(string login, string senha)
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
            }
            dr.Close();
            db.CloseConnection(con);
            return JsonConvert.SerializeObject(modeloLogin);
        }
    }
}
