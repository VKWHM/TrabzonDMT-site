import React, {useState} from 'react';
import {Accordion, AccordionBody, AccordionHeader, Button} from "@material-tailwind/react";
import ChangeTransition from '../../components/ChangeTransition';

const TextAccordion: React.FC<{ data: { title: string, summary?: string, content: string }[] }> = ({data}) => {
    const [open, setOpen] = useState<number>(1);
    const handleOpen = (value: number) => setOpen(value === open ? 0 : value);
    return (
        <div>
            {data.map((item, index) => (
                <Accordion key={`accordion_${index}`} placeholder={undefined} open={open === (index + 1)}
                           icon={<Icon id={(index + 1)} open={open}/>}>
                    <AccordionHeader placeholder={undefined}
                                     onClick={() => handleOpen(index + 1)}>{item.title}</AccordionHeader>
                    <AccordionBody>
                        <TextAccordionBody content={item.content} summary={item.summary}/>
                    </AccordionBody>
                </Accordion>
            ))}
        </div>
    );
};

const TextAccordionBody: React.FC<{ content: string, summary?: string }> = ({content, summary}) => {
    const [showContent, setShowContent] = useState<boolean>(!summary);
    return (
        <ChangeTransition state={showContent}>
            <div>
                {showContent ? (
                    <>
                        <p>{content}</p>
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
                        <p>{summary}</p>
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

export default TextAccordion;