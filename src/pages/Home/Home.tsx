import HeroSection from './HeroSection'
import FeaturedSection from './FeaturedSection';
import SafetySection from './SafetySection';
import WhyChooseUsSection from './WhyChooseUsSection';
import TestomonialSection from './TestomonialSection';

function Home() {
    return (
        <div className="space-y-0">
            <HeroSection />
            <FeaturedSection />
            <SafetySection />
            <WhyChooseUsSection />
            <TestomonialSection />
        </div>
    )
}

export default Home