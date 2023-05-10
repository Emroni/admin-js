import { useEffect, useState } from 'react';
import Enumeration from '../Enumeration/Enumeration';
import Money from '../Money/Money';

export default function MoneyEnumeration({ items, list }: MoneyEnumerationProps) {

    const [sorted, setSorted] = useState<Money[]>([]);

    useEffect(() => {
        const newSorted = items?.slice() || [];
        newSorted.sort((a: Money, b: Money) => a.currency < b.currency ? -1 : 1);
        setSorted(newSorted);
    }, [
        items,
    ]);

    return <Enumeration items={sorted} list={list}>
        {(item: Money) => (
            <Money amount={item.amount} currencyName={item.currency} />
        )}
    </Enumeration>;

}