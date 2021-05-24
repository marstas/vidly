import React from 'react';
import _ from 'lodash';
import Like from './Like';
import { Column } from './TableHeader';

type TableBodyProps<T> = {
  data: T[];
  columns: Column[];
  onLike: (itemId: string) => void;
  onDelete: (itemId: string) => void;
};

export default function TableBody<T>({
  data,
  columns,
  onLike,
  onDelete
}: TableBodyProps<T>) {
  const renderCell = (item: T, column: Column, indx: number) => {
    return (
      <React.Fragment
        key={(item['_id' as keyof T] as unknown as string) + indx}
      >
        <td>{_.get(item, column.path)}</td>
        {indx === columns.length - 1 && (
          <>
            <td>
              <Like
                onLike={() =>
                  onLike(item['_id' as keyof T] as unknown as string)
                }
                liked={item['liked' as keyof T] as unknown as boolean}
              />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() =>
                  onDelete(item['_id' as keyof T] as unknown as string)
                }
              >
                Delete
              </button>
            </td>
          </>
        )}
      </React.Fragment>
    );
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item['_id' as keyof T] as unknown as string}>
          {columns.map((column, indx) => renderCell(item, column, indx))}
        </tr>
      ))}
    </tbody>
  );
}
