import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getTransactions as gtxns,
  postTransaction as ptxn,
  putTransaction as puttxn,
  deleteTransaction as dtxn,
  getTransactionsSummary as gtxnsummary,
  getCategories as gcats,
  postCategory as pcat,
  putCategory as putcat,
  deleteCategory as dcat,
  getAccounts as gaccs,
  postAccount as pacc,
  putAccount as putacc,
  deleteAccount as dacc,
} from '../webservices/daily-expenses-ws';
import {
  Section,
  Transaction,
  CreateTransaction,
  UpdateTransaction,
  Category,
  CreateCategory,
  UpdateCategory,
  Account,
  CreateAccount,
  UpdateAccount,
  TransactionSummary,
} from '../types/daily-expenses';
import { RootState } from '../store.types';

export const fetchTransactions = createAsyncThunk<Transaction[], void, { state: RootState }>(
  'transactions/list',
  async (_, { getState }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    const [year, month] = state.dailyExpenses.yearmonth;
    return await gtxns(section)(year, month);
  }
);

export const createTransaction = createAsyncThunk<Transaction[], CreateTransaction, { state: RootState }>(
  'transactions/create',
  async (data: CreateTransaction, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await ptxn(section)(data);
    return dispatch(fetchTransactions()).unwrap();
  }
);

export const updateTransaction = createAsyncThunk<Transaction[], UpdateTransaction, { state: RootState }>(
  'transactions/update',
  async (data: UpdateTransaction, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    const { id, ...rest } = data;
    await puttxn(section)(id, rest);
    return dispatch(fetchTransactions()).unwrap();
  }
);

export const deleteTransaction = createAsyncThunk<Transaction[], number, { state: RootState }>(
  'transactions/delete',
  async (id: number, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await dtxn(section)(id);
    return dispatch(fetchTransactions()).unwrap();
  }
);

export const fetchTransactionsSummary = createAsyncThunk<TransactionSummary, void, { state: RootState }>(
  'transactions/summary',
  async (_, { getState }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    return gtxnsummary(section)();
  }
);

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
  'categories/list',
  async (_, { getState }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    return gcats(section)();
  }
);

export const createCategory = createAsyncThunk<Category[], CreateCategory, { state: RootState }>(
  'categories/create',
  async (data: CreateCategory, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await pcat(section)(data);
    return dispatch(fetchCategories()).unwrap();
  }
);

export const updateCategory = createAsyncThunk<Category[], UpdateCategory, { state: RootState }>(
  'categories/update',
  async (data: UpdateCategory, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    const { id, ...rest } = data;
    await putcat(section)(id, rest);
    return dispatch(fetchCategories()).unwrap();
  }
);

export const deleteCategory = createAsyncThunk<Category[], number, { state: RootState }>(
  'categories/delete',
  async (id: number, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await dcat(section)(id);
    return dispatch(fetchCategories()).unwrap();
  }
);

export const fetchAccounts = createAsyncThunk<Account[], void, { state: RootState }>(
  'accounts/list',
  async (_, { getState }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    return gaccs(section)();
  }
);

export const createAccount = createAsyncThunk<Account[], CreateAccount, { state: RootState }>(
  'accounts/create',
  async (data: CreateAccount, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await pacc(section)(data);
    return dispatch(fetchAccounts()).unwrap();
  }
);

export const updateAccount = createAsyncThunk<Account[], UpdateAccount, { state: RootState }>(
  'accounts/update',
  async (data: UpdateAccount, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    const { id, ...rest } = data;
    await putacc(section)(id, rest);
    return dispatch(fetchAccounts()).unwrap();
  }
);

export const deleteAccount = createAsyncThunk<Account[], number, { state: RootState }>(
  'accounts/delete',
  async (id: number, { getState, dispatch }) => {
    const state = getState();
    const section = state.dailyExpenses.section;
    await dacc(section)(id);
    return dispatch(fetchAccounts()).unwrap();
  }
);

type DailyExpenses = {
  section: Section;
  categories: Category[];
  accounts: Account[];
  yearmonth: [number, number];
  summary: TransactionSummary;
  transactions: Transaction[];
};

const dailyExpenseSlice = createSlice<
  DailyExpenses,
  {
    setSection: (state: DailyExpenses, action: PayloadAction<Section>) => void;
    setYearMonth: (state: DailyExpenses, action: PayloadAction<[number, number]>) => void;
  },
  'dailyExpenses',
  SliceSelectors<DailyExpenses>,
  'dailyExpenses'
>({
  name: 'dailyExpenses',
  initialState: {
    section: 'EXPENSE',
    categories: [],
    accounts: [],
    yearmonth: [new Date().getFullYear(), new Date().getMonth()],
    summary: {
      balance: 0,
      expense: 0,
      income: 0,
    },
    transactions: [],
  },
  reducers: {
    setSection: (state, action: PayloadAction<Section>) => {
      state.section = action.payload;
    },
    setYearMonth: (state, action: PayloadAction<[number, number]>) => {
      state.yearmonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchAccounts.fulfilled, (state, action) => {
      state.accounts = action.payload;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(createTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
    builder.addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
      state.summary = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSection, setYearMonth } = dailyExpenseSlice.actions;

export default dailyExpenseSlice;
