'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { SplitText } from 'gsap/SplitText'
import { useRef } from 'react'
import {
  logoLargeHillPath,
  logoSmallHillPath,
  logoSunburstPath,
  SunDayLogo,
} from '@/components/SunDayLogo'

gsap.registerPlugin(
  DrawSVGPlugin,
  MorphSVGPlugin,
  MotionPathPlugin,
  SplitText,
  useGSAP,
)

const sunSeedPath = 'M27 18c0 5-4 9-9 9s-9-4-9-9s4-9 9-9s9 4 9 9z'
const largeHillSeedPath = 'M36 36H14c3-4 8-7 11-7s8 3 11 7z'
const smallHillSeedPath = 'M0 36h22c-3-5-8-8-13-8c-4 0-7 3-9 8z'
const orbitPath = 'M2.5 18a15.5 15.5 0 1 0 31 0a15.5 15.5 0 1 0-31 0'

export function CinematicIntro() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (reduceMotion) {
        gsap.set(root, { autoAlpha: 0, display: 'none' })
        return
      }

      const headline = root.querySelector('.intro-headline')
      const services = root.querySelector('.intro-services')
      const headlineSplit = headline
        ? new SplitText(headline, {
            type: 'chars,words',
            charsClass: 'intro-char',
          })
        : null
      const serviceSplit = services
        ? new SplitText(services, { type: 'words', wordsClass: 'intro-word' })
        : null

      gsap.set(root, { autoAlpha: 1 })
      gsap.set('.intro-panel', { scaleY: 1, transformOrigin: 'bottom center' })
      gsap.set('.intro-draw,.intro-orbit', {
        drawSVG: '0%',
      })
      gsap.set('.intro-logo-sunburst', {
        attr: { d: sunSeedPath },
        scale: 0.22,
        transformOrigin: '50% 50%',
      })
      gsap.set('.intro-logo-sun', {
        scale: 0,
        transformOrigin: '50% 50%',
      })
      gsap.set('.intro-logo-large-hill', {
        attr: { d: largeHillSeedPath },
        y: 7,
      })
      gsap.set('.intro-logo-small-hill', {
        attr: { d: smallHillSeedPath },
        y: 7,
      })
      gsap.set('.intro-spark', { autoAlpha: 0, scale: 0.65 })
      gsap.set(headlineSplit?.chars ?? [], {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -72,
      })
      gsap.set(serviceSplit?.words ?? [], {
        autoAlpha: 0,
        y: 18,
        filter: 'blur(8px)',
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          headlineSplit?.revert()
          serviceSplit?.revert()
          gsap.set(root, { display: 'none' })
        },
      })

      tl.from('.intro-panel', {
        scaleY: 0,
        duration: 0.7,
        ease: 'expo.inOut',
      })
        .to('.intro-draw', { drawSVG: '100%', duration: 0.85 }, '-=0.18')
        .to('.intro-orbit', { drawSVG: '100%', duration: 0.9 }, '<')
        .to(
          '.intro-spark',
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.18,
            motionPath: {
              path: '.intro-orbit',
              align: '.intro-orbit',
              alignOrigin: [0.5, 0.5],
              start: 0.06,
              end: 0.95,
            },
          },
          '<',
        )
        .to(
          '.intro-logo-sun',
          { scale: 1, duration: 0.45, ease: 'back.out(1.8)' },
          '-=0.5',
        )
        .to(
          '.intro-logo-sunburst',
          {
            morphSVG: { shape: logoSunburstPath },
            scale: 1,
            duration: 0.78,
            ease: 'expo.inOut',
          },
          '-=0.35',
        )
        .to(
          '.intro-logo-large-hill',
          {
            morphSVG: { shape: logoLargeHillPath },
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.52',
        )
        .to(
          '.intro-logo-small-hill',
          {
            morphSVG: { shape: logoSmallHillPath },
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '<',
        )
        .to(
          headlineSplit?.chars ?? [],
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.72,
            stagger: 0.028,
          },
          '-=0.22',
        )
        .to(
          serviceSplit?.words ?? [],
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.48,
            stagger: 0.075,
          },
          '-=0.36',
        )
        .to({}, { duration: 0.42 })
        .to('.intro-mark', {
          scale: 0.76,
          y: -18,
          duration: 0.55,
          ease: 'power2.inOut',
        })
        .to(
          root,
          {
            autoAlpha: 0,
            duration: 0.72,
            ease: 'power2.inOut',
          },
          '-=0.12',
        )

      return () => {
        tl.kill()
        headlineSplit?.revert()
        serviceSplit?.revert()
      }
    },
    { scope: rootRef },
  )

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-100 overflow-hidden bg-[#080604] opacity-0"
    >
      <div className="intro-panel absolute inset-0 bg-[#080604]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-size-[44px_44px] opacity-40" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#f1a866]/20 to-transparent" />

      <div className="relative flex min-h-svh flex-col items-center justify-center px-5 text-center">
        <div className="intro-mark overflow-hidden rounded-full relative mb-8 h-[clamp(116px,18vw,232px)] w-[clamp(116px,18vw,232px)]">
          <svg
            className="absolute inset-[-5%] h-[112%] w-[112%] overflow-visible"
            viewBox="0 0 36 36"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="intro-orbit intro-draw"
              d={orbitPath}
              fill="none"
              stroke="#FFE8B6"
              strokeWidth="0.4"
            />
            <circle
              className="intro-spark"
              cx="0"
              cy="0"
              r="1.1"
              fill="#FFE8B6"
            />
          </svg>
          <SunDayLogo
            className="h-full w-full drop-shadow-[0_16px_42px_rgba(244,144,12,0.32)]"
            layerPrefix="intro-logo"
          />
        </div>

        <p className="intro-services mb-3 font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#f6c489] sm:text-sm">
          Color Cut Styling Motion
        </p>
        <h2 className="intro-headline max-w-5xl overflow-hidden font-heading text-[clamp(3.2rem,11vw,10.5rem)] italic leading-[0.82] text-[#fff3df]">
          Sun Day Hair Salon / Bình Tân
        </h2>
      </div>
    </div>
  )
}
