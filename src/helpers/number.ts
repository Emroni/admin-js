export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

export function parseNumber(value: any) {
    return value !== undefined ? Number(value) : undefined;
}

export function hoursToTime(value: number) {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}