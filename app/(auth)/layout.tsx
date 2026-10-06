import Image from "next/image"
import Link from "next/link"
import { ImageCarousel } from "@/components/layout/image-carousel"

const sidebarImages = [
  { src: "/SideBarImage1.jpg", alt: "Sidebar photo 1" },
  { src: "/SideBarImage2.jpg", alt: "Sidebar photo 2" },
  { src: "/SideBarImage3.jpg", alt: "Sidebar photo 3" },
  { src: "/SideBarImage4.jpg", alt: "Sidebar photo 4" },
  { src: "/SideBarImage5.jpg", alt: "Sidebar photo 5" },
  { src: "/SideBarImage6.jpg", alt: "Sidebar photo 6" },
] as const

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-0 flex-1 flex-col lg:pl-[42%]">
      <aside className="relative h-56 shrink-0 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-dvh lg:w-[42%]">
        <ImageCarousel images={sidebarImages} className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-foreground/80 via-foreground/15 to-transparent" />
        <Link href="/" className="absolute top-6 left-6 z-10 block h-24 w-40">
          <Image
            src="/SIRSALogo.png"
            alt="SIRSA"
            fill
            priority
            className="object-contain object-left mix-blend-screen"
            sizes="160px"
          />
        </Link>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-background sm:p-10">
          <p className="text-sm font-medium text-background/80">Sirsa</p>
          <h2 className="mt-2 max-w-md font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            All your shop essentials in one place
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-background/80 sm:text-base">
            Billing, stock, customers, and every store, managed from one dashboard.
          </p>
        </div>
      </aside>
      {children}
    </section>
  )
}
