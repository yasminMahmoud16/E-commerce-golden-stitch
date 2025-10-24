// import { Icons } from "@/assets/Icons/icons";

type AdminTitlesProps = {
  text: string;
  className?: string;
  icon: React.ElementType; // Type for a React component (like Icons.FaUsers)
};

export default function AdminTitles({ text, className = "", icon: Icon }: AdminTitlesProps) {
  return (
    <div className={` flex items-center gap-4 ${className}`}>
      <Icon className="text-5xl absolute top-7 left-9 text-dark-blue-2 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.4)] " />
      <h1 className={`text-2xl md:text-4xl absolute top-9 left-24 font-semibold capitalize text-dark-blue-2 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.4)] ${className}`}>
        {text}
      </h1>
    </div>
  );
}
