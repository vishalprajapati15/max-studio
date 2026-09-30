import AboutPreview from '@/components/home/AboutPreview'
import CTAButton from '@/components/home/CTAButton'
import Hero from '@/components/home/Hero'
import ServicePreview from '@/components/home/ServicePreview'
import Testimonials from '@/components/home/Testimonials'


const page = () => {
  return (
    <div>
      <Hero />
      <AboutPreview />
      <ServicePreview />
      <Testimonials />
      <CTAButton />
    </div>
  )
}

export default page