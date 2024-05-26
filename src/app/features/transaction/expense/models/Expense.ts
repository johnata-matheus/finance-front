export interface Expense {
  id?: number;
  description: string;
  value: number;
  category: string;
  date: Date;
  paid_out: boolean;
  accountId: number;
  userId: number;
}