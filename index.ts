export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  coverUrl?: string;
  isAvailable: boolean;
  borrowedBy?: string;
  borrowedDate?: Date;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  userName: string;
  borrowedDate: Date;
  returnDate?: Date;
}