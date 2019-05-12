using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EOD.DAL.Model
{
    public class Case
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
        public Department Department { get; set; }
        public DateTime SendDate { get; set; }
        public User Sender { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}
