namespace EOD.Commons.Helpers
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;

    public static class MailHelper
    {
        public static async Task SendDocument(AppSettings appSettings, string recipient, string documentUrl)
        {
            var mail = new MailMessage(new MailAddress(appSettings.AppMail), new MailAddress(recipient));
            var smtp = new SmtpClient(appSettings.MailHost);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(appSettings.AppMail, appSettings.MailPassword);
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            
            mail.Subject = "Udostępniono dokument - EOD";
            mail.Body =
                $"Udostępniono Ci dokument za pośrednictwem aplikacji EOD. Link do dokumentu to : {documentUrl}";
            await smtp.SendMailAsync(mail);
        }

        public static async Task ResetPasswordMail(AppSettings appSettings, string recipient, string newPassword)
        {
            var mail = new MailMessage(new MailAddress(appSettings.AppMail), new MailAddress(recipient));
            var smtp = new SmtpClient(appSettings.MailHost);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(appSettings.AppMail, appSettings.MailPassword);
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

            mail.Subject = "Reset Hasła - EOD";
            mail.Body =
                $"Hasło twojego konta zostało zrestartowane, oto nowe hasło: {newPassword}";
            await smtp.SendMailAsync(mail);
        }
    }
}
