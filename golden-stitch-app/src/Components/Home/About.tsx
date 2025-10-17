import logo from "@/assets/Images/logo.png"
import LayoutMotion from "@/common/LayoutMotion";
export default function About() {
    const appName = import.meta.env.VITE_APPLICATION_NAME;

    return <>
        <section id="about">
            <div className="container">
                <LayoutMotion >

                    <h1 className="text-center mt-6 text-3xl font-semibold text-dark-blue-2">About Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="col-span-4 flex justify-center items-center px-3">
                            <p className=" font-medium text-dark-blue-1 leading-loose">

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae perspiciatis vel ipsam quis repudiandae iure dolor sapiente molestias consequuntur necessitatibus eum, nobis rerum fugiat, a consectetur mollitia quia explicabo tempore. Alias ab doloremque dolorem est similique reprehenderit, nobis officiis fugiat perspiciatis ipsum ut asperiores impedit natus eum ducimus? Rerum, sapiente!
                            </p>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <img src={logo} alt={`${appName}`}   className="transition-all duration-300 ease-in-out hover:translate-y-2 " 
 />
                        </div>
                    </div>
                </LayoutMotion>
            </div>
        </section>
    </>
}
