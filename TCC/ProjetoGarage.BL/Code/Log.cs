using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Data.SqlClient;

namespace ProjetoGarage.BL.Code
{
    public class Log
    {
        public SqlConnection con;

        ConnectDB db = new ConnectDB();

        public void Processar(string procedure, string urlUtilizada, string method, int usuarioId, string usuario, string erro)
        {
            string acao = string.Empty, problema = string.Empty;
            string query = "INSERT INTO Log (UsuarioId, DataHora, Acao, Problema) VALUES";
            if (urlUtilizada != null)
            {
                switch (urlUtilizada.ToUpper())
                {
                    case "LOGIN":
                        acao = erro == "" ? "Realizando Login do Usuário " + usuario : "";
                        problema = erro == "" ? "" : "Problema ao realizar Login " + erro;
                        query = string.Concat(query, string.Format("({0},'{1}','{2}','{3}')", usuarioId.ToString(), DateTime.Now, acao, problema));
                        break;
                    case "VERIFICASESSAO":
                        acao = erro == "" ? "Verificando Sessão do Usuário " + usuario : "";
                        problema = erro == "" ? "" : "Problema ao verificar Sessão " + erro;
                        query = string.Concat(query, string.Format("({0},'{1}','{2}','{3}')", usuarioId.ToString(), DateTime.Now, acao, problema));
                        break;
                }
            }
            if (procedure.Contains("S_"))
            {
                switch (method.ToUpper())
                {
                    case "GET":
                        acao = erro == "" ? "Retornando select pela procedure " + procedure + " para o usuário " + usuario : "";
                        problema = erro == "" ? "" : "Erro ao realizar consulta pela procedure " + procedure + " para o usuário " + usuario;
                        break;
                    case "POST":
                        acao = erro == "" ? "Realizando cadastro pela procedure " + procedure + " para o usuário " + usuario : "";
                        problema = erro == "" ? "" : "Erro ao realizar cadastro pela procedure " + procedure + " para o usuário " + usuario;
                        break;
                    case "PUT":
                        acao = erro == "" ? "Realizando alteração pela procedure " + procedure + " para o usuário " + usuario : "";
                        problema = erro == "" ? "" : "Erro ao realizar alteração pela procedure " + procedure + " para o usuário " + usuario;
                        break;
                    case "DELETE":
                        acao = erro == "" ? "Realizando delete pela procedure " + procedure + " para o usuário " + usuario : "";
                        problema = erro == "" ? "" : "Erro ao realizar delete pela procedure " + procedure + " para o usuário " + usuario;
                        break;
                }
                query = string.Concat(query, string.Format("({0},'{1}','{2}','{3}')", usuarioId.ToString(), DateTime.Now, acao, problema));
            }
            con = db.OpenConnection();
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            db.CloseConnection(con);
        }
    }
}
