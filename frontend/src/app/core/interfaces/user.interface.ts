import { Lesson } from "./lesson.interface";

export interface User {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    role: 'STUDENT' | 'TEACHER';
    username: string;
    languages?: Array<Language>
    lessons?: Array<Lesson>
    country?: string;
    is_native?: string;
    type?: string;
    intro?: string;
}

interface Language {
    id: number;
    language_code: string;
    language: string;
}