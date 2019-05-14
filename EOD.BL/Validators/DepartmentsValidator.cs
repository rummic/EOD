namespace EOD.BL.Validators
{
    using EOD.BL.Dtos;
    using EOD.Commons.ErrorMessages;
    using EOD.DAL.Model;

    public static class DepartmentsValidator
    {
        public static ResponseDto<int> ValidateAddDepartment(Department department)
        {
            var response = new ResponseDto<int>();
            if (department != null)
            {
                response.AddError(DepartmentErrors.NameExists);
            }

            return response;
        }
    }
}
