import Footer from '@/components/landing-page/Footer'
import Header from '@/components/landing-page/Header'
import Hero from '@/components/landing-page/Hero'
import LatestJobsContainer from '@/components/landing-page/LatestJobsContainer'
import React from 'react'

const latestJobs = () => {
  return (
    <main>
      <Header />
      <Hero />
      <LatestJobsContainer />
      <Footer />
    </main>
  )
}

export default latestJobs