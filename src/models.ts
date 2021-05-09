export type Genre = {
  _id: string;
  name: string;
};

export type Movie = {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  liked: boolean;
  dailyRentalRate: number;
  publishDate?: string;
};
