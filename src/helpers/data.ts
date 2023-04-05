export function getNestedValue(data: IndexedObject, path: string) {
    return path.split('.').reduce((parent: IndexedObject, child: string) => parent?.[child], data || {});
}

export function getDurationHours(duration: Date) {
    return duration.getUTCHours() + duration.getUTCMinutes() / 60;
}

export function getDurationMinutes(duration: Date) {
    return duration.getUTCHours() * 60 + duration.getUTCMinutes();
}

export function getHoursDuration(hours: number) {
    const h = Math.floor(hours);
    const m = Math.round(60 * (hours - h)).toString().padStart(2, '0');
    return `${h}:${m}`;
}

export function getMinutesDuration(minutes: number) {
    const h = Math.floor(minutes / 60);
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
}

export function getLabel(value?: string) {
    if (!value) {
        return '';
    }

    return value.substring(0, 1).toUpperCase() + value.substring(1).replace(/([A-Z])/g, ' $1').toLowerCase();
}

export function getSorted<T>(items: T[], key: string) {
    return items.sort((a: any, b: any) => a[key] < b[key] ? -1 : 1);
}

export function getUnique<T>(items: T[], key?: string) {
    if (key) {
        const map: IndexedObject = {};
        items.forEach(item => map[(item as any)[key]] = item);
        return Object.values(map);
    } else {
        const set = new Set(items);
        return Array.from(set);
    }
}

export function parseDateInterval(value?: string) {
    // Parse value
    const match = value?.match(/(\d+)([DMWY])/);
    const amount = parseInt(match?.[1] || '0');
    const unit = match?.[2];

    // Get label
    let label = '';
    if (unit === 'Y') {
        label = amount === 1 ? 'Yearly' : `${amount} years`;
    } else if (unit === 'M') {
        label = amount === 1 ? 'Monthly' : `${amount} months`;
    } else if (unit === 'W') {
        label = amount === 1 ? 'Weekly' : `${amount} weeks`;
    } else if (unit === 'D') {
        label = amount === 1 ? 'Daily' : `${amount} days`;
    }

    // Return date interval
    return {
        days: unit === 'D' ? amount : 0,
        label,
        months: unit === 'M' ? amount : 0,
        value,
        weeks: unit === 'W' ? amount : 0,
        years: unit === 'Y' ? amount : 0,
    } as DateInterval;
}

export function parseFilterIds(ids: any) {
    if (Array.isArray(ids)) {
        return {
            in: ids.map(id => Number(id)),
        };
    }
    return Number(ids);
}

export function parseOrder(fallback: string, order?: string | null) {
    const [field, direction] = (order || fallback).split(' ');
    return [
        {
            [field]: direction,
        }
    ];
}