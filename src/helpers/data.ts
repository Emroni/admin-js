export function getNestedValue(data: IndexedObject, path: string) {
    return path.split('.').reduce((parent: IndexedObject, child: string) => parent?.[child], data || {});
}

export function hoursToTime(value: number) {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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