namespace EOD.DAL.Model
{
    using System.ComponentModel.DataAnnotations;

    public class Document
    {
        [Key]
        public string Path { get; set; }
        public string Status { get; set; }
        public DocumentType Type { get; set; }
        public Case Case { get; set; }
    }
}
