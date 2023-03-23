export interface UserFromServer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}
