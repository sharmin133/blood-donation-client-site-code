import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import BloodInfoCards from './BloodInfoCards';
import OurBranch from './OurBranch';
import ReviewSection from './ReviewSection';

const Home = () => {
    return (
        <div className='bg-white'>
            <Banner></Banner>
            <BloodInfoCards></BloodInfoCards>
            <ReviewSection></ReviewSection>
            <Contact></Contact>
            <OurBranch></OurBranch>
        </div>
    );
};

export default Home;