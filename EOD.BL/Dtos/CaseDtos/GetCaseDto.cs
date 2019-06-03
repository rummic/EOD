namespace EOD.BL.Dtos.CaseDtos
{
    using System;
    using System.Collections.Generic;

    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Dtos.UserDtos;

    public class GetCaseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string DepartmentName { get; set; }
        public DateTime SendDate { get; set; }
        public GetUserDto Sender { get; set; }
        public List<GetDocumentDto> Documents { get; set; }
    }
}
