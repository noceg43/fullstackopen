import { NewDiaryEntry, Weather, Visibility } from './types';


// lets use the uknown type, its different from any so no warnings showed
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    // check if the object is an object and not null
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    // check if the object has the required properties
    if ('date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: NewDiaryEntry = {
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            date: parseDate(object.date),
            comment: 'comment' in object ? parseComment(object.comment) : undefined
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseWeather = (weather: unknown): Weather => {
    if (!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};

const isWeather = (param: string): param is Weather => {
    return Object.values(Weather).map(v => v.toString()).includes(param);
};

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};

const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseComment = (comment: unknown): string => {
    if (!isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }

    return comment;
};

const isString = (text: unknown): text is string => {
    // check first if the type is string so like let a = 'hello'
    // or if it is an instance of String so like let a = new String('hello')
    return typeof text === 'string' || text instanceof String;
};

export default toNewDiaryEntry;


