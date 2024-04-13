import {
    ListItem,
    Timeline,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    Typography,
} from "@material-tailwind/react";

const weekDays = ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'];
const WeeklyTimeline: React.FC = () => {
    const today = new Date().getDay();
    return (
        <Timeline>
            {weekDays.map((day, index) => (
                <TimelineItem key={`weekly_timeline_day_${index}`} className="h-20 md:h-1/2 lg:h-16 timeline-item">
                    {index !== weekDays.length - 1 && <TimelineConnector className={'!w-[76px]'}/>}
                    <ListItem
                        placeholder={undefined}
                        className="relative rounded-xl border border-blue-gray-50 bg-white py-1 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                        <TimelineHeader>
                            <TimelineIcon className="p-[1ch]" variant="ghost"
                                          color={index === today ? "red" : "indigo"}>
                                {day}
                            </TimelineIcon>
                            <div className="flex flex-col gap-1">
                                <Typography color="blue-gray" className={'font-bold text-[.8rem]'}
                                            id={'weekly-timeline-title'}
                                            placeholder={undefined}>
                                    Mart ayının {day} gününde olan olayın başlığı
                                </Typography>
                                <Typography placeholder={undefined} variant="small" color="gray"
                                            className="font-normal text-[.8rem]">
                                    {index + 1} Mart
                                </Typography>
                            </div>
                        </TimelineHeader>
                    </ListItem>
                </TimelineItem>
            ))}
        </Timeline>
    );
};

export default WeeklyTimeline;