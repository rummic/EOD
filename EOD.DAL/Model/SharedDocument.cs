namespace EOD.DAL.Model
{
    using System;

    public class SharedDocument
    {
        public int Id { get; set; }
        public string DocumentName { get; set; }

        public string RecipientMail { get; set; }

        public bool Seen { get; set; }

        public DateTime SharedTime { get; set; }

    }
}
