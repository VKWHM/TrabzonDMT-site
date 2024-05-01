import {CalendarEvent} from './CalendarEvent.tsx';
import axios, {AxiosError} from 'axios';
import {getDate, getEvent} from "../components/Hooks.tsx";
import {months} from "../footer/DateSelector.tsx";

export interface IDate {
    id: string,
    day: number,
    month: number,
    createdAt: string,
    events: string[]
}

export interface ICalendarDate extends Omit<IDate, 'createdAt' | 'events'> {
    createdAt?: Date,
    events: CalendarEvent[]
}

export class CalendarDate implements ICalendarDate {
    protected _promise?: Promise<any>;


    public static new({day, month, events, createdAt, id}: IDate) {
        return new this(id, day, month, createdAt, events);
    }

    public constructor(
        public id: string = '',
        protected _day: number = 0,
        protected _month: number = 0,
        protected _createdAt: string = '',
        protected _events: string[] = [],
    ) {
        if (this.id && this._day && this._month && this._createdAt && this._events) return;
        let requestUri: string;
        if (this.id !== '') {
            if (this._day && this._month) return;
            requestUri = this.id;

        } else {
            requestUri = `/api/calendar_dates?day=${this.day}&month=${this.month}&paga=1`;
        }
        this._promise = axios.get<IDate, any>(requestUri)
            .then(response => {
                if ('hydra:Collection' === response.data['@type']) {
                    if (response.data['hydra:totalItems'] === 1) {
                        const data = response.data['hydra:member'][0];
                        data.id = data['@id'];
                        return data as IDate;
                    }
                    throw new Error('Invalid response data type. Expected "CalendarDate" or "hydra:Collection".');
                } else if ('CalendarDate' === response.data['@type']) {
                    const {data} = response;
                    data.id = data['@id'];
                    return data as IDate;
                } else {
                    throw new Error('Invalid response data type. Expected "IDate".');
                }

            })
            .then(data => {
                this.id = data.id;
                const {day, month, events, createdAt} = data;
                this._day = day;
                this._month = month;
                this._events = events;
                this._createdAt = createdAt;
            })
            .catch(error => {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        console.error(this.id ?
                            `CalendarDate with ID ${this.id} not found.` :
                            `CalendarDate ${this.day}/${this.month} not found.`);
                    } else {
                        console.error('An error occurred while fetching the CalendarDate:', error.message);
                    }
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            });
    }

    public use() {};

    public nextDate(): CalendarDate {
        let date = new Date(new Date().getFullYear(), this._month - 1, this._day);
        date.setDate(date.getDate() + 1);
        let nextDate = getDate(date.getMonth() + 1, date.getDate());
        while (!nextDate) {
            date.setDate(date.getDate() + 1);
            nextDate = getDate(date.getMonth() + 1, date.getDate());
        }
        return nextDate;
    }

    public previousDate(): CalendarDate {
        let date = new Date(new Date().getFullYear(), this._month - 1, this._day);
        date.setDate(date.getDate() - 1);
        let previousDate = getDate(date.getMonth() + 1, date.getDate());
        while (!previousDate) {
            date.setDate(date.getDate() - 1);
            previousDate = getDate(date.getMonth() + 1, date.getDate());
        }
        return previousDate;
    }

    public async response() {
        return await this._promise;
    };

    public get day(): number {
        return this._day;
    }

    public get month(): number {
        return this._month;
    }

    public get events(): CalendarEvent[] {
        return this._events.map(event => getEvent(event));
    }

    public eventAt(index: number): CalendarEvent {
        return getEvent(this._events[index]);
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public name(): string {
        return `${this._day} ${months[(this._month - 1) % 12]}`;
    }

}

