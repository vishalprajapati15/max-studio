import PortfolioGrid from '@/components/portfolio/PortfolioGrid'
import PortfolioHero from '@/components/portfolio/PortfolioHero'
import React from 'react'

const page = () => {
    return (
        <div>
            <PortfolioHero/>
            <PortfolioGrid/>
        </div>
    )
}

export default page