import type { PagesRapperProps } from "@/Utilities/types";

export default function PagesWrapper({ children,className
}: PagesRapperProps) {
    return (
        <section className={`min-h-screen  bg-radial from-[#E6D7B6] to-[#DBC8A0] ${className}`}>

                    {children}

        </section>
    );
}

