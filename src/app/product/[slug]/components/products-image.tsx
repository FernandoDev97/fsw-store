'use client'

import Image from "next/image"
import { useState } from "react"

interface ProductsImageProps {
    name: string
    imageUrls: string[]
}


export const ProductsImage = ({ name, imageUrls }: ProductsImageProps) => {

    const [currentImage, setCurrentImage] = useState(imageUrls[0])

    const handleCurrentImageClick = (imageUrl: string) => {
        setCurrentImage(imageUrl)
    }

    return (
        <div className="flex flex-col lg:flex-row-reverse h-ful lg:w-full lg:max-w-[65%] lg:relative">
            <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:h-[42rem] lg:w-full">
                <Image
                    alt={name}
                    src={currentImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-h-[70%] w-auto object-contain max-w-[80%] lg:max-w-[75%] h-auto"
                />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 px-5 lg:flex flex-col lg:absolute left-0">
                {imageUrls.map(imageUrl => (
                    <button onClick={() => handleCurrentImageClick(imageUrl)} className={`bg-accent lg:bg-black lg:w-[4rem] flex justify-center items-center rounded-lg h-[100px] lg:h-[4rem] ${imageUrl === currentImage &&  "border-2 border-solid border-primary"}`} key={imageUrl}>
                        <Image
                            alt={name}
                            src={imageUrl}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="max-h-[70%] w-auto object-contain max-w-[80%] z-10"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
