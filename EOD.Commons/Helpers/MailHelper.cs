namespace EOD.Commons.Helpers
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;

    public static class MailHelper
    {
        public static async Task SendDocument(AppSettings appSettings, string recipient, string documentName)
        {
            var mail = new MailMessage(new MailAddress(appSettings.AppMail), new MailAddress(recipient));
            var smtp = new SmtpClient(appSettings.MailHost);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(appSettings.AppMail, appSettings.MailPassword);
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            
            mail.Subject = "Udostępniono dokument - EOD";
            mail.Body =
                $"Udostępniono Ci dokument za pośrednictwem aplikacji EOD. Link do dokumentu to : https://localhost:44388/Documents/{documentName}";
            await smtp.SendMailAsync(mail);
        }
    }
}
