import React from 'react';
import { Calendar, User, Trash2, RotateCcw, UserCheck } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onBorrow: (bookId: string, userName: string) => void;
  onReturn: (bookId: string) => void;
  onDelete: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onBorrow, onReturn, onDelete }) => {
  const [showBorrowForm, setShowBorrowForm] = React.useState(false);
  const [userName, setUserName] = React.useState('');

  const handleBorrow = () => {
    if (userName.trim()) {
      onBorrow(book.id, userName.trim());
      setUserName('');
      setShowBorrowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {book.coverUrl && (
        <div className="h-48 bg-gray-100 overflow-hidden">
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">Автор: {book.author}</p>
        <p className="text-gray-600 mb-1">Жанр: {book.genre}</p>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {book.year}
        </div>
        
        {book.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{book.description}</p>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {book.isAvailable ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Доступна
              </span>
            ) : (
              <div className="flex flex-col">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-1">
                  Выдана
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <User className="w-3 h-3 mr-1" />
                  {book.borrowedBy}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {book.isAvailable ? (
            <>
              {!showBorrowForm ? (
                <button
                  onClick={() => setShowBorrowForm(true)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  Выдать
                </button>
              ) : (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleBorrow()}
                  />
                  <button
                    onClick={handleBorrow}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setShowBorrowForm(false);
                      setUserName('');
                    }}
                    className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => onReturn(book.id)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Вернуть
            </button>
          )}
          
          <button
            onClick={() => onDelete(book.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;