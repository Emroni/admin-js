interface Expense extends Entity, ExpenseFields {
    nextDate: Date;
}

interface ExpenseFields {
    active: boolean;
    amount: number;
    currency: string;
    date: Date;
    name: string;
    repeats: string;
    type: string;
}

interface ExpenseQuery {
    expense: Expense?;
}

interface ExpensesQuery {
    expenses: GraphqlList<Expense>;
}