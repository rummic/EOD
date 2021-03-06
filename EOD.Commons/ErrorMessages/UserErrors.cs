﻿namespace EOD.Commons.ErrorMessages
{
    public static class UserErrors
    {
        public static readonly string NotFoundById = "Użytkownik o podanym id nie istnieje.";
        public static readonly string LoginTaken = "Podany login jest używany przez innego użytkownika.";
        public static readonly string NotFoundByLogin = "Użytkownik o podanym loginie nie istnieje.";
        public static readonly string InvalidPassword = "Podane hasło jest nieprawidłowe.";
        public static readonly string CannotDeleteUser = "Nie można usunąc użytkownika o podanym id.";
        public static readonly string NotAllowed = "Nie możesz wykonać tej akcji.";
        public static readonly string EmptyLogin = "Login nie może być pusty.";
        public static readonly string EmptyEmail = "Email nie może być pusty.";
        public static readonly string EmptyFirstName = "Imie nie może być puste.";
        public static readonly string EmptyLastName = "Nazwisko nie może być puste.";
        public static readonly string EmptyPhoneNumber = "Numer telefonu nie może być pusty.";
        public static readonly string InvalidConfirmPassword = "Hasła nie są identyczne";
        public static readonly string NonExistingRole = "Nie ma takiej roli.";
        public static readonly string EmptyRole = "Rola nie może być pusta.";
        public static readonly string NotFoundByMail = "Nie ma konta o podanym adresie e-mail";
        public static readonly string EmailInvalid = "Nieprawidłowy format adresu e-mail";
    }
}
