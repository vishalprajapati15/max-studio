import ContactForm from '@/components/contact/ContactForm'
import ContactHero from '@/components/contact/ContactHero'
import ContactInfo from '@/components/contact/ContactInfo'
import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Contact MAX Studio | Photography Studio in Delhi",
    description:
        "Contact MAX Studio in Delhi for photography sessions, passport photos, portraits, pre-wedding photography, product photography and other photography services.",
    alternates: {
        canonical: "/contact",
    },
};

const page = () => {
    return (
        <div>
            <ContactHero />
            <ContactInfo />
            <ContactForm />
        </div>
    )
}

export default page