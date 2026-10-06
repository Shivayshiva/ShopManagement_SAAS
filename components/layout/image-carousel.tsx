"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "cn"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export type CarouselImage = {
  src: string
  alt: string
}

export function ImageCarousel({
  images,
  interval = 3000,
  className,
}: {
  images: readonly CarouselImage[]
  interval?: number
  className?: string
}) {
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: interval,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  )

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[autoplay]}
      className={cn("h-full w-full", className)}
    >
      <CarouselContent className="ml-0">
        {images.map((image, index) => (
          <CarouselItem key={image.src} className="h-full pl-0">
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
