import {faAnglesLeft, faAnglesRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Carousel, IconButton} from "@material-tailwind/react";

import {useCallback, useState} from "react";

const e_images = [
    "https://trabzondmt.com.tr/data/images/image-52.jpeg",
    "https://trabzondmt.com.tr/data/images/image-51.jpeg",
    "https://trabzondmt.com.tr/data/images/image-58.jpeg",
    "https://trabzondmt.com.tr/data/images/image-59.jpeg",
    "https://trabzondmt.com.tr/data/images/image-54.jpeg",
    "https://trabzondmt.com.tr/data/images/image-53.jpeg",
];

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
    // TODO: Fix cross origin error
    // const fac = new FastAverageColor();
    // const currentImage = document.querySelector(`#carousel-image-${currentImageIndex}`) as HTMLImageElement;
    // const {isDark} = fac.getColor(currentImage);
    // return isDark;
    return true;
}

function displayHiddenImage(currentImageIndex: number, prev: boolean) {
    const beforeCurrentImage = document.querySelector(`#carousel-image-${currentImageIndex + (prev ? 1 : -1)}`) as HTMLImageElement;
    const currentImage = document.querySelector(`#carousel-image-${currentImageIndex}`) as HTMLImageElement;
    // if (beforeCurrentImage) {
    //     beforeCurrentImage.classList.toggle("hidden");
    // }
    // if (currentImage) {
    //     currentImage.classList.toggle("hidden");
    // }
}

export function ImageCarousel() {
    const [images, setImages] = useState([
        "https://trabzondmt.com.tr/data/images/image-57.jpeg",
        "https://trabzondmt.com.tr/data/images/image-56.jpeg",
    ]);
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
                size="lg"
                onClick={() => {
                    handlePrev();
                    displayHiddenImage(activeIndex, true);
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
                size="lg"
                onClick={() => {
                    addImage(handleNext);
                    displayHiddenImage(activeIndex, false);
                }}
                className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-gray-400/50">
                <FontAwesomeIcon icon={faAnglesRight} size={'2xl'}/>
            </IconButton>
        );
    }, []);

    const navigation: navigation = useCallback(({setActiveIndex, activeIndex, length}) => {
        const isDark = getImageAverageColor(activeIndex);
        const color = isDark ? "bg-white" : "bg-black";
        return (
            <div className="absolute bottom-4 left-2/4 z-5 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                    <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i ? `w-8 ${color}` : `w-4 ${color}/50`
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
        <Carousel
            prevArrow={prevArrow}
            nextArrow={nextArrow}
            placeholder={undefined}
            className="relative rounded-xl md:w-3/4 lg:w-4/6 h-fit min-h-0 max-h-96 mx-auto bg-gray-300 flex items-center"
            navigation={navigation}
        >
            <img
                src="http://localhost:8001/image.jpeg"
                alt="image 1"
                className="h-fit max-h-56 sm:max-h-96 mx-auto object-cover"
            />
            {/*<div className="relative h-full w-full">*/}
            {/*    <img*/}
            {/*        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"*/}
            {/*        alt="image 1"*/}
            {/*        className="h-96 mx-auto object-cover"*/}
            {/*    />*/}
            {/*    <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">*/}
            {/*        <div className="w-3/4 text-center md:w-2/4">*/}
            {/*            <Typography*/}
            {/*                color="white"*/}
            {/*                as={'p'}*/}
            {/*                placeholder={undefined}*/}
            {/*                className="font-bold">*/}
            {/*                The Beauty of Nature*/}
            {/*                It is not so much for its beauty that the forest makes a claim*/}
            {/*                upon men&apos;s hearts, as for that subtle something, that quality*/}
            {/*                of air that emanation from old trees, that so wonderfully changes*/}
            {/*                and renews a weary spirit.*/}
            {/*            </Typography>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

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
    );
}

export default ImageCarousel;