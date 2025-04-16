import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useUplodeProfile } from "@/hook/useUplodeProfile";
import { useAuthContext } from "@/hook/useAuthConext";

const Profile = () => {
  const { uplodePfp, profileError, setProfileError } = useUplodeProfile();
  const { user, dispatch } = useAuthContext();

  return (
    <>
      <div className="relative w-24 h-24">
        <Avatar className="w-full h-full">
          <AvatarImage src={user.img_url} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label htmlFor="avatarUpload">
          <FontAwesomeIcon
            icon={faPen}
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full text-gray-600 text-xs shadow hover:bg-black hover:text-white cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="avatarUpload"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            console.log("Selected file:", file);
          }}
        />
      </div>
    </>
  );
};
export default Profile;
