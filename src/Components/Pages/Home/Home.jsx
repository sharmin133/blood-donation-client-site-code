import React from 'react';

import Banner from './HomeContent/Banner';
import Contact from './HomeContent/Contact';
import BloodInfoCards from './HomeContent/BloodInfoCards';
import AllEligibityInfo from './HomeContent/Eligibility/AllEligibityInfo';
import ReviewSection from './HomeContent/ReviewSection';
import BloodCardSection from './HomeContent/BloodCardSection';
import YouMayAlsoLike from './PeopleMayLike/YouMayAlsoLike/YouMayAlsoLike';
import OurBranch from './HomeContent/OurBranch';

const Home = () => {
    return (
        <div className='bg-white'>
            <Banner></Banner>
            <BloodInfoCards></BloodInfoCards>
            <AllEligibityInfo></AllEligibityInfo>
             <BloodCardSection></BloodCardSection>
            <ReviewSection></ReviewSection>
           
            <YouMayAlsoLike></YouMayAlsoLike>
           <Contact></Contact>
            <OurBranch></OurBranch>
        </div>
    );
};

export default Home;