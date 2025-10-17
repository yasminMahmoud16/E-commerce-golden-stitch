import { SwitchDemo } from "@/Components/Switch/SwitchDemo";
import type { IUserData } from "@/Utilities/interfaces";
import BtnCommon from "@/common/BtnCommon";

export default function UserUpdateRole({ data, onCancel }: {
    data: IUserData|null, onCancel: () => void
}) {
  // const [role, setRole] = useState<RoleEnum>(data?.role);



  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 text-white">
        {/* Left Column */}

        <div className="col-span-3">
          <div className="flex flex-col gap-6 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="font-medium text-gold text-sm md:text-md">Username:</span>
              <span className="text-gray-300 text-xs md:text-md capitalize">{data?.username || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gold text-sm md:text-md">Phone:</span>
              <span className="text-gray-300 text-xs md:text-md capitalize">{data?.phone || "—"}</span>
            </div>
          </div>

        </div>



        <div className="col-span-3">

          {/* Right Column */}
          <div className="flex flex-col gap-6 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="font-medium text-gold text-sm md:text-md">Email:</span>
              <span className="text-gray-300 text-xs md:text-md capitalize">{data?.email || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gold text-sm md:text-md">Gender:</span>
              <span className="text-gray-300 text-xs md:text-md capitalize">{data?.gender || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gold text-sm md:text-md ">Role:</span>
              <span className="text-gray-300 text-xs md:text-md capitalize">
                {/* <SwitchDemo role={data?.role} id={data?.id} /> */}
                <SwitchDemo role={data?.role} id={data?.id} />
              </span>
            </div>
          </div>
        </div>
      </div>

          <div className="flex justify-end  mt-4">
      <BtnCommon text="Cancel" onClick={onCancel} />
              
          </div>
    </>
  );
}
