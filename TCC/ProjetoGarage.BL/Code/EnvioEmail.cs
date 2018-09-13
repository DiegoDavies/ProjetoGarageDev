using System.Net;
using System.Net.Mail;
using System.Web;
using System;

namespace ProjetoGarage.BL.Code
{
    public class EnvioEmail
    {
        MailMessage mail = new MailMessage();
        HttpContext contextGeral;
        public void ProcessRequest(HttpContext context)
        {
            contextGeral = context;
            string emailTo = context.Request.Params["EmailDestino"];
            int tipoEmail = Convert.ToInt32(context.Request.Params["TipoEmail"].ToString());
            string to1 = "diego_psousa@hotmail.com";
            string to2 = "leo_strapa@hotmail.com";
            bool pass = false;

            mail.From = new MailAddress("projetogarage@outlook.com");
            if (!tipoEmail.Equals(1))
            {
                mail.To.Add(emailTo);
            }
            else
            {
                mail.To.Add(to1);
                mail.To.Add(to2);
            }

            switch (tipoEmail)
            {
                case 1:
                    EnviarEmailProblema();
                    pass = true;
                    break;
                case 2:
                    EnviarEmailNovoUsuario();
                    pass = true;
                    break;
                case 3:
                    EnviarEmailSolicitacaoSenha();
                    pass = true;
                    break;
                default:
                    pass = false;
                    break;
            }

            if (pass)
            {
                using (SmtpClient smtp = new SmtpClient("smtp.live.com"))
                {
                    smtp.EnableSsl = true;
                    smtp.Port = 587;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new System.Net.NetworkCredential("projetogarage@outlook.com", "DiegoLeonardo");
                    smtp.Send(mail);
                }
            }
        }

        public void EnviarEmailProblema()
        {
            string texto = contextGeral.Request.Params["TextoProblema"];
            string usuarioNome = contextGeral.Session["UsuarioNome"].ToString();
            mail.IsBodyHtml = true;
            mail.Subject = "Dúvidas / Reclamações / Problemas";
            mail.Body = string.Format(
                "<p style=\"text-align:center;\">" +
                    "<strong>{0}</strong>" +
                "</p>" +
                "<p>&nbsp;</p>" +
                "<div>" +
                    "<p style=\"text-align: justify;\">" +
                        "{1}" +
                    "</p>" +
                "</div>", usuarioNome, texto);
        }

        public void EnviarEmailNovoUsuario()
        {
            string nomeUsuario = contextGeral.Request.Params["UsuarioNome"];
            string login = contextGeral.Request.Params["Login"];
            string password = contextGeral.Request.Params["Password"];
            mail.IsBodyHtml = true;
            mail.Subject = "Novo Usuário";
            mail.Body = string.Format(
                "<p style=\"text-align:center;\">" +
                    "<strong>Olá, {0}</strong>" +
                "</p>" +
                "<p>&nbsp;</p>" +
                "<div>" +
                    "<p style=\"text-align: justify;\">" +
                        "Bem vindo ao sistema, para utilizar o mesmo, acesse o link abaixo com as seguintes informações:" +
                    "</p>" +
                    "<p style=\"text-align: center;\">" +
                        "<a href=\"http://garagecentroautomotivo-com-br.umbler.net/\">Garage Centro Automotivo</a>" +
                    "</p>" +
                    "<p style=\"text-align: center;\">" +
                        "<strong>Login: {1}</strong>" +
                    "</p>" +
                    "<p style=\"text-align: center;\">" +
                        "<strong>Senha: {2}</strong>" +
                    "</p>" +
                    "<p>&nbsp;</p>" +
                    "<p style=\"text-align: justify;\">" +
                        "Para realizar a alteração da senha, acesse o sistema e vá ao nome do Usuário no topo direito do sistema, clique no botão <strong>Alterar Senha</strong>, informe a senha disponibilizada acima e a nova senha." +
                    "</p>" +
                "</div>", nomeUsuario, login, password);
        }

        public void EnviarEmailSolicitacaoSenha()
        {
            string nomeUsuario = contextGeral.Request.Params["UsuarioNome"];
            string chaveAtivacao = contextGeral.Request.Params["ChaveAtivacao"];
            mail.IsBodyHtml = true;
            mail.Subject = "Alteração de Senha";
            mail.Body = string.Format(
                "<p style=\"text-align:center;\">" +
                    "<strong>Olá, {0}</strong>" +
                "</p>" +
                "<p>&nbsp;</p>" +
                "<div>" +
                    "<p style=\"text-align: justify;\">" +
                        "Foi solicitado a alteração de senha para este e-mail." +
                    "</p>" +
                    "<p style=\"text-align: justify;\">" +
                        "Para alterar a senha, entre no link abaixo e utilize o código informado:" +
                    "</p>" +
                    "<p style=\"text-align: center;\">" +
                        "<a href=\"http://garagecentroautomotivo-com-br.umbler.net/\">Garage Centro Automotivo</a>" +
                    "</p>" +
                    "<p style=\"text-align: center;\">" +
                        "<strong>Código: {1}</strong>" +
                    "</p>" +
                    "<p>&nbsp;</p>" +
                    "<p style=\"text-align: justify;\">" +
                        "Na tela de login, entre no link de <strong>Esqueci minha senha</strong>, acesse o botão <strong>Cadastrar Nova Senha</strong> e cole o <strong>Código Informado</strong>." +
                    "</p>" +
                    "<p>&nbsp;</p>" +
                    "<p style=\"text-align: justify;\">" +
                        "Caso não tenha solicitado essa alteração, desconsidere este e-mail." +
                    "</p>" +
                "</div>", nomeUsuario, chaveAtivacao);
        }
    }
}
