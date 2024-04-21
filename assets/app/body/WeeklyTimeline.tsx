import {
    ListItem,
    Spinner,
    Timeline,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    Typography,
} from "@material-tailwind/react";
import {useEffect, useMemo, useState} from "react";
import {getDate} from "../components/Hooks.tsx";
import {CalendarDate} from "../classes/CalendarDate.tsx";
import {months} from "../footer/DateSelector.tsx";

function getWeekDates(): [Date, CalendarDate][] {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekDates: [Date, CalendarDate][] = [];

    for (let i = 0; i < 7; i++) {
        const newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() + i);
        weekDates.push([
            newDate,
            getDate(newDate.getMonth() + 1, newDate.getDate()),
        ]);
    }

    return weekDates;
}

const weekDays = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
const WeeklyTimeline: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const today = new Date();
    const weekDaysObjects = useMemo(() => getWeekDates(), []);
    useEffect(() => {
        Promise.all(weekDaysObjects
                .map(date => date[1]?.eventAt(0).response())
                .filter(event => !!event))
            .then(() => setLoading(false));
    }, []);
    return (
        <Timeline>
            {weekDaysObjects.map(([date, object], index) => {
                const event = object?.eventAt(0);
                return (
                    <TimelineItem key={`weekly_timeline_day_${index}`}
                                  className={`h-20 md:h-1/2 lg:h-16 timeline-item`}>
                        {index !== weekDays.length - 1 &&
                            <TimelineConnector className={`!w-[70px] ${!event?.title && 'opacity-40'}`}/>}
                    <ListItem
                        disabled={!event?.title}
                        onClick={() => object!.use()}
                        placeholder={undefined}
                        className="relative rounded-xl border border-blue-gray-50 bg-white py-1 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                        <TimelineHeader>
                            <TimelineIcon className="p-[1ch]" variant="ghost"
                                          color={index === today.getDay() && !loading ? "red" : "gray"}>
                                {loading ? (<Spinner/>) : weekDays[index]}
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography color="blue-gray" className={'font-bold text-[.8rem]'}
                                            id={'weekly-timeline-title'}
                                            placeholder={undefined}>
                                    {loading ? `Olay Kaydı aranıyor...` :
                                        !event?.title ? `Kayıtlı Olay bulunmamakta...` : event.title}
                                </Typography>
                                <Typography placeholder={undefined} variant="small" color="gray"
                                            className="font-normal text-[.8rem]">
                                    {object?.name() || `${date.getDate()} ${months[date.getMonth()]}`}
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </ListItem>
                </TimelineItem>
                )
            })}
        </Timeline>
    );
};

export default WeeklyTimeline;