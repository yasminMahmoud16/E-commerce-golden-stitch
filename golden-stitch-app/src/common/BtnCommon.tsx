import { Button } from "@/Components/ui/button";

type BtnCommonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  icon?: React.ElementType; 
};

export default function BtnCommon({
  className,
  text,
  type = "button",
  loading = false,
   icon: Icon,
  onClick,
}: BtnCommonProps) {
  return (
    <Button
      type={type}
      disabled={loading}
      className={`bg-gradient-to-r from-gold-dark to-gold-light px-10 rounded-3xl uppercase 
        cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
            {Icon&& <Icon className="text-lg" />}

      {loading ? (
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </div>
      ) : (
        text
      )}

    </Button>
  );
}
