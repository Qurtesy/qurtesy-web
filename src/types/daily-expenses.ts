export type Section = 'EXPENSE' | 'INCOME' | 'TRANSFER' | 'INVESTMENT' | 'LEND' | 'SPLIT';

export type Category = {
  id: number;
  value: string;
  emoji?: string;
  section?: Section;
};

export type CreateCategory = {
  value: string;
  emoji?: string;
};

export type UpdateCategory = {
  id: number;
  value?: string;
  emoji?: string;
};

export type Account = {
  id: number;
  value: string;
  balance?: number;
  calculated_balance?: number;
  balance_difference?: number;
};

export type CreateAccount = {
  value: string;
  balance?: number;
};

export type UpdateAccount = {
  id: number;
  value?: string;
  balance?: number;
};

export type Transaction = {
  id: number;
  date: string;
  credit: boolean;
  amount: number;
  section: Section;
  category?: Category;
  account?: Account;
  note?: string;
};

export type CreateTransaction = {
  date: string;
  amount: number;
  category_id?: number;
  account_id?: number;
  note?: string;
};

export type UpdateTransaction = {
  id: number;
  date?: string;
  amount?: number;
  category_id?: number;
  account_id?: number;
  note?: string;
};

export interface TransactionSummary {
  income: number;
  expense: number;
  balance: number;
  investment?: number;
  net_worth?: number;
}

export type TransactionGroupByDate = {
  date: string;
  total: number;
  data: Transaction[];
};

export type CreateTransfer = {
  date: string;
  amount: number;
  from_account_id: number;
  to_account_id: number;
  note?: string;
};

export type UpdateTransfer = {
  id: number;
  date?: string;
  amount?: number;
  from_account_id?: number;
  to_account_id?: number;
  note?: string;
};

export type Budget = {
  id: number;
  category: Category;
  month: number;
  year: number;
  budgeted_amount: number;
  spent_amount: number;
  remaining_amount: number;
  percentage_used: number;
  is_over_budget: boolean;
};

export type CreateBudget = {
  category_id: number;
  month: number;
  year: number;
  budgeted_amount: number;
};

export type UpdateBudget = {
  budgeted_amount?: number;
};

export type RecurringTransaction = {
  id: number;
  name: string;
  amount: number;
  section: Section;
  category?: Category;
  account?: Account;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date?: string;
  next_execution: string;
  is_active: boolean;
  note?: string;
};

export type CreateRecurringTransaction = {
  name: string;
  amount: number;
  category_id?: number;
  account_id?: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date?: string;
  note?: string;
};

export type UpdateRecurringTransaction = {
  name?: string;
  amount?: number;
  category_id?: number;
  account_id?: number;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  end_date?: string;
  is_active?: boolean;
  note?: string;
};
