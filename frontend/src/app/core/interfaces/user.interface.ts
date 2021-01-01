export interface User {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: 'STUDENT' | 'TEACHER';
    username: string;
    languages?: Array<Language>
}

interface Language {
    id: number;
    language_code: string;
    language: string;
}