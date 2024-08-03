export interface IFinance {
  _id: string;
  date: string;
  description: string;
  category: {
    _id: string;
    name: string;
    color: string;
    type: string;
  };
  value: string;
  userId: string;
}
