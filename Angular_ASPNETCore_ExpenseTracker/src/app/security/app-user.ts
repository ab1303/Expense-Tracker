export class AppUser {
  userName: string = "";
  password: string = "";
}

export class RegisterUser extends AppUser{
  fullName: string = "";
  confirmPassword: string = "";
}