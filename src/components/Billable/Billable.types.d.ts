interface BillableProps {
    clientId: number;
}

interface BillableRow {
    label: string;
    total: BillableValue;
    values: BillableValue[];
}

interface BillableColumn {
    day: string;
    minutes: number;
}

interface BillableValue {
    day: string;
    minutes: number;
}