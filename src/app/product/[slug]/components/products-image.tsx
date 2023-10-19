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
        <div className="flex flex-col">
            <div className="flex h-[380px] w-full items-center justify-center bg-accent">
                <Image
                    alt={name}
                    src={currentImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
                />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-8 px-5">
                {imageUrls.map(imageUrl => (
                    <button onClick={() => handleCurrentImageClick(imageUrl)} className={`bg-accent flex justify-center items-center rounded-lg h-[100px] ${imageUrl === currentImage &&  "border-2 border-solid border-primary"}`} key={imageUrl}>
                        <Image
                            alt={name}
                            src={imageUrl}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
