interface Expense extends Entity, ExpenseFields {
    fromBankAccount: BankAccount?;
    nextDate: Date;
    toBankAccount: BankAccount?;
}

interface ExpenseFields {
    active: boolean;
    amount: number;
    currency: CurrencyName;
    date: Date;
    fromBankAccountId: number?;
    name: string;
    repeats: string;
    toBankAccountId: number?;
    type: string;
}

interface ExpenseQuery {
    expense: Expense?;
}

interface ExpensesQuery {
    expenses: GraphqlList<Expense>;
}