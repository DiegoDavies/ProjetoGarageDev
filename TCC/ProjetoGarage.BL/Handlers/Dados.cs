using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace ProjetoGarage.BL.Handlers
{
    class Dados: IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            var x = 1;
            var json = context.Request.Params["[object Object]"];
            var listaparams = JsonConvert.DeserializeObject(json);
            dynamic lista = JsonConvert.DeserializeObject(json, typeof(object));

            var select = lista.procedure.select?.ToString();
            var insert = lista.procedure.insert?.ToString();


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
