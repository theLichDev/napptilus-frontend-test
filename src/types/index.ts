export interface OompaLoompa {
  first_name: string;
  last_name: string;
  gender: 'F' | 'M';
  image: string;
  profession: string;
  email: string;
  age: number;
  country: string;
  height: number;
  id: number;
}

export interface OompaLoompaDetails extends OompaLoompa {
  description: string;
  quota: string;
}

export interface PaginatedResponse {
  current: number;
  results: OompaLoompa[];
  total: number;
}
