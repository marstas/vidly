import React from 'react';

type ListGroupProps<Type> = {
  items: Type[];
  activeItem: Type;
  nameProp: keyof Type;
  idProp: keyof Type;
  onItemChange: (newItem: Type) => void;
};

export default function ListGroup<Type>({
  items,
  activeItem,
  nameProp,
  idProp,
  onItemChange
}: ListGroupProps<Type>) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          /* TS expects a string here */
          key={(item[idProp] as unknown) as string}
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
