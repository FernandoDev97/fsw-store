import Image, { ImageProps } from 'next/image'

export const PromoBanner = ({ src, alt }: ImageProps) => {
    return (
        <Image
            className="h-auto w-full px-5"
            src={src}
            width={0}
            height={0}
            sizes="100vw"
            alt={alt}
        />
    )
}
