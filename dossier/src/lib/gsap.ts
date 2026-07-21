import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, useGSAP)

// Signature easings (design.md §6) — cubic-bezier converted to SVG paths for CustomEase
CustomEase.create('snap', 'M0,0 C0.22,0.9 0.24,1 1,1')
CustomEase.create('thump', 'M0,0 C0.34,1.56 0.64,1 1,1')
CustomEase.create('wipe', 'M0,0 C0.77,0 0.18,1 1,1')

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, SplitText, useGSAP }
