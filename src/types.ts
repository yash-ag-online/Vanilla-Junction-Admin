export interface User {
  phoneNumber: {
    countryCode: string;
    number: string | number;
  };
  name: string;
  role: 'Admin' | 'Delivery Person';
}
