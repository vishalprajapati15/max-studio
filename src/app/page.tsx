import AboutPreview from '@/components/home/AboutPreview'
import CTAButton from '@/components/home/CTAButton'
import Hero from '@/components/home/Hero'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import ServicePreview from '@/components/home/ServicePreview'
import Testimonials from '@/components/home/Testimonials'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <PortfolioPreview />
      <ServicePreview />
      <Testimonials />
      <CTAButton />
    </div>
  )
}

export default page