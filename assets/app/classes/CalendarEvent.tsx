import axios from "axios";

export interface IEvent {
    id: string,
    date: {
        id: string,
        day: number,
        month: number,
    },
    title: string,
    summary?: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export interface ICalendarEvent extends Omit<IEvent, 'createdAt' | 'updatedAt'> {
    createdAt: Date,
    updatedAt: Date,
}

export class CalendarEvent implements ICalendarEvent {
    protected _promise?: Promise<any>;

    public constructor(
        public id: string,
        private _date: { id: string; day: number; month: number; } = {
            id: '',
            day: 0,
            month: 0,
        },
        private _title: string = '',
        private _content: string = '',
        private _createdAt: string = '',
        private _updatedAt: string = '',
        private _summary: string | undefined = undefined,
    ) {
        this._promise = axios.get<IEvent>(this.id)
            .then(response => response.data)
            .then(data => {
                this.id = data.id;
                const {date, title, summary, content, createdAt, updatedAt} = data;
                this._date = date;
                this._title = title;
                this._summary = summary;
                this._content = content;
                this._createdAt = createdAt;
                this._updatedAt = updatedAt;
            })
            .catch(error => {
                if (error instanceof axios.AxiosError) {
                    if (error.response?.status === 404) {
                        console.error(`CalendarEvent with ID ${this.id} not found.`);
                    } else {
                        console.error('An error occurred while fetching the CalendarEvent:', error.message);
                    }
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            });
    }

    public async response() {
        return await this._promise;
    }

    public get content(): string {
        return this._content;
    }

    public get title(): string {
        return this._title;
    }

    public get updatedAt(): Date {
        return new Date(this._updatedAt);
    }

    public get createdAt(): Date {
        return new Date(this._createdAt);
    }

    public get summary(): string | undefined {
        return this._summary;
    }

    public get date(): { id: string; day: number; month: number } {
        return this._date;
    }
}
