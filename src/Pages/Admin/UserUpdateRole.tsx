import { SwitchDemo } from "@/Components/Switch/SwitchDemo";
import type { IUserData } from "@/Utilities/interfaces";
import BtnCommon from "@/common/BtnCommon";

export default function UserUpdateRole({ data, onCancel }: {
    data: IUserData|null, onCancel: () => void
}) {
  // const [role, setRole] = useState<RoleEnum>(data?.role);



  return (
    <>
      






    
{/* 
      <div className="">
         <div className="flex flex-col gap-6 p-4 rounded-xl">
           
         <div className="">
              <p className="font-medium text-gold text-sm md:text-md">Address:</p>
              <p className="text-gray-300 text-xs md:text-md capitalize">{data?.address || "No Address Added Yet"}</p>
            </div>
            <div className="">
              <p className="font-medium text-gold text-sm md:text-md">Gender:</p>
              <p className="text-gray-300 text-xs md:text-md capitalize">{data?.gender || "—"}</p>
            </div>
            <div className="">
              <p className="font-medium text-gold text-sm md:text-md ">Role:</p>
              <p className="text-gray-300 text-xs md:text-md capitalize">
                <SwitchDemo role={data?.role} id={data?.id} />
              </p>
            </div>
      </div>
        </div> */}
        










      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-white ">


        {/* Left Column */}

        <div className="col-span-3">
          <div className="flex flex-col gap-6 p-4 rounded-xl">
            <div className="">
              <p className="font-semibold text-gold-dark text-sm  lg:text-md">Username:</p>
              <p className="text-gray-300 text-xs lg:text-md capitalize">{data?.username || "—"}</p>
            </div>
            <div className="">
              <p className="font-semibold text-gold-dark text-sm  lg:text-md">Phone:</p>
              <p className="text-gray-300 text-xs lg:text-md capitalize">{data?.phone || "—"}</p>
            </div>
            <div className="">
              <p className="font-semibold text-gold-dark text-sm  lg:text-md">Address:</p>
              <p className="text-gray-300 text-xs lg:text-md capitalize">{data?.address || "No Address Added Yet"}</p>
            </div>
          </div>

        </div>



          {/* Right Column */}
        <div className="col-span-3">

          <div className="flex flex-col gap-6 p-4 rounded-xl">
            <div className=" flex flex-col">
              <span className="font-semibold text-gold-dark text-sm  lg:text-md">Email:</span>
              <span className="text-gray-300 text-xs lg:text-md capitalize">{data?.email || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gold-dark text-sm  lg:text-md">Gender:</span>
              <span className="text-gray-300 text-xs lg:text-md capitalize">{data?.gender || "—"}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gold-dark text-sm  lg:text-md ">Role:</span>
              <span className="text-gray-300 text-xs lg:text-md capitalize">
                <SwitchDemo role={data?.role} id={data?.id} />
              </span>
            </div>
          </div>
        </div>
      </div>

          <div className="flex justify-end  mt-4">
      <BtnCommon text="Submit" onClick={onCancel} />
              
          </div>
    </>
  );
}

                {/* <SwitchDemo role={data?.role} id={data?.id} /> */}