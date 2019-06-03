namespace EOD.Tests
{
    using AutoMapper;

    using EOD.BL.Dtos.CaseDtos;
    using EOD.BL.Dtos.DepartmentDtos;
    using EOD.BL.Dtos.DocumentDtos;
    using EOD.BL.Dtos.DocumentTypeDtos;
    using EOD.BL.Dtos.UserDtos;
    using EOD.DAL.Model;

    public static class AutoMapperInitializer
    {
        public static object thisLock = new object();

        private static bool _initialized = false;

        public static void Initialize()
        {
            lock (thisLock)
            {
                if (!_initialized)
                {
                    Mapper.Initialize(cfg =>
                        {
                            cfg.CreateMap<User, GetUserDto>();
                            cfg.CreateMap<AddUserDto, User>();
                            cfg.CreateMap<Case, GetCaseDto>();
                            cfg.CreateMap<AddCaseDto, Case>();
                            cfg.CreateMap<AddDepartmentDto, Department>();
                            cfg.CreateMap<Document, GetDocumentDto>();
                            cfg.CreateMap<DocumentType, GetDocumentTypeDto>();
                            cfg.CreateMap<AddDocumentTypeDto, DocumentType>();
                        });
                }

                _initialized = true;
            }
        }
    }
}
