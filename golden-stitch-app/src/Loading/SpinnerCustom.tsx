import { LoaderIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-8 animate-spin", className)}
      {...props}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className=" min-h-screen flex items-center justify-center gap-4 bg-radial from-[#E6D7B6] to-[#DBC8A0]">
      <Spinner />
    </div>
  )
}
