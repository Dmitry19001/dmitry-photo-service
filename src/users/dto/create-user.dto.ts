export class CreateUserDto {
    
    username: string;
    password: string;

    name: string;

    profile: {
        gender: string;
        photo: string;
    }
}