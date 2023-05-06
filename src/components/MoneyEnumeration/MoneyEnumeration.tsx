import Enumeration from '../Enumeration/Enumeration';
import Money from '../Money/Money';

export default function MoneyEnumeration({ items }: MoneyEnumerationProps) {

    return <Enumeration items={items} list>
        {(item: Money) => (
            <Money amount={item.amount} currencyName={item.currency} />
        )}
    </Enumeration>;

}