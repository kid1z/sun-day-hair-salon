'use client'

import { ArrowUpRight, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CinematicIntro } from '@/components/CinematicIntro'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { SplitText } from '@/components/SplitText'
import { SunDayLogo } from '@/components/SunDayLogo'
import MagneticFramer from '@/components/social-motion'

const services = [
  {
    title: 'Cắt tóc thiết kế',
    text: 'Kiểu cắt được cá nhân hóa theo gương mặt, chất tóc và phong cách riêng của bạn.',
  },
  {
    title: 'Nhuộm màu chuyên sâu',
    text: 'Kỹ thuật nhuộm nhiều lớp cùng công thức riêng giúp màu tóc sáng đẹp và bền lâu.',
  },
  {
    title: 'Tạo kiểu dự tiệc',
    text: 'Tạo kiểu chỉn chu, độ phồng chuẩn salon, phù hợp cho mọi sự kiện đặc biệt.',
  },
]

const galleryItems = [
  {
    look: 'Cam sáng',
    image: '/hair1.png',
  },
  {
    look: 'Nhuộm Balayage',
    image: '/hair2.jpeg',
  },
  {
    look: 'Nối tóc tự nhiên',
    image: '/hair3.jpeg',
  },
  {
    look: 'Uốn Nhuộm Balayage',
    image: '/hair4.jpeg',
  },
]

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Sun Day Hair Salon',
  image:
    'https://images.unsplash.com/photo-1559599076-9c61d8e1b1f8?auto=format&fit=crop&w=1200&q=80',
  description:
    'Salon tóc cao cấp tại Bình Tân, TP. Hồ Chí Minh, chuyên cắt tóc, nhuộm màu và tạo kiểu dự tiệc.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '140 Đường số 10, Phường Bình Hưng Hòa',
    addressLocality: 'Bình Tân',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: 'TP. Hồ Chí Minh',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090807] text-[#f9f3e7]">
      <CinematicIntro />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static structured data serialized from local constants.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <header className="relative min-h-svh overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(238,171,92,0.38),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(199,84,58,0.3),transparent_38%),linear-gradient(to_bottom,rgba(7,7,7,0.35),rgba(7,7,7,0.86))]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[42px_42px] opacity-45" />

        <nav className="relative z-50 px-4 pt-5 sm:px-8 sm:pt-8">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/20 bg-black/25 px-3 py-2 backdrop-blur-xl sm:px-3">
            <div className="flex items-center gap-3">
              <div className="overflow-hidden flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-[0_0_0_3px_rgba(0,0,0,0.2)]">
                <SunDayLogo className="h-8 w-8 scale-120" />
              </div>
              <span className="font-heading text-xl italic text-[#fef8eb] sm:text-2xl">
                Sun Day Hair Salon
              </span>
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
              {[
                { label: 'Giới thiệu', href: '#about' },
                { label: 'Dịch vụ', href: '#services' },
                { label: 'Bộ sưu tập', href: '#gallery' },
                { label: 'Liên hệ', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative font-body text-[14px] font-medium text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#f0be84] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
            <Link
              href="https://www.facebook.com/dichvulamdep247"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="cursor-pointer flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#f3c386] hover:text-[#2b190f] sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Đặt lịch ngay
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-84px)] w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-16 sm:px-8 sm:pt-20">
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#ffd8a8]/50 bg-[#f6bd7a]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffe8c6] backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Salon nhuộm tóc đạt giải thưởng
          </div>

          <h1 className="max-w-5xl">
            <span className="block font-heading text-5xl italic leading-[0.95] text-[#ffd29a] sm:text-6xl md:text-7xl lg:text-[6.4rem]">
              <SplitText
                text="Sun Day Hair Salon"
                type="words"
                delay={0.4}
                stagger={0.1}
                duration={0.7}
              />
              {/* Salon tóc tại Bình Tân, TP. Hồ Chí Minh */}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty font-body text-base font-medium text-[#f8efdf]/90 sm:text-lg">
            <SplitText
              text="Địa chỉ: 140 Đường số 10, Phường Bình Hưng Hòa, Bình Tân, TP. Hồ Chí Minh."
              type="words"
              delay={0.5}
              stagger={0.05}
              duration={0.6}
            />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <main className="main">
              <div className="icon-container">
                <MagneticFramer>
                  <a
                    href="https://www.facebook.com/dichvulamdep247"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      height: '50px',
                      width: '50px',
                      display: 'block',
                    }}
                  >
                    <Image
                      src="/fb.svg"
                      alt="Facebook"
                      width={50}
                      height={50}
                    />
                  </a>
                </MagneticFramer>

                <MagneticFramer>
                  <a
                    href="https://www.tiktok.com/@pinnguyenhairsalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-12.5 w-12.5"
                  >
                    <Image src="/tiktok.svg" alt="TikTok" fill />
                  </a>
                </MagneticFramer>

                <MagneticFramer>
                  <a
                    href="https://maps.app.goo.gl/RQyfRaz25VaK4nuA9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="36"
                      height="50"
                      viewBox="0 0 36 50"
                      fill="none"
                      role="img"
                      aria-label="Google Maps"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Google Maps</title>
                      <g clipPath="url(#clip0_892_959)">
                        <rect width="36" height="50" fill="transparent" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M36 17.5761L35.9998 17.6717C35.9996 17.712 35.9991 17.7523 35.9986 17.7925C35.9995 17.8396 36 17.887 36 17.9347C36 25.4414 30.1516 32.0859 26.2381 36.5326C25.1026 37.8227 24.1299 38.9279 23.5102 39.8153C21.3061 42.9718 20.1429 46.3914 19.8367 47.7065C19.8367 48.697 19.0145 49.5 18 49.5C16.9855 49.5 16.1633 48.697 16.1633 47.7065C15.8571 46.3914 14.6938 42.9718 12.4897 39.8153C11.8701 38.9279 10.8974 37.8227 9.76185 36.5326C5.84843 32.0859 0 25.4414 0 17.9347C0 17.887 0.000449688 17.8396 0.00134969 17.7925C0.000449688 17.7205 0 17.6483 0 17.5761C0 7.86906 8.05882 0 18 0C27.9412 0 36 7.86906 36 17.5761ZM18 24.0327C21.8547 24.0327 24.9795 20.9812 24.9795 17.2174C24.9795 13.4534 21.8547 10.4022 18 10.4022C14.1453 10.4022 11.0205 13.4534 11.0205 17.2174C11.0205 20.9812 14.1453 24.0327 18 24.0327Z"
                          fill="#34A851"
                        />
                        <path
                          d="M33.9875 9.49201C31.7834 5.34504 27.9366 2.16423 23.2888 0.771484L12.9512 12.5136C14.2222 11.2132 16.0145 10.403 18.0008 10.403C21.8555 10.403 24.9803 13.4544 24.9803 17.2182C24.9803 18.7538 24.4604 20.1706 23.5829 21.3102L33.9875 9.49201Z"
                          fill="#4285F5"
                        />
                        <path
                          d="M9.97023 36.7713C9.90115 36.6927 9.83163 36.6138 9.76143 36.5341C7.1818 33.603 3.7614 29.7171 1.72949 25.2585L12.474 13.0547C11.5623 14.2062 11.0199 15.6507 11.0199 17.219C11.0199 20.9828 14.1449 24.0342 17.9996 24.0342C19.9521 24.0342 21.7175 23.2512 22.9842 21.9892L9.97023 36.7713Z"
                          fill="#F9BB0E"
                        />
                        <path
                          d="M4.25898 6.22266C1.60216 9.28542 0 13.2482 0 17.5763C0 17.6486 0.000449688 17.7208 0.00134969 17.7928C0.000449688 17.8398 0 17.8873 0 17.935C0 20.4935 0.679411 22.952 1.73 25.2572L12.4564 13.0739L4.25898 6.22266Z"
                          fill="#E74335"
                        />
                        <path
                          d="M23.2868 0.770715C21.6148 0.26973 19.8391 0 17.9988 0C12.4902 0 7.55951 2.41621 4.25781 6.22244L12.4553 13.0736L12.4731 13.0534C12.6222 12.8651 12.7811 12.6844 12.9492 12.5125L23.2868 0.770715Z"
                          fill="transparent"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_892_959">
                          <rect width="36" height="50" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </MagneticFramer>
              </div>
            </main>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Khách hàng đã phục vụ', value: '12K+' },
              { label: 'Đánh giá trung bình', value: '4.9/5' },
              { label: 'Nhà tạo mẫu', value: '18' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-xl"
              >
                <p className="font-body text-2xl font-semibold text-white">
                  {item.value}
                </p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.14em] text-white/70">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-6 pb-6 pt-12 sm:px-8"
      >
        <p className="max-w-3xl font-body text-sm leading-relaxed text-[#f8efdf]/85 sm:text-base">
          Sun Day Hair Salon là salon tóc hiện đại tại Bình Tân, TP. Hồ Chí
          Minh, nổi bật với dịch vụ cắt tóc cá nhân hóa, kỹ thuật nhuộm tiên
          tiến và tạo kiểu chỉn chu cho cả ngày thường lẫn những dịp đặc biệt.
        </p>
      </section>

      <section
        id="services"
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20"
      >
        <RevealOnScroll delay={40}>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#f5c78f]">
                Dịch vụ nổi bật
              </p>
              <h2 className="font-heading text-4xl italic text-[#fff5e6] sm:text-5xl">
                Thiết kế riêng cho mái tóc của bạn
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white/85 transition hover:border-[#f3be7a] hover:text-[#f3be7a] sm:flex"
            >
              Xem bảng giá
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </RevealOnScroll>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={120 + index * 120}>
              <article className="group rounded-3xl border border-white/15 bg-[linear-gradient(150deg,rgba(255,220,184,0.12),rgba(255,255,255,0.02))] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#f8c88f]/70">
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f8c88f]/20 text-[#ffd39d]">
                  <Star className="h-4 w-4" />
                </div>
                <h3 className="font-body text-2xl font-semibold text-[#fff4e2]">
                  {service.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-white/75">
                  {service.text}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section
        id="gallery"
        className="mx-auto w-full max-w-7xl px-6 pb-8 sm:px-8 sm:pb-12"
      >
        <RevealOnScroll delay={60}>
          <div className="rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,228,196,0.12),rgba(255,255,255,0.02))] p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-heading text-3xl italic text-[#fff6e9] sm:text-4xl">
                Mẫu tóc mới nhất
              </h3>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-[#f7ca92]">
                Cập nhật hằng tuần
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galleryItems.map((item, index) => (
                <RevealOnScroll key={item.look} delay={140 + index * 90}>
                  <figure className="group relative overflow-hidden rounded-2xl border border-white/20">
                    <div className="relative aspect-4/5 w-full">
                      <Image
                        src={item.image}
                        alt={`Mẫu tóc ${item.look}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />
                    <figcaption className="absolute bottom-4 left-4 font-body text-sm font-semibold tracking-[0.08em] text-[#fff3df]">
                      {item.look}
                    </figcaption>
                  </figure>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12"
      >
        <RevealOnScroll delay={80}>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#ffc788]/25 bg-[linear-gradient(120deg,rgba(255,196,132,0.2),rgba(0,0,0,0.15))] p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd7a8]">
                Sẵn sàng làm mới diện mạo?
              </p>
              <h4 className="mt-3 font-heading text-3xl italic text-[#fff8ec] sm:text-4xl">
                Đặt lịch trải nghiệm tại Sun Day Hair Salon.
              </h4>
            </div>

            <Link href="#">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#fff2de] px-6 py-3 font-body text-sm font-semibold text-[#2b170f] transition duration-300 hover:bg-[#ffe4bf]"
              >
                Giữ chỗ ngay
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </main>
  )
}
