namespace EOD.BL.Dtos.UserDtos
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; }
        public string Role { get; set; }

        public bool AreEqual(GetUserDto other)
        {
            if (IsDeleted != other.IsDeleted) return false;
            if (Role != other.Role) return false;
            if (Email != other.Email) return false;
            if (FirstName != other.FirstName) return false;
            if (LastName != other.LastName) return false;
            if (Login != other.Login) return false;
            if (Id != other.Id) return false;

            return true;
        }
    }
}
