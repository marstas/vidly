import { PAGE_SIZE } from './constants';

export function getOnePage<T>(itemArray: T[], pageNumber: number) {
  return itemArray.slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE);
}
