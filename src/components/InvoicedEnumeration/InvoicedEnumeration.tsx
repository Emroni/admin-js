import { useEffect, useState } from 'react';
import Enumeration from '../Enumeration/Enumeration';
import Money from '../Money/Money';

export default function InvoicedEnumeration({ invoices }: InvoicedEnumerationProps) {

    const [items, setItems] = useState<MoneyProps[]>([]);

    useEffect(() => {
        const map: Map<CurrencyName, number> = new Map();

        // Parse invoices
        invoices?.forEach(invoice => {
            const amount = (map.get(invoice.currency) || 0) + invoice.amount;
            map.set(invoice.currency, amount);
        });

        // Get items
        const newItems: MoneyProps[] = Array.from(map).map(([currencyName, value]) => ({
            currencyName,
            value,
        }) as MoneyProps);
        setItems(newItems);
    }, [
        invoices,
    ]);

    return <Enumeration items={items} list>
        {(item: MoneyProps) => (
            <Money currencyName={item.currencyName} key={item.currencyName} value={item.value} />
        )}
    </Enumeration>;

}