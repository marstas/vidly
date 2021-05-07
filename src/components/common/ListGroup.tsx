import React from 'react';
import { Genre } from '../Movies';

type ListGroupProps<Type> = {
  items: Type[];
  activeItem: Type;
  onItemChange: (newItem: Type) => void;
};

export default function ListGroup<Type extends Genre>({
  items,
  activeItem,
  onItemChange
}: ListGroupProps<Type>) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={`list-group-item ${
            item._id === activeItem._id ? 'active' : ''
          }`}
          style={{ cursor: 'pointer' }}
          onClick={() => onItemChange(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
