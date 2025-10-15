import { SwitchDemo } from "@/Components/Switch/SwitchDemo";
import type { IUserData } from "@/Utilities/interfaces";
import BtnCommon from "@/common/BtnCommon";

export default function UserUpdateRole({ data, onCancel }: {
    data: IUserData|null, onCancel: () => void
}) {
  // const [role, setRole] = useState<RoleEnum>(data?.role);



  return (
    <>
      <div className="grid grid-cols-2 gap-6 text-white">
        {/* Left Column */}
        <div className="flex flex-col gap-3 p-4 rounded-xl">
          <div className="flex justify-between">
            <span className="font-semibold text-gold-dark">Username:</span>
            <span className="text-gray-300">{data?.username || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gold-dark">Phone:</span>
            <span className="text-gray-300">{data?.phone || "—"}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3 p-4 rounded-xl">
          <div className="flex justify-between">
            <span className="font-semibold text-gold-dark">Email:</span>
            <span className="text-gray-300">{data?.email || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gold-dark">Gender:</span>
            <span className="text-gray-300">{data?.gender || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gold-dark">Role:</span>
            <span className="text-gray-300">
              <SwitchDemo role={data?.role} id={data?.id} />
            </span>
          </div>
        </div>
      </div>

          <div className="flex justify-end  mt-4">
      <BtnCommon text="Cancel" onClick={onCancel} />
              
          </div>
    </>
  );
}
