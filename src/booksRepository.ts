import { IBook } from "./book";

export abstract class BooksRepository {
  abstract getArea(): number;
  abstract createBook(book: IBook): IBook;
  abstract getBook(id: number): IBook;
  abstract getBooks(): Array<IBook>;
  abstract updateBook(id: number): IBook;
  abstract deleteBook(id: number): void;
}
