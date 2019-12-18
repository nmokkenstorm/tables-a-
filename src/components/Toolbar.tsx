import * as React from 'react';
import {CellCoordinates} from './App';

interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">tables.app</span>
      </div>
      <div className="flex block flex-grow lg:flex lg:items-center lg:w-auto"></div>
    </nav>
  );
};
