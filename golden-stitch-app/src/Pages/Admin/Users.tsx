import { Icons } from "@/assets/Icons/icons";
import AdminTable from "@/common/AdminTable";
import AdminTitles from "@/common/AdminTitles";
import {  useState } from "react";
import deleteImage from "@/assets/Images/delete_14725157.png"
import useDashboardAdmin from "@/Hooks/useDashboardAdmin";
import UserUpdateRole from "./UserUpdateRole";
import PopupCommon from "@/common/PopupCommon";
import useGlobal from "@/Hooks/useGlobal";
import type { IUserData } from "@/Utilities/interfaces";

export default function Users() {
  const { users, isLoading } = useDashboardAdmin(); // useQuery already handles fetching
  const { openPopup,setOpenPopup,deleteAccount} = useGlobal();

  const usersHeaders = [
    { id: 1, label: "Username" },
    { id: 2, label: "Email" },
    { id: 3, label: "Phone" },
    { id: 4, label: "Gender" },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [userData, setUserData] = useState<IUserData|null>(null);

  const handleEditClick = (id: string) => {
    const selectedUser = users?.find((user:IUserData) => user.id === id);
    if (selectedUser) {
      setUserData(selectedUser);
      setIsEdit(true);
    }
  };

  const handleDeleteClick =async (id: string) => {
    const selectedUser = users?.find((user:IUserData) => user.id === id);
    if (selectedUser) {
      setUserData(selectedUser);
      setOpenPopup(true); 
      setIsDelete(true)
    }
  };



  // const fields = [
  //   { name: "username", label: "User Name", type: "text", placeholder: "Enter user name" },
  //   { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  //   { name: "phone", label: "Phone", type: "text", placeholder: "Enter phone number" },
  //   { name: "gender", label: "Gender", type: "text", placeholder: "Enter gender" },
  // ];

  return (
    <>
      <AdminTitles text="User Management" icon={Icons.FaUsers} />

      {!isEdit ? (
        <AdminTable
          headers={usersHeaders}
          data={users || []}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          isLoading={isLoading} 
        />
      ) : (<>
          <UserUpdateRole data={userData}
          onCancel={() => {
            setIsEdit(false);
            setUserData(null);
          }}
        />
      </>

      )}

      {isDelete && (
        <PopupCommon
        open={openPopup}
        onOpenChange={setOpenPopup}
        title="Are You Sure You Want To Delete Your Account ? "
        text="Only Admin Can Restore The Account"
        classNameText="text-center text-gray-400"
        
        classNameTitle="!text-red-700 text-3xl text-center"
        image={deleteImage}
        options={[
          {
            label: "Delete My Account",
            className:"bg-red-600",
            onClick: async() => {
                console.log("User ID:", userData?.id);

              deleteAccount(userData?.id)
              
            },
          },
          {
            label: "Cancel",
            // onClick: () => handleLogoutClick(logoutEnum.all),
          },
        ]}
        showCancel={false}   
        showAction={false}  
      />
      )}
    </>
  );
}

