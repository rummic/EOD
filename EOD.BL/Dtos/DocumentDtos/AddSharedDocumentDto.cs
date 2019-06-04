using System;
using System.Collections.Generic;
using System.Text;

namespace EOD.BL.Dtos.DocumentDtos
{
    public class AddSharedDocumentDto
    {
        public string Recipient { get; set; }

        public string DocumentName { get; set; }
    }
}
