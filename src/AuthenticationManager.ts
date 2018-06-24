export interface AuthData {
    username: string,
    password: string
}

export class AuthenticationManager {
    private token: string = '';

    constructor(private authenticationUrl: string) { }

    public getToken(): string {
        return this.token;
    }

    public authenticate(authData: AuthData): AuthenticationManager {
        this.token = 'example';
        return this;
    }
}