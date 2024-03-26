import ImageCarousel from './ImageCarousel.tsx';
import WeeklyTimeline from './WeeklyTimeline.tsx';

const Body = () => {
    return (
        <div className={'w-full flex-1 p-3 grid grid-rows-[auto_auto] md:grid-cols-8 md:grid-rows-none'}>
            <div className={'md:col-span-5 m-auto md:mt-3'}>
                <ImageCarousel/>
            </div>
            <div className={'md:col-span-3 rounded mx-2 flex flex-col my-3 md:my-auto'}>
                <WeeklyTimeline/>
            </div>
        </div>
    );
};

export default Body;