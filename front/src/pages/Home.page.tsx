import React from 'react'
import '../styles/home.page.scss'
import Preview from '../components/Home/Preview/Preview'
import Conditions from '../components/Home/Conditions/Conditions'
import Cases from '../components/Home/Cases/Cases'
import Timeline from '../components/Home/Timeline/Timeline'
import Program from '../components/Home/Program/Program'
import FAQ from '../components/Home/FAQ/FAQ'
import Organizers from '../components/Home/Organizers/Organizers'
import Header from '../components/Elements/Header/Header'
import Footer from '../components/Elements/Footer/Footer'

function Home() {
  return (
    <div className="home">
        <Header />
        <Preview />
        <Conditions />
        <Cases />
        <Timeline />
        <Program />
        <Organizers />
        <FAQ />
        <Footer />
    </div>
  )
}

export default Home