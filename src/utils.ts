import { PAGE_SIZE } from './constants';

export function getOnePage<Type>(itemArray: Type[], pageNumber: number) {
  return itemArray.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
}
