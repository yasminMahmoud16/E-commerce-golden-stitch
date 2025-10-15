

import PagesWrapper from "@/common/PagesWrapper";
import Hero from "@/Components/Home/Hero";
import Navbar from "@/Components/Navbar/Navbar";
import secCornerRight from "@/assets/Images/secCornerRight.png"
import secCornerLeft from "@/assets/Images/secCornerLeft.png"
import About from "@/Components/Home/About";
import ProductsLanding from "@/Components/Home/ProductsLanding";

import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import cornerBottomLeftHero from "@/assets/Images/cornerBottomLeftHero.png"
export default function LandingPage() {



    return <>
        <PagesWrapper>
            <Hero />

            <Navbar />
            <section className="relative">
                {/* Top corners */}
                <img src={secCornerRight} alt="secCornerRight" className="absolute right-2 top-0 z-0" />
                <img src={secCornerLeft} alt="secCornerLeft" className="absolute left-0 top-0 z-0" />

                {/* about */}
                <div className="relative z-10">
                    <About />
                </div>

                {/* products */}
                <div className="relative z-10">
                    <ProductsLanding />
                </div>

                {/* Bottom corners */}
                <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="absolute bottom-0 right-0 z-0" />
                <img src={cornerBottomLeftHero} alt="cornerBottomLeftHero" className="absolute bottom-0 left-0 z-0" />
            </section>






        </PagesWrapper>





















    </>
}
