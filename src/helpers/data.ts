export function getNestedValue(data: IndexedObject, path: string) {
    return path.split('.').reduce((parent: IndexedObject, child: string) => parent?.[child], data || {});
}

export function getDurationMinutes(duration: Date) {
    return duration.getUTCHours() * 60 + duration.getUTCMinutes();
}

export function getDurationHours(duration: Date) {
    return duration.getUTCHours() + duration.getUTCMinutes() / 60;
}

export function getHoursDuration(hours: number) {
    const h = Math.floor(hours);
    const m = Math.round(60 * (hours - h)).toString().padStart(2, '0');
    return `${h}:${m}`;
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
    const match = value?.match(/(\d+)Y(\d+)M(\d+)D/);
    const days = parseInt(match?.[3] || '0');
    const months = parseInt(match?.[2] || '0');
    const years = parseInt(match?.[1] || '0');

    // Get label
    let label = '';
    if (years >= 1 && months === 0 && days === 0) {
        label = years === 1 ? 'Yearly' : `${years} years`;
    } else if (years === 0 && months >= 1 && days === 0) {
        label = months === 1 ? 'Monthly' : `${months} months`;
    } else if (years === 0 && months === 0 && days >= 1 && days % 7 === 0) {
        label = days === 7 ? 'Weekly' : `${days / 7} weeks`;
    } else if (years === 0 && months === 0 && days >= 1) {
        label = days === 1 ? 'Daily' : `${months} days`;
    } else {
        label = (years ? `${years}Y` : '') + (months ? `${months}M` : '') + (days ? `${days}D` : '');
    }

    // Return date interval
    return {
        days,
        label,
        months,
        years,
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