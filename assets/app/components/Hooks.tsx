import axios from "axios";
import {CalendarDate, IDate} from "../classes/CalendarDate.tsx";
import {CalendarEvent} from "../classes/CalendarEvent.tsx";

const datesContainer: {
    [key: number]: {
        [key: number]: CalendarDate,
    }
} = {};

const eventsContainer: {
    [key: string]: CalendarEvent,
} = {};

export async function initialize() {
    await axios.get('/api/calendar_dates')
        .then(response => response.data['hydra:member'])
        .then((dates: IDate[]) => {
            dates.forEach(date => {
                const cd = CalendarDate.new(date);
                if (!datesContainer[cd.month]) {
                    datesContainer[cd.month] = {};
                }
                datesContainer[cd.month][cd.day] = cd;
            });
        })
        .catch(error => {
            if (error instanceof axios.AxiosError) {
                if (error.response?.status === 404) {
                    console.error('The requested calendar dates could not be found.');
                } else {
                    console.error('An error occurred while fetching the calendar dates:', error.message);
                }
            } else {
                console.error('An unexpected error occurred:', error);
            }
        });
}

export function getDate(month: number, day: number) {
    if (!Object.values(datesContainer).length) {
        throw new Error('The dates container is empty. Please ensure it is initialized before calling getDate.');
    }
    return datesContainer[month][day];
}

export function getMonthDays(month: number): number[] {
    if (!Object.values(datesContainer).length) {
        throw new Error('The dates container is empty. Please ensure it is initialized before calling getMonthDays.');
    }
    const monthDays = datesContainer[month] || {};
    return Object.keys(monthDays).map(day => +day);
}

export function getEvent(eventID: string) {
    if (!eventsContainer[eventID]) {
        eventsContainer[eventID] = new CalendarEvent(eventID);
    }
    return eventsContainer[eventID];
}