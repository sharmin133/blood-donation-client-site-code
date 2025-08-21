import React from 'react';
import Banner from './Banner';
import Contact from './Contact';
import BloodInfoCards from './BloodInfoCards';
import OurBranch from './OurBranch';
import ReviewSection from './ReviewSection';
import BloodCardSection from './BloodCardSection';
import AllEligibityInfo from './Eligibility/AllEligibityInfo';
import YouMayAlsoLike from './PeopleMayLike/YouMayAlsoLike/YouMayAlsoLike';

const Home = () => {
    return (
        <div className='bg-white'>
            <Banner></Banner>
            <BloodInfoCards></BloodInfoCards>
            <AllEligibityInfo></AllEligibityInfo>
            <ReviewSection></ReviewSection>
            <BloodCardSection></BloodCardSection>
            <YouMayAlsoLike></YouMayAlsoLike>
            <Contact></Contact>
            <OurBranch></OurBranch>
        </div>
    );
};

export default Home;