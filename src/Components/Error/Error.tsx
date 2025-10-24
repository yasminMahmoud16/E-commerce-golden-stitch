
// import errorImage from '../../assets/error.svg'

import PagesWrapper from "@/common/PagesWrapper";

import notFoundAnimation from "@/assets/Images/notFound.png"

export default function Error() {
  return <>
    
    <PagesWrapper>
      <div className="flex flex-col items-center justify-center py-10">
        <img src={notFoundAnimation} alt="" />
      <p className="mt-4 text-dark-blue-1  text-xl font-bold">
        Page NOt found
      </p>
    </div>
</PagesWrapper>
  </>
}
