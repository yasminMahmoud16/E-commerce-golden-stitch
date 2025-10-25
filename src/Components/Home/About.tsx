import logo from "@/assets/Images/logo.png"
import LayoutMotion from "@/common/LayoutMotion";
export default function About() {
    const appName = import.meta.env.VITE_APPLICATION_NAME;

    return <>
        <section id="about">
            <div className="container">
                <LayoutMotion >

                    <h1 className="text-center mt-6 text-3xl font-semibold text-dark-blue-2">About Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center justify-center">
                        <div className="col-span-4 flex justify-center items-center px-2 ">
                            <p className=" font-medium text-dark-blue-1 leading-loose text-md text-justify ">

                                Golden Stitch Leather was born out of a love for craftsmanship and the desire to bring back the charm of handmade goods.

                                What started as a small workshop has grown into a brand that values quality over quantity and tradition over trends. Every item is hand-stitched with care, using full-grain leather and time-honored techniques passed down through generations.

                                We don’t just make leather products — we create companions that grow more beautiful with time.
                            </p>
                        </div>
                        <div className="col-span-2 flex items-center justify-center ml-6">
                            <img
                                src={logo}
                                alt={appName}
                                className="w-50 h-50 animate-upDown"
                            />
                        </div>

                    </div>
                </LayoutMotion>
            </div>
        </section>
    </>
}
