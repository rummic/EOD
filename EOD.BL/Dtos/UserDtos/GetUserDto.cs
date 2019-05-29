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
    }
}
