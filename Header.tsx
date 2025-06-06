import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-900">Онлайн Библиотека</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;