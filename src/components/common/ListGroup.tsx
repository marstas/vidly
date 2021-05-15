import React from 'react';

type ListGroupProps<T> = {
  items: T[];
  activeItem: T;
  nameProp: keyof T;
  idProp: keyof T;
  onItemChange: (newItem: T) => void;
};

export default function ListGroup<T>({
  items,
  activeItem,
  nameProp,
  idProp,
  onItemChange
}: ListGroupProps<T>) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          /* TS expects a string here */
          key={item[idProp] as unknown as string}
          className={`list-group-item ${
            item[idProp] === activeItem[idProp] ? 'active' : ''
          }`}
          style={{ cursor: 'pointer' }}
          onClick={() => onItemChange(item)}
        >
          {item[nameProp]}
        </li>
      ))}
    </ul>
  );
}
