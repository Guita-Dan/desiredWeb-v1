"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import image3 from "@/public/image3.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface for image data
interface ImageData {
    src: StaticImageData;
}

// Image data array
const images: ImageData[] = [
    {
        src: image1,
    },
    {
        src: image2,
    },
    {
        src: image3,
    },
];

export default function ImageSlider(): JSX.Element {
    // State to keep track of the current image index
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // State to determine if the image is being hovered over
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Function to show the previous slide
    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    // Function to show the next slide
    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // useEffect hook to handle automatic slide transition
    useEffect(() => {
        // Start interval for automatic slide change if not hovered
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);

            // Cleanup the interval on component unmount
            return () => {
                clearInterval(interval);
            };
        }
    }, [isHovered]);

    // Handle mouse over event
    const handleMouseOver = (): void => {
        setIsHovered(true);
    };

    // Handle mouse leave event
    const handleMouseLeave = (): void => {
        setIsHovered(false);
    };

    return (
        <div className="relative w-full mx-auto">
            <div
                className="relative h-[528px] group"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={images[currentIndex].src}
                    alt={`Slider Image ${currentIndex + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className=" transition-all duration-500 ease-in-out cursor-pointer"
                />

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-10 mx-1 ${index === currentIndex
                                ? "bg-[#ffffff] rounded-xl"
                                : "bg-[#c2c2c2] rounded-xl"
                                } transition-all duration-500 ease-in-out`}
                        >

                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-[#f2f2f2]  hover:bg-opacity-90 text-white p-3"
                onClick={prevSlide}
            >
                <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-black" />
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-[#f2f2f2]  hover:bg-opacity-90 text-white p-3"
                onClick={nextSlide}
            >
                <ChevronRight className="w-6 h-6 text-gray-700 hover:text-black" />
            </button>

        </div>
    );
}