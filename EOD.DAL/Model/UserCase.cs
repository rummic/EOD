using System;
using System.Collections.Generic;
using System.Text;

namespace EOD.DAL.Model
{
    public class UserCase
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
    }
}
