import {faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Carousel, IconButton, Typography} from "@material-tailwind/react";
import {FastAverageColor} from "fast-average-color";

import {useCallback, useEffect, useState} from "react";
import {getImageInfo, getInitImageInfo, IImageInfo} from "../components/Hooks.tsx";

type prevArrow = (args: {
    loop: boolean;
    handlePrev: () => void;
    activeIndex: number;
    firstIndex: boolean;
}) => React.ReactNode | void;

type nextArrowProps = (args: {
    loop: boolean;
    handleNext: () => void;
    activeIndex: number;
    lastIndex: boolean;
}) => React.ReactNode | void;

type navigation = (args: {
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
    length: number;
}) => React.ReactNode | void;

function getImageAverageColor(currentImageIndex: number) {
    const fac = new FastAverageColor();
    const currentImage = document.querySelector(`#carousel-image-${currentImageIndex}`) as HTMLImageElement;
    if (!currentImage) {
        return true;
    }
    const {isLight} = fac.getColor(currentImage);
    return isLight;
}


export function ImageCarousel() {
    const [imageInfos, setImageInfos] = useState<IImageInfo[]>(getInitImageInfo());
    const [index, setIndex] = useState(0);
    const addImage = useCallback((callback: () => void, index: number) => {
        setImageInfos(prev => {
            if (imageInfos.length + 1 <= (index + 1)) {
                const next = getImageInfo(index + 1);
                if (next && !prev.find(ii => ii.id === next.id)) {
                    return [...prev, next];
                }
            }
            return prev;
        });
        callback();
    }, []);
    const prevArrow: prevArrow = useCallback(({handlePrev, firstIndex, activeIndex}) => {

        const isDark = getImageAverageColor(activeIndex);
        return (
            <IconButton
                disabled={firstIndex}
                placeholder={undefined}
                variant="text"
                color={isDark ? "white" : "black"}
                size="md"
                onClick={() => {
                    handlePrev();
                    setIndex(activeIndex);
                }}
                className="!absolute top-2/4 !left-4 -translate-y-2/4 bg-gray-400/50">
                <FontAwesomeIcon icon={faAnglesLeft} size={'2xl'}/>
            </IconButton>
        );
    }, []);

    const nextArrow: nextArrowProps = useCallback(({handleNext, lastIndex, activeIndex}) => {

        const isDark = getImageAverageColor(activeIndex);
        return (
            <IconButton
                disabled={lastIndex}
                placeholder={undefined}
                variant="text"
                color={isDark ? "white" : "black"}
                size="md"
                onClick={() => {
                    addImage(handleNext, activeIndex);
                    setIndex(activeIndex);
                }}
                className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-gray-400/50">
                <FontAwesomeIcon icon={faAnglesRight} size={'2xl'}/>
            </IconButton>
        );
    }, []);

    const navigation: navigation = useCallback(({setActiveIndex, activeIndex, length}) => {
        const isDark = getImageAverageColor(activeIndex);
        useEffect(() => {
            if (index !== activeIndex) {
                addImage(() => {}, activeIndex);
                setIndex(activeIndex);
            }
        }, [activeIndex]);
        return (
            <div className="absolute bottom-6 left-2/4 z-5 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                    <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i ? `w-8 ${isDark ? "bg-white" : "bg-black"}` : `w-4 ${isDark ? "bg-white/50" : "bg-gray-900/50"}`
                        }`}
                        onClick={() => {
                            if (i + 1 === length) {
                                addImage(() => setActiveIndex(i), activeIndex);
                            }
                            setActiveIndex(i);
                            setIndex(activeIndex);
                        }}
                    />
                ))}
            </div>
        );
    }, []);

    return (
        <div className={'my-shadow rounded-xl'}>
            <div className={'bg-white/70 p-2 rounded-t-xl text-center'}>
                <Typography variant={'small'} placeholder={undefined}>
                    {imageInfos[index]?.description || "-"}
                </Typography>
            </div>
            <Carousel
                autoplayDelay={12500}
                autoplay={true}
                prevArrow={prevArrow}
                nextArrow={nextArrow}
                placeholder={undefined}
                className="relative h-fit min-h-0 max-h-[100vh] ml-auto bg-transparent flex items-center rounded-b-xl border border-t-gray-500"
                navigation={navigation}
            >
                <img
                    src="/images/15_-_ipekyolu_ticareti.jpg"
                    alt="image 1"
                    className="h-fit max-h-56 sm:max-h-96 mx-auto object-cover"
                />
                {imageInfos.map((iinfo, index) => (
                    <img
                        key={index}
                        src={iinfo.imageUrl}
                        alt={`image ${index}`}
                        id={`carousel-image-${index}`}
                        className="transition h-fit max-h-56 sm:max-h-96 object-contain mx-auto"
                    />
                ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;