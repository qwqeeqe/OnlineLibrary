import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import AddBookModal from './components/AddBookModal';
import EmptyState from './components/EmptyState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Book, BorrowRecord } from './types';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('library-books', []);
  const [borrowRecords, setBorrowRecords] = useLocalStorage<BorrowRecord[]>('library-records', []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.genre.toLowerCase().includes(searchLower)
      );
    }

    // Apply availability filter
    if (filterType === 'available') {
      filtered = filtered.filter(book => book.isAvailable);
    } else if (filterType === 'borrowed') {
      filtered = filtered.filter(book => !book.isAvailable);
    }

    return filtered;
  }, [books, searchTerm, filterType]);

  const handleAddBook = (bookData: Omit<Book, 'id' | 'isAvailable'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      isAvailable: true,
    };
    setBooks(prev => [...prev, newBook]);
  };

  const handleBorrowBook = (bookId: string, userName: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || !book.isAvailable) return;

    const borrowRecord: BorrowRecord = {
      id: Date.now().toString(),
      bookId,
      bookTitle: book.title,
      userName,
      borrowedDate: new Date(),
    };

    setBooks(prev =>
      prev.map(book =>
        book.id === bookId
          ? { ...book, isAvailable: false, borrowedBy: userName, borrowedDate: new Date() }
          : book
      )
    );

    setBorrowRecords(prev => [...prev, borrowRecord]);
  };

  const handleReturnBook = (bookId: string) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === bookId
          ? { ...book, isAvailable: true, borrowedBy: undefined, borrowedDate: undefined }
          : book
      )
    );

    setBorrowRecords(prev =>
      prev.map(record =>
        record.bookId === bookId && !record.returnDate
          ? { ...record, returnDate: new Date() }
          : record
      )
    );
  };

  const handleDeleteBook = (bookId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      setBooks(prev => prev.filter(book => book.id !== bookId));
      setBorrowRecords(prev => prev.filter(record => record.bookId !== bookId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Коллекция книг</h2>
            <p className="text-gray-600">
              {books.length} {books.length === 1 ? 'книга' : books.length < 5 ? 'книги' : 'книг'} в библиотеке
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Добавить книгу
          </button>
        </div>

        {books.length > 0 ? (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterType={filterType}
              onFilterChange={setFilterType}
            />

            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={handleBorrowBook}
                    onReturn={handleReturnBook}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  Книги не найдены по вашему запросу
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyState onAddBook={() => setIsAddModalOpen(true)} />
        )}
      </main>

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />
    </div>
  );
}

export default App;