import {Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {DaySelector} from "./components/DaySelector.tsx";
import ChangeTransition from "./components/ChangeTransition.tsx";

export const year = new Date().getFullYear();
export const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const DateSelector: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState<string>(months[0]);
    const nextMonth = () => {
        const currentIndex = months.indexOf(currentMonth);
        setCurrentMonth(months[(currentIndex + 1) % 12]);
    };
    const previousMonth = () => {
        const currentIndex = months.indexOf(currentMonth);
        setCurrentMonth(months[(((currentIndex - 1) % 12) + 12) % 12]);
    };
    return (
        <div className={'relative w-full pt-2 border-b-2 border-b-black'}>
            <div className={'mx-auto w-fit flex items-center pointer-events-auto'}>
                <IconButton
                    size={'md'}
                    onClick={previousMonth}
                    placeholder={undefined}>
                    <FontAwesomeIcon size={'xl'} icon={faCaretLeft}/>
                </IconButton>
                <Menu allowHover={true}>
                    <MenuHandler placeholder={undefined}>
                        <Button
                            className={'mx-2 px-0 min-w-32 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border border-white/80 bg-white'}
                            variant={'text'}
                            size={'sm'}
                            placeholder={undefined}>
                            <Typography placeholder={undefined} variant={'lead'} className={'font-bold'}>
                                <ChangeTransition>
                                    {currentMonth}
                                </ChangeTransition>
                            </Typography>
                        </Button>
                    </MenuHandler>
                    <MenuList className={'grid grid-cols-2'} placeholder={undefined}>
                        {months.map((month, index) => (
                            <MenuItem className={'text-center'} placeholder={undefined} key={`${month}_${index}`}
                                      onClick={() => setCurrentMonth(month)}>{month}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <IconButton
                    size={'md'}
                    onClick={nextMonth}
                    placeholder={undefined}>
                    <FontAwesomeIcon size={'xl'} icon={faCaretRight}/>
                </IconButton>
            </div>
            <DaySelector month={currentMonth}/>
        </div>
    );
};

export default DateSelector;