import corner1 from"@/assets/Images/cornerTop1.png"
import corner2 from"@/assets/Images/cornerTop2.png"
import logo from"@/assets/Images/logo.png"
export default function Hero() {
    return <>
        <section id="hero" className="h-96  flex items-center justify-center bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav relative">
            <div className=" flex  items-center justify-center">

            <div className="absolute  -left-0 -top-0">
                <img src={corner1} alt="corner1" />
            </div>
            <div className="w-60">
                <img src={logo} alt="corner1" />
            </div>
            <div className="absolute top-0 -right-0">
                <img src={corner2} alt="" />
            </div>
            </div>
        </section>
    </>
}
