import Profile from "@/components/setting/Profile";
import Infos from "@/components/setting/Infos";
import Password from "@/components/setting/Password";
import { Toaster } from "sonner";

const Setting = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        {/* Profile */}
        <Profile />
        {/* Infos */}
        <Infos />
        {/* Password */}
        <Password />

        <Toaster richColors />
      </div>
    </>
  );
};

export default Setting;
