import Image, { ImageProps } from 'next/image'

export const PromoBanner = ({ src, alt, ...props}: ImageProps) => {
    return (
        <Image
            {...props}
            src={src}
            width={0}
            height={0}
            sizes="100vw"
            alt={alt}
        />
    )
}
