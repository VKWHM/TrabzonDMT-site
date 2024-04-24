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

export interface IImageInfo {
    id: number,
    description?: string,
    imageUrl: string,
    imageName: string,
}

let imagesContainer: IImageInfo[] = [];

const loaded = {
    dates: false,
    images: false,
};

export function useInitializer(): [boolean, string] {
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const finished = (key: "dates" | "images") => {
        switch (key) {
            case "dates":
                if (loaded.images) {
                    setLoading(false);
                }
                loaded.dates = true;
                break;
            case "images":
                if (loaded.dates) {
                    setLoading(false);
                }
                loaded.images = true;
                break;
        }
    };

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
            .then(() => setTimeout(() => finished('dates'), 1000))
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
        axios.get('/api/image_informations')
            .then(response => response.data['hydra:member'])
            .then((images: IImageInfo[]) => {
                imagesContainer = images;
            })
            .then(() => console.log(imagesContainer))
            .then(() => setTimeout(() => finished('images'), 1000))
            .catch(error => {
                if (error instanceof axios.AxiosError) {
                    if (error.response?.status === 404) {
                        console.error('The requested image informations could not be found.');
                    } else {
                        console.error('An error occurred while fetching the image informations:', error.message);
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

export function getImageInfo(index: number): IImageInfo {
    return imagesContainer[index];
}

export function getInitImageInfo() {
    return imagesContainer.slice(0, 3);
}