export interface User {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: 'STUDENT' | 'TEACHER';
    username: string;
}
