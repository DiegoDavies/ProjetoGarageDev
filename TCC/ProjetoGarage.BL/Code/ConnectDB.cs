using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using ProjetoGarage;

namespace ProjetoGarage.BL.Code
{
    public class ConnectDB
    {
        private string _connectionString;
        private SqlConnection con;
        public SqlConnection OpenConnection()
        {
            _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["Padrao"].ToString();
            con = new SqlConnection(_connectionString);
            con.Open();
            return con;
        }

        public void CloseConnection(SqlConnection conn)
        {
            conn.Close();
        }
    }
}
