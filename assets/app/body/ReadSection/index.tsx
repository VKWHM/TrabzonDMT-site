import TextAccordion from "./TextAccordion.tsx";
import {HelperBox} from "./HelperBox.tsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {dateContext} from "../../components/Contexts.tsx";
import {getDateByID} from "../../components/Hooks.tsx";
import {Typography} from "@material-tailwind/react";

const ReadSection: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const date = useContext(dateContext);
    const events = useMemo(() => getDateByID(date)?.events, [date]);
    useEffect(() => {
        if (!events) return;
        setLoading(true);
        document.querySelector('#read_section')?.scrollIntoView({
            behavior: 'smooth',
        });
        Promise.all(events.map(event => event.response()))
            .then(() => setTimeout(() => setLoading(false), 300));

    }, [date]);
    return (
        <div className={'relative grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-6 w-full'}>
            <div id={'read_section'} className={'md:col-span-2 row-span-1 text-center my-2 px-5'}>
                <HelperBox/>
            </div>
            <div className={'md:col-span-4 row-span-1 text-center min-h-[65vh] px-5'}>
                {date ? loading ? (
                    <TextLoading/>
                ) : (
                    <TextAccordion events={events}/>
                ) : (
                    <div className="max-w-full">
                        Hakkimizda
                    </div>
                )}
            </div>
        </div>
    );
};

const TextLoading: React.FC = () => {
    return (
        <div className="max-w-full animate-pulse">
            <Typography
                placeholder={undefined}
                as="div"
                variant="h1"
                className="mb-4 h-5 w-11/12 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                placeholder={undefined}
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                placeholder={undefined}
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
        </div>
    );
};

export default ReadSection;