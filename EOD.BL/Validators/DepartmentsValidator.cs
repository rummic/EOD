using EOD.BL.Dtos.DepartmentDtos;

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

            if (department.Name.Length < 2)
            {
                response.AddError(DepartmentErrors.TooShortName);
            }

            return response;
        }

        public static ResponseDto<Department> ValidateGetDepartmentById(Department departmentFromDb)
        {
            var response = new ResponseDto<Department>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<int> ValidateChangeName(Department departmentFromDb, Department departmentWithName, string name)
        {
            var response = new ResponseDto<int>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            if (departmentWithName != null)
            {
                response.AddError(DepartmentErrors.NameExists);
            }

            if (name.Length < 2)
            {
                response.AddError(DepartmentErrors.TooShortName);
            }

            return response;
        }

        public static ResponseDto<bool> ValidateAssignManager(Department departmentFromDb, User userFromDb)
        {
            var response = new ResponseDto<bool>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            if (userFromDb == null)
            {
                response.AddError(UserErrors.NotFoundById);
            }

            return response;
        }

        public static ResponseDto<bool> ValidateDeleteDepartment(Department departmentFromDb)
        {
            var response = new ResponseDto<bool>();
            if (departmentFromDb == null)
            {
                response.AddError(DepartmentErrors.NotFoundById);
            }

            return response;
        }
    }
}
