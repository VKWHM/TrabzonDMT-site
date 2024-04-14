import ImageCarousel from './ImageCarousel.tsx';
import WeeklyTimeline from './WeeklyTimeline.tsx';
import ReadSection from './ReadSection';

const Body = () => {
    return (
        <div>
            <div className={'w-full flex-1 p-3 grid grid-rows-[auto_auto_auto] md:grid-cols-8 md:grid-rows-none'}>
                <div className={'row-span-1 md:col-span-5 mx-auto'}>
                    <ImageCarousel/>
                </div>
                <div className={'row-span-1 md:col-span-3 rounded mx-2 flex flex-col my-3 md:my-auto'}>
                    <WeeklyTimeline/>
                </div>
            </div>
            <ReadSection/>
        </div>
    );
};

export default Body;