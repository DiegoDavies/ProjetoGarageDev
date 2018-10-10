using System.Collections.Generic;

namespace ProjetoGarage.BL.Code
{
    internal class ExcelConfiguration
    {
        public string Guid { get; set; }
        public string NomeArquivo { get; set; }
        public List<Coluna> Colunas { get; set; }
    }
}