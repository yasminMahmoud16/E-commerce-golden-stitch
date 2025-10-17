import { Switch } from "@/Components/ui/switch"
import { useAuthContext } from "@/Hooks/useAppContexts";
import { useAxios } from "@/Hooks/useAxios"
import { RoleEnum } from "@/Utilities/types";
import {  useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import axios from "axios";


// no props
export function SwitchDemo({ role, id}: { role?: RoleEnum |undefined, id?: string |undefined,  }) {
    const axiosInstance = useAxios();
    const { getAuthHeader } = useAuthContext();
    const [currentRole, setCurrentRole] = useState<RoleEnum |undefined>(role);
console.log({currentRole});

    const getNewRole = (role: RoleEnum) => {
        if (role === RoleEnum.user) {
            return RoleEnum.admin

        } else if (role === RoleEnum.admin) {
            return RoleEnum.user
        }
        return role;
    }
    const changeRoleByAdmin = async (id: string, newRole: RoleEnum) => {
        try {
            const res = await axiosInstance.patch(`/user/${id}/change-role`, { role: newRole }, {
                headers: getAuthHeader()
            })

            setCurrentRole(newRole);
            if (res.data.message === "Done") {
                toast.success("User Role Changed Successfully");
                setTimeout(() => {
    window.location.reload(); 
  }, 800);
            }
            console.log(res);
        } catch (error:unknown) {

            if (axios.isAxiosError(error)) {
                
                console.log({ roleErr: error });
                const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
    
                const generalError = error?.response?.data?.message;
    
                const messageToShow = detailedError || generalError || "changeRoleByAdmin issue";
                toast.error(messageToShow);
            }
        }

    }

    const handleSwitchClick = () => {
        if (!currentRole) return; 
        const newRole = getNewRole(currentRole);
        changeRoleByAdmin(id!, newRole);
    };
    return (
        <div className="flex items-center space-x-2">
            
            <Switch id="role" onClick={() => { handleSwitchClick() }} className={currentRole === RoleEnum.admin ? "text-green-500" : "bg-gray-400"} />
            <Label htmlFor="role">{currentRole}</Label>
        </div>
    )
}
