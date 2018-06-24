import request from 'request-promise-native';

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

    public async authenticate(authData: AuthData): Promise<AuthenticationManager> {
        const response = await request.post(this.authenticationUrl, {
            body: 'email=' + authData.username + '&password=' + authData.password,
        })
        const responseObject = JSON.parse(response);
        if (!responseObject.success) {
            throw 'Authentication failed: ' + responseObject.error.message;
        }
        this.token = responseObject.data.token;
        return this;
    }
}