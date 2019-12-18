import * as React from 'react';
import {Toolbar} from './Toolbar';

const range = (size: Number): Number[] => {
  return [...Array(size).keys()];
};

export interface AppProps {
  cols: Number;
  rows: Number;
}

export interface CellCoordinates {
  col_i: Number;
  row_i: Number;
}

const getKey = (coords: CellCoordinates): string => {
  return `${coords.col_i}-${coords.row_i}`;
};

export const App: React.FC<AppProps> = ({cols, rows}) => {
  const [getCells, setCell] = React.useState({});
  const [selectedCell, setSelectedCell] = React.useState({col_i: 0, row_i: 0});

  return (
    <div>
      <div className="sticky top-0">
        <Toolbar />
      </div>
      <div className="overflow-scroll w-screen">
        {range(rows).map((row, row_i) => {
          return (
            <div className="flex flex-no-wrap" key={row_i}>
              {range(cols).map((col, col_i) => {
                return (
                  <div
                    className={'h-8 w-1/6 flex-none align-middle'}
                    key={getKey({col_i, row_i})}>
                    <input
                      type="text"
                      className="bg-transparent w-full h-full"
                      onFocus={() => {
                        setSelectedCell({col_i, row_i});
                      }}
                      onChange={e => {
                        setCell({
                          ...getCells,
                          [getKey({col_i, row_i})]: e.target.value,
                        });
                      }}
                      value={
                        selectedCell.col_i == col_i &&
                        selectedCell.row_i == row_i
                          ? getCells[getKey({col_i, row_i})] || ''
                          : getCells[getKey({col_i, row_i})] || ''
                      }
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
