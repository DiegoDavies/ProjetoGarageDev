using System.Data.SqlClient;

namespace ProjetoGarage.BL.Code
{
    public class Log
    {
        public SqlConnection con;

        ConnectDB db = new ConnectDB();

        public void Processar(string procedure, string urlUtilizada, string method, int usuarioId, string usuario, string erro)
        {
            int acaoId = 0;
            string nomeAdc = string.Empty;
            string query = "INSERT INTO Log (UsuarioId, DataHora, Id, NomeAdc) VALUES({0}, {1}, {2}, '{3}')";
            if (urlUtilizada != null)
            {
                switch (urlUtilizada.ToUpper())
                {
                    case "LOGIN":
                        acaoId = (erro == "" ? 1 : 2);
                        break;
                    case "VERIFICASESSAO":
                        acaoId = (erro == "" ? 11 : 12);
                        break;
                    case "EMAIL":
                        acaoId = (erro == "" ? 81 : 82);
                        break;
                    case "GENERATEXLS":
                        acaoId = (erro == "" ? 91 : 92);
                        break;
                    case "REPORTPDF":
                        acaoId = (erro == "" ? 101 : 102);
                        break;
                    case "AUDITORIATELA":
                        acaoId = (erro == "" ? 21 : 22);
                        nomeAdc = procedure;
                        break;
                }
                if (acaoId > 0)
                {
                    query = string.Format(query, usuarioId.ToString(), "GETDATE()", acaoId, nomeAdc);
                }
            }
            if (procedure.Contains("S_"))
            {
                switch (method.ToUpper())
                {
                    case "GET":
                        acaoId = (erro == "" ? 23 : 24);
                        nomeAdc = procedure;
                        break;
                    case "POST":
                        acaoId = (erro == "" ? 25 : 26);
                        nomeAdc = procedure;
                        break;
                    case "PUT":
                        acaoId = (erro == "" ? 27 : 28);
                        nomeAdc = procedure;
                        break;
                    case "DELETE":
                        acaoId = (erro == "" ? 29 : 30);
                        nomeAdc = procedure;
                        break;
                }
                if (acaoId > 0)
                {
                    query = string.Format(query, usuarioId.ToString(), "GETDATE()", acaoId, nomeAdc);
                }
            }
            if (query != "INSERT INTO Log (UsuarioId, DataHora, Id, NomeAdc) VALUES({0}, {1}, {2}, '{3}')")
            {
                con = db.OpenConnection();
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.ExecuteNonQuery();
                db.CloseConnection(con);
            }
        }
    }
}
