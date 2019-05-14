using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace EOD.DAL.Model
{
    public class Document
    {
        [Key]
        public string Path { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
        public DocumentType Type { get; set; }
        public Case Case { get; set; }
    }
}
