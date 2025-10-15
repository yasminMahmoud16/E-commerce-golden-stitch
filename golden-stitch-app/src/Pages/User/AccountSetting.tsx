import BtnCommon from "@/common/BtnCommon";
import PopupCommon from "@/common/PopupCommon";
import useGlobal from "@/Hooks/useGlobal";
import deleteImg from "@/assets/Images/delete_14725157.png"
export default function AccountSetting() {
  const {location, navigate, openPopup,setOpenPopup,deleteAccount} = useGlobal();

  const isAdminPath = location.pathname === "/admin/account-setting";

  const handleOnClick = () => {
    if (isAdminPath) {
      navigate("/admin/change-password");
    } else {
      navigate("/change-password");
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-gray-300 capitalize">Account Setting</h1>

      <div className="flex flex-col items-center gap-4 mt-4">
        <BtnCommon
          text="Change Password"
          className="rounded-sm bg-transparent border-2 border-gray-300 w-80 p-6"
          onClick={handleOnClick}
        />

        <BtnCommon
          text="Delete Account"
          className="rounded-sm bg-red-600 w-80 p-6"
          onClick={()=>{setOpenPopup(true)}}
        />
      </div>



      <PopupCommon
        open={openPopup}
        onOpenChange={setOpenPopup}
        title="Are You Sure You Want To Delete Your Account ? "
        text="Only Admin Can Restore The Account"
        classNameText="text-center text-gray-400"
        
        classNameTitle="!text-red-700 text-3xl text-center"
        image={deleteImg}
        options={[
          {
            label: "Delete My Account",
            className:"bg-red-600",
            onClick: () => deleteAccount(),
          },
          {
            label: "Cancel",
            // onClick: () => handleLogoutClick(logoutEnum.all),
          },
        ]}
        showCancel={false}   
        showAction={false}  
      />
    </div>
  );
}
