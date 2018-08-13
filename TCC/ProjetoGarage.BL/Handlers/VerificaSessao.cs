﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.DependencyInjection;

namespace ProjetoGarage.BL.Handlers
{
    class VerificaSessao : IHttpHandler
    {
        public void ProcessRequest(System.Web.HttpContext context)
        {
            bool logout = Convert.ToBoolean(context.Request.Params["logout"]);
            if (!logout)
            {
                bool logado = false;
                string session;
                if (HttpContext.Current.Session != null)
                {
                    if (HttpContext.Current.Session["SessionUser"] != null)
                    {
                        session = HttpContext.Current.Session["SessionUser"].ToString();
                        logado = true;
                    }
                }
                //if (HttpContext.Current.Request.Cookies["cookie"] != null)
                //{
                //    cookie = HttpContext.Current.Request.Cookies["cookie"].Value.ToString();
                //    logado = true;
                //}
                //else
                //{
                //    cookie = Guid.NewGuid().ToString();
                //    var cookieS = new HttpCookie("cookie", cookie);
                //    HttpContext.Current.Response.Cookies.Set(cookieS);
                //    HttpContext.Current.Request.Cookies.Set(cookieS);
                //    HttpContext.Current.Request.Cookies["cookie"].Value = cookie;
                //    HttpContext.Current.Request.Cookies["cookie"].Expires = DateTime.Now.AddMinutes(1);
                //    logado = false;
                //}
                var column = new Dictionary<string, bool>
                {
                    { "Logado", logado }
                };
                context.Response.Write(JsonConvert.SerializeObject(column));
            }
            else
            {
                if (HttpContext.Current.Session["SessionUser"] != null)
                {
                    HttpContext.Current.Session.Remove("SessionUser");
                }
            }
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
