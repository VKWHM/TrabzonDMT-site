import axios from "axios";
import {CalendarDate, IDate} from "../classes/CalendarDate.tsx";
import {CalendarEvent} from "../classes/CalendarEvent.tsx";
import {useEffect, useState} from "react";

const datesContainer: {
    [key: string]: CalendarDate,
} = {};

const eventsContainer: {
    [key: string]: CalendarEvent,
} = {};

export function useInitializer(): [boolean, string] {
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState(true);

    class UseCalendarDate extends CalendarDate {
        public override use() {
            setDate(this.id);
        }
    }

    useEffect(() => {
        axios.get('/api/calendar_dates')
            .then(response => response.data['hydra:member'])
            .then((dates: IDate[]) => {
                dates.forEach(date => {
                    const cd = UseCalendarDate.new(date);
                    datesContainer[cd.id] = cd;
                });
            })
            .then(() => setTimeout(() => setLoading(false), 1000))
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
    }, []);
    return [loading, date];
}

export function getDateByID(id: string) {
    return datesContainer[id];
}

export function getDate(month: number, day: number) {
    if (!Object.values(datesContainer).length) {
        throw new Error('The dates container is empty. Please ensure it is initialized before calling getDate.');
    }
    return Object.values(datesContainer).filter(cd => cd.month === month && cd.day === day)[0];
}

export function getMonthDays(month: number): number[] {
    if (!Object.values(datesContainer).length) {
        throw new Error('The dates container is empty. Please ensure it is initialized before calling getMonthDays.');
    }
    return Object.values(datesContainer)
        .filter(cd => cd.month === month)
        .map(cd => cd.day)
        .sort((a, b) => a - b);
}

export function getEvent(eventID: string) {
    if (!eventsContainer[eventID]) {
        eventsContainer[eventID] = new CalendarEvent(eventID);
    }
    return eventsContainer[eventID];
}