import SearchBox from "./SearchBox.tsx";
import {Chip, IconButton, List, ListItem, Tooltip} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpFromBracket, faBackward, faForward} from "@fortawesome/free-solid-svg-icons";
import {useContext, useMemo, useState} from "react";
import {getDateByID} from "../../components/Hooks.tsx";
import {dateContext} from "../../components/Contexts.tsx";
import {CalendarDate} from "../../classes/CalendarDate.tsx";
import {CalendarEvent} from "../../classes/CalendarEvent.tsx";

const iconSize = 'sm';

export const HelperBox: React.FC = () => {
    const date = useContext(dateContext);
    const cdate = useMemo(() => getDateByID(date), [date]);
    return (
        <div className={'sticky top-20 bg-white rounded-xl my-shadow p-2 flex flex-col gap-2'}>
            <div className={'flex gap-2'}>
                <SearchBox/>
                <Share date={cdate}/>
            </div>
            <div className={'flex gap-2 justify-between'}>
                <div className={'flex gap-2'}>
                    <Backward date={cdate}/>
                    <Forward date={cdate}/>
                </div>
                <Chip
                    className={'text-black'}
                    size={iconSize}
                    variant={'outlined'}
                    value={cdate ? cdate.name() : 'Tarih Seçin'}/>
            </div>
            <List
                className={'hidden'}
                placeholder={undefined}>
                <ListItem placeholder={undefined}>Test</ListItem>
            </List>
        </div>
    );
};

const Backward: React.FC<{ date?: CalendarDate }> = ({date}) => {
    const previousCD = date?.previousDate();
    return (
        <Tooltip content={previousCD && previousCD.name()}>
            <IconButton
                disabled={!date}
                size={iconSize}
                color={'white'}
                // size={'lg'}
                onClick={() => previousCD!.use()}
                placeholder={undefined}>
                <FontAwesomeIcon
                    size={'lg'}
                    icon={faBackward}/>
            </IconButton>
        </Tooltip>
    );
};

const Forward: React.FC<{ date?: CalendarDate }> = ({date}) => {
    const nextCD = date?.nextDate();
    return (
        <Tooltip content={nextCD && nextCD.name()}>
            <IconButton
                disabled={!date}
                size={iconSize}
                color={'white'}
                // size={'lg'}
                onClick={() => nextCD!.use()}
                placeholder={undefined}>
                <FontAwesomeIcon
                    size={'lg'}
                    icon={faForward}/>
            </IconButton>
        </Tooltip>
    );
};

const Share: React.FC<{ date: CalendarDate }> = ({date}) => {
    const [text, setText] = useState('Paylaş');
    const handleClick = () => {
        const open = +window.location.hash.slice(1);
        let event: CalendarEvent | undefined;
        if (!isNaN(open)) {
            event = date.events[open - 1] || date.events[0];
        } else {
            event = date.events[0];
        }

        if (navigator.share !== undefined) {
            navigator.share({
                title: 'Trabzon Dijital Maarif Takvimi',
                text: event?.title,
                url: window.location.href,
            }).catch((error) => console.log('ERROR: ', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            setText("Kopyalandı!");
            setTimeout(() => setText('Paylaş'), 1500);
        }
    };
    return (
        <Tooltip content={text}>
            <IconButton
                onClick={handleClick}
                color={'white'}
                placeholder={undefined}>
                <FontAwesomeIcon
                    size={'xl'}
                    icon={faArrowUpFromBracket}/>
            </IconButton>
        </Tooltip>
    );
};