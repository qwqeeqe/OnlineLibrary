import React from 'react';
import { BookOpen } from 'lucide-react';

interface EmptyStateProps {
  onAddBook: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddBook }) => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <BookOpen className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">Библиотека пуста</h3>
      <p className="text-gray-500 mb-6">Добавьте первую книгу, чтобы начать</p>
      <button
        onClick={onAddBook}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Добавить книгу
      </button>
    </div>
  );
};

export default EmptyState;