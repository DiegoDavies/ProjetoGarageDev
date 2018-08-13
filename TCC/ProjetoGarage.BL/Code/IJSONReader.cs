using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoGarage.BL.Code
{
    public interface IJSONReader
    {
        string GetJson(IJSONReaderRequestBody jsonReaderRequestBody);

        event EventHandler<ReadRowEventArgs> OnReadRow;
    }
}
