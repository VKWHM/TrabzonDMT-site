import {faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Carousel, IconButton, Typography} from "@material-tailwind/react";
import {FastAverageColor} from "fast-average-color";

import {useCallback, useState} from "react";

const e_images: string[] = [];
for (let i = 1; i < 10; i++) {
    e_images.push(`/images/image-5${i}.jpeg`);
}

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
    const [images, setImages] = useState<string[]>(['/images/image-51.jpeg', '/images/image-52.jpeg']);
    const addImage = useCallback((callback: () => void) => {
        setImages(prev => {
            const next = e_images.shift();
            if (next) {
                return [...prev, next];
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
                    addImage(handleNext);
                }}
                className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-gray-400/50">
                <FontAwesomeIcon icon={faAnglesRight} size={'2xl'}/>
            </IconButton>
        );
    }, []);

    const navigation: navigation = useCallback(({setActiveIndex, activeIndex, length}) => {
        const isDark = getImageAverageColor(activeIndex);
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
                                addImage(() => setActiveIndex(i));
                            }
                            setActiveIndex(i);
                        }}
                    />
                ))}
            </div>
        );
    }, []);

    return (
        <div className={'shadow-md rounded-xl'}>
            <div className={'bg-white/70 p-2 rounded-t-xl text-center'}>
                <Typography variant={'small'} placeholder={undefined}>
                    alttaki fotoğrafın açıklaması burada bulunacak
                </Typography>
            </div>
            <Carousel
                prevArrow={prevArrow}
                nextArrow={nextArrow}
                placeholder={undefined}
                className="relative h-fit min-h-0 max-h-[100vh] ml-auto bg-transparent flex items-center rounded-b-xl border border-t-gray-500"
                navigation={navigation}
            >
                <img
                    src="/images/image.jpeg"
                    alt="image 1"
                    className="h-fit max-h-56 sm:max-h-96 mx-auto object-cover"
                />
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
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