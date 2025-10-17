import { useState } from "react";
import { Icons } from "@/assets/Icons/icons";
import EditCommon from "@/common/EditCommon"; //  import your edit component
import type { FieldTypes, FormDataUpdate, GenderEnum } from "@/Utilities/types";
import { useProfileContext } from "@/Hooks/useAppContexts";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const { profile } = useProfileContext()

    const fields: FieldTypes<FormDataUpdate>[] = [
        { name: "firstName", label: "First Name", placeholder: "Enter your name" },
        { name: "lastName", label: "Last Name", placeholder: "Enter your name" },
        { name: "address", label: "Address", placeholder: "Enter your address" },
        { name: "phone", label: "Phone", placeholder: "Enter your phone" },
        { name: "gender", label: "Gender", type: "select", placeholder: "Enter your gender" },
    ];

    return (
        <>
            <div className="w-full">
                <div className="container">
                    <div className="w-full flex justify-between ">
                        <h1 className="text-3xl text-gray-300 capitalize my-4">
                            account information
                        </h1>

                        <span>
                            <Icons.FaEdit
                                className="text-gray-300 transition-all duration-300 ease-in-out  hover:cursor-pointer hover:text-gold"
                                onClick={() => setIsEditing(true)}
                            />
                        </span>
                    </div>

                    {isEditing ? (
                        <EditCommon
                            title="Edit Profile"
                            data={
                                profile
                                    ? {
                                        firstName: profile.firstName,
                                        lastName: profile.lastName,
                                        address: profile.address,
                                        phone: profile.phone,
                                        gender: profile.gender as GenderEnum,
                                        
                                    }
                                    : null
                            }
                            fields={fields}
                            onSave={() => setIsEditing(false)}
                            onCancel={() => setIsEditing(false)}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-6 ">
                            <div className="col-span-3">
                                <div className="mb-3">
                                    <h4 className="text-gold-dark capitalize mb-2">First name :</h4>
                                    <p className="text-sm text-gray-300 capitalize">{profile?.firstName}</p>
                                </div>
                                <div className="mb-3">
                                    <h4 className="text-md text-gold-dark capitalize mb-2">phone :</h4>
                                    <p className="text-sm text-gray-300 capitalize">{profile?.phone}</p>
                                </div>
                                <div className="mb-3">
                                    <h4 className="text-gold-dark capitalize mb-2">address :</h4>
                                    <address className="text-sm text-gray-300 capitalize">
                                        {profile?.address}
                                    </address>
                                </div>
                            </div>

                            <div className="col-span-3 md:ml-4">

                                <div className="mb-3">
                                    <h4 className="text-gold-dark capitalize mb-2">Last name :</h4>
                                    <p className="text-sm text-gray-300 capitalize">{profile?.lastName}</p>
                                </div>
                                <div className="mb-3">
                                    <h4 className="text-gold-dark capitalize mb-2">gender :</h4>
                                    <p className="text-sm text-gray-300 capitalize">{profile?.gender}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
