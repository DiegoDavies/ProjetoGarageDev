using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoGarage.BL.Code
{
    class ModeloLogin
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public int PerfilId { get; set; }
        public bool Resultado { get; set; }
        public bool PrimeiroAcesso { get; set; }
    }
}
