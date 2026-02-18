import React, { useContext } from 'react'
import HeroSlider from './components/HeroSlider'
import OurCourses from './components/OurCourses'
import Committee from './components/Committee'
import Mentors from './components/Mentors'
import NoticeBoard from './components/NoticeBoard'
import Testimonials from './components/Testimonials'
import ClubGovernance from './components/ClubGovernance'
import ContactUs from './components/ContactUs'

const MainLayout = () => {

  return (
    <>
      <HeroSlider />
      <NoticeBoard />
      <OurCourses />
      <ClubGovernance />
      <Committee />
      <Mentors />
      <Testimonials />
      <ContactUs />
    </>
  );
}

export default MainLayout
