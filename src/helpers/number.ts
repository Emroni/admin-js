export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

export function parseNumber(value: any) {
    return value !== undefined ? Number(value) : undefined;
}