﻿namespace EOD.DAL.Repositories.Interfaces
{
    using EOD.DAL.Model;

    using System.Threading.Tasks;

    public interface IDepartmentsRepository
    {
        Task<Department> GetDepartmentById(int id);
    }
}