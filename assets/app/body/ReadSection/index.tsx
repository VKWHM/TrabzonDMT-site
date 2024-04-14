import TextAccordion from "./TextAccordion.tsx";

const data = [
    {title: 'Title 1', content: 'Content 1'},
    {title: 'Title 2', content: 'Content 2'.repeat(500), summary: 'Content 2'},
    {title: 'Title 3', content: 'Content 3'},
    {title: 'Title 4', content: 'Content 4'},
    {title: 'Title 5', content: 'Content 5'},
];

const ReadSection: React.FC = () => {
    return (
        <div className={'relative mx-3 grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-6 w-full'}>
            <div className={'md:col-span-2 row-span-1 text-center'}>
                <div className={'sticky top-20'}>
                    search
                    <br/>
                    toggle
                    <br/>
                    share

                </div>
            </div>
            <div className={'md:col-span-4 row-span-1 text-center min-h-[65vh]'}>
                <TextAccordion data={data}/>
            </div>
        </div>
    );
};

export default ReadSection;