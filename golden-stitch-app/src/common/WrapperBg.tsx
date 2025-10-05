import type { WrapperBgProps } from "@/Utilities/types";
import corner2 from "@/assets/Images/corner2.png"

export default function WrapperBg({ children, title, subtitle
}: WrapperBgProps) {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-t from-gold-dark to-gold-light">
            <div className="container">
                <div className="flex flex-col items-center justify-center gap-4 mt-10 py-4 bg-radial from-dark-blue-1 via-dark-blue-2 to-dark-blue-nav p-10 relative rounded-l-4xl rounded-tr-4xl h-[600px] mb-4">

                    <h2 className="text-3xl capitalize font-semibold text-center bg-gradient-to-r from-gold-dark to-gold-light bg-clip-text text-transparent md:text-5xl pb-2">
                        {title}
                    </h2>
                    <div className="">

                        <p className="text-gray-500 text-xs  md:w-md text-center my-5">
                            {subtitle}
                        </p>
                    </div>
                    {children}

                    <div className="absolute -right-5 -bottom-3">
                        <img src={corner2} alt="" className="w-60" />
                    </div>
                </div>
            </div>
        </section>
    );
}

