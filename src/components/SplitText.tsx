'use client'

import gsap from 'gsap'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(GSAPSplitText)

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  type?: 'chars' | 'words' | 'lines'
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  type = 'chars',
}: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const split = new GSAPSplitText(element, {
      type: type,
      charsClass: 'split-char',
      wordsClass: 'split-word',
      linesClass: 'split-line',
    })

    const targets =
      type === 'chars'
        ? split.chars
        : type === 'words'
          ? split.words
          : split.lines

    gsap.set(targets, {
      opacity: 0,
      y: 50,
      rotateX: -90,
    })

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    })

    return () => {
      split.revert()
    }
  }, [delay, stagger, duration, type])

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={{ perspective: '1000px' }}
    >
      {text}
    </span>
  )
}
