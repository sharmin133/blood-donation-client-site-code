import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import BloodInfoCards from './BloodInfoCards';
import OurBranch from './OurBranch';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <BloodInfoCards></BloodInfoCards>
            <Contact></Contact>
            <OurBranch></OurBranch>
        </div>
    );
};

export default Home;