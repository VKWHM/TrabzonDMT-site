import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {year} from "../DateSelector.tsx";
import ChangeTransition from "../../components/ChangeTransition.tsx";
import {getDate, getDateByID, getMonthDays} from "../../components/Hooks.tsx";
import {dateContext} from "../../components/Contexts.tsx";

const getDaysInMonth = (month: number, year: number) => {
    // Month is 0-based in JavaScript Date, so we need to add 1 when creating the date
    return new Date(year, month, 0).getDate();
};
export const DaySelector: React.FC<{ month: number }> = ({month}) => {
    const date = useContext(dateContext);
    const [currentDay, setCurrentDay] = useState<number>(0);
    const calendarDate = useMemo(() => getDateByID(date), [date]);
    const setDay = (day: number) => {
        getDate(month, day).use();
        setCurrentDay(day);
    };
    const daysContainerRef = useRef<HTMLDivElement>(null);
    const days = useMemo(() =>
        Array.from({length: getDaysInMonth(month, year)}, (_, i) => i + 1), [month]);
    const existDays = useMemo(() =>
        getMonthDays(month), [month]);
    useEffect(() => {
        setCurrentDay(calendarDate?.month === month ? calendarDate.day : 0);
    }, [month, date]);
    return (
        <div
            className={'mx-auto w-[300px] sm:w-[500px] md:w-[650px] lg:w-[900px] mt-1 py-2 border-t-2 border-t-black rounded-t-lg shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 bg-white pointer-events-auto'}>
            <div className={'relative mx-3 flex gap-4 justify-between'}>
                <div ref={daysContainerRef} className={'flex gap-4 items-center overflow-x-auto hide-scrollbar'}>
                    {existDays.map((day, index) => (
                        <IconButton
                            disabled={day === currentDay}
                            // color={'white'}
                            variant={'outlined'}
                            key={`${day}_${index}`}
                            size={'sm'}
                            id={`day-${day}`}
                            className={'p-4 font-bold'}
                            onClick={() => setDay(day)}
                            placeholder={undefined}>{day}</IconButton>
                    ))}
                </div>
                <Menu allowHover={true} placement={'left-start'}>
                    <MenuHandler placeholder={undefined}>
                        <IconButton
                            className={'p-5'}
                            size={'sm'}
                            placeholder={undefined}>
                            <ChangeTransition state={currentDay}>
                                {currentDay === 0 ? (
                                    <FontAwesomeIcon icon={faCalendarDays} size={'2xl'}/>
                                ) : (
                                    <Typography placeholder={undefined} className={'font-bold'}>
                                        {currentDay}
                                    </Typography>
                                )}
                            </ChangeTransition>
                        </IconButton>
                    </MenuHandler>
                    <MenuList className={'grid grid-cols-6'} placeholder={undefined}>
                        {days.map((day, index) => (
                            <MenuItem
                                disabled={!existDays.includes(day)}
                                className={`p-3 text-center ${currentDay === day ? "opacity-50 pointer-events-none" : ""}`}
                                placeholder={undefined}
                                key={`${month}_${day}_${index}`}
                                onClick={() => {
                                    setDay(day);
                                    daysContainerRef.current!.scrollTo({
                                        left: daysContainerRef.current!.scrollWidth * (index / days.length),
                                        behavior: 'smooth',
                                    });
                                }}>{day}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </div>
        </div>
    );
};