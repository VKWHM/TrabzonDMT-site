import React, {memo, useEffect, useState} from 'react';
import {Accordion, AccordionBody, AccordionHeader, Button} from "@material-tailwind/react";
import ChangeTransition from '../../components/ChangeTransition';
import {CalendarEvent} from '../../classes/CalendarEvent';

interface ITextAccordion {
    events: ({
        id?: number
        title: string,
        summary?: string,
        content: React.ReactNode,
    } | CalendarEvent)[];
}

let first = 0;

const TextAccordion: React.FC<ITextAccordion> = ({events}) => {
    const [open, setOpen] = useState<number>(((first < 3) && +window.location.hash.slice(1)) || 1);
    useEffect(() => {
        first++;
        window.location.hash = open.toString();
        window.onhashchange = () => {
            const hash = +window.location.hash.slice(1);
            if (!isNaN(hash) && hash !== open) {
                setOpen(hash);
            }
        };
    }, [open]);
    const handleOpen = (value: number) => setOpen(value === open ? 0 : value);
    return (
        <div>
            {events.map((event, index) => (
                <Accordion key={`accordion_${event?.id || index}`} placeholder={undefined} open={open === (index + 1)}
                           icon={<Icon id={(index + 1)} open={open}/>}>
                    <AccordionHeader placeholder={undefined}
                                     onClick={() => handleOpen(index + 1)}>{event.title}</AccordionHeader>
                    <AccordionBody>
                        <TextAccordionBody content={event.content} summary={event.summary}/>
                    </AccordionBody>
                </Accordion>
            ))}
        </div>
    );
};

const TextAccordionBody: React.FC<{ content: React.ReactNode, summary?: string }> = ({content, summary}) => {
    const [showContent, setShowContent] = useState<boolean>(!summary);
    return (
        <ChangeTransition state={showContent}>
            <div>
                {showContent ? (
                    <>
                        {content}
                        {summary && (
                            <Button placeholder={undefined}
                                    size={'sm'}
                                    variant={'outlined'}
                                    onClick={() => setShowContent(false)}
                                    className={'mt-3 font-semibold'}>Özeti Oku</Button>
                        )}
                    </>
                ) : (
                    <>
                        {summary}
                        <Button placeholder={undefined}
                                size={'sm'}
                                variant={'outlined'}
                                onClick={() => setShowContent(true)}
                                className={'mt-3 font-semibold'}>Detaylı Oku</Button>
                    </>
                )}
            </div>
        </ChangeTransition>
    );
};

const Icon: React.FC<{ id: number, open: number }> = ({id, open}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
        </svg>
    );
};

export default memo(TextAccordion);