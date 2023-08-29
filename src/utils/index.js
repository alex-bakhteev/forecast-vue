export const getTime = (seconds, timezone) => {
    const time = new Date((seconds + timezone) * 1000).toLocaleTimeString('ru-RU', { timeZone: 'Atlantic/Reykjavik' });
    return time;
}

export default getTime;