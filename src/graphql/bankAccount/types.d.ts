interface BankAccount extends Entity, BankAccountFields {
    fromExpenses: Expense[];
    toExpenses: Expense[];
}

interface BankAccountFields {
    amount: number;
    currency: CurrencyName;
    name: string;
}

interface BankAccountQuery {
    bankAccount: BankAccount?;
}

interface BankAccountsQuery {
    bankAccounts: GraphqlList<BankAccount>;
}