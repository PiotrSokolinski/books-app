export type Pagination = {
  from: number;
  to: number;
};

export type Sort = {
  sort: string;
  order: 'ASC' | 'DESC';
};

export type Filter = {
  search: string;
  isbnNumber: string;
  rating: number;
};

export type Query = Pagination & Sort & Filter;
