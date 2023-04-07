type CurrencyName = 'EUR' | 'GBP' | 'USD';
type CurrencySymbol = '€' | '£' | '$';

interface Currency {
    name: CurrencyName;
    symbol: string;
}