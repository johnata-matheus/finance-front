export interface Expense {
  id?: number;
  description: string;
  value: number;
  category: string;
  date: Date;
  paid_out: boolean;
  id_account?: number;
}