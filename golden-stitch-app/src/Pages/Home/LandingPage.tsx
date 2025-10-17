import PagesWrapper from "@/common/PagesWrapper";
import Hero from "@/Components/Home/Hero";
import Navbar from "@/Components/Navbar/Navbar";
import secCornerRight from "@/assets/Images/secCornerRight.png";
import secCornerLeft from "@/assets/Images/secCornerLeft.png";
import About from "@/Components/Home/About";
import ProductsLanding from "@/Components/Home/ProductsLanding";
import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png";
import cornerBottomLeftHero from "@/assets/Images/cornerBottomLeftHero.png";

export default function LandingPage() {
  return (
    <>
      <PagesWrapper>
        <Hero />
        <Navbar />

        <section className="relative min-h-screen">
          {/* Top corners */}
          <img
            src={secCornerRight}
            alt="secCornerRight"
            className="absolute right-2 top-0 z-0"
          />
          <img
            src={secCornerLeft}
            alt="secCornerLeft"
            className="absolute left-0 top-0 z-0"
          />

          {/* About */}
          <div className="relative z-10 mb-8">
            <About />
          </div>

          {/* Products */}
          <div className="relative z-10 mb-8">
            <ProductsLanding />
          </div>

          {/* Bottom corners ثابتة داخل الصفحة */}
          <img
            src={cornerBottomRightHero}
            alt="cornerBottomRightHero"
            className="absolute bottom-0 right-0 z-0 pointer-events-none select-none"
          />
          <img
            src={cornerBottomLeftHero}
            alt="cornerBottomLeftHero"
            className="absolute bottom-0 left-0 z-0 pointer-events-none select-none"
          />
        </section>
      </PagesWrapper>
    </>
  );
}
