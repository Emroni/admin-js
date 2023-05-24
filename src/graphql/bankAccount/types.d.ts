interface BankAccount extends Entity, BankAccountFields {
    fromExpenses: Expense[];
    invoices: Invoice[];
    toExpenses: Expense[];
}

interface BankAccountFields {
    amount: number;
    color: string;
    currency: CurrencyName;
    name: string;
}

interface BankAccountQuery {
    bankAccount: BankAccount?;
}

interface BankAccountsQuery {
    bankAccounts: GraphqlList<BankAccount>;
}