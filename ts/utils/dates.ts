import { pad } from './numbers';

const getClockTime = (date: Date): string => {
    return pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes()) +
        ':' + pad(date.getUTCSeconds());
};

const toISOString = Date.prototype.toISOString ? (date: Date): string => {
    return Date.prototype.toISOString.call(date);
} : (date: Date): string => {
    return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        'T' + pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes()) +
        ':' + pad(date.getUTCSeconds()) +
        '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
}

export {
    getClockTime,
    toISOString
}