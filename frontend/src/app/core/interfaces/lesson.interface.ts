import { Language } from "./language.interface";

export interface Lesson {
  id: number;
  title: string;
  price: number;
  lesson_language: number;
  languages: Array<Language>
}