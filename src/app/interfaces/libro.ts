import { Autor } from './autor';

export interface Libro {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Autor;
}
