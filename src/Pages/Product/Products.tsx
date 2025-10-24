import PagesWrapper from "@/common/PagesWrapper";
import cornerBottomRightHero from "@/assets/Images/cornerBottomRightHero.png"
import cornerBottomLeftHero from "@/assets/Images/cornerBottomLeftHero.png"
import secCornerRight from "@/assets/Images/secCornerRight.png"
import secCornerLeft from "@/assets/Images/secCornerLeft.png"
import ProductsLanding from "@/Components/Home/ProductsLanding";



export default function Products() {
  return <>
    
            <PagesWrapper>
    
      <section className="relative">
        
                    {/* Top corners */}
                    <img src={secCornerRight} alt="secCornerRight" className="absolute right-2 top-0 z-0" />
                    <img src={secCornerLeft} alt="secCornerLeft" className="absolute left-0 top-0 z-0" />
  
        
        <ProductsLanding/>

        



    
                    {/* Bottom corners */}
                    <img src={cornerBottomRightHero} alt="cornerBottomRightHero" className="absolute bottom-0 right-0 z-0" />
                    <img src={cornerBottomLeftHero} alt="cornerBottomLeftHero" className="absolute bottom-0 left-0 z-0" />
                </section>
    
    
    
    
    
    
            </PagesWrapper>
  </>
}
























