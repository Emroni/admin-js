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