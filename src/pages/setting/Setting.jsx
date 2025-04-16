import Profile from "@/components/setting/Profile";
import Infos from "@/components/setting/Infos";
import Password from "@/components/setting/Password";
import { Toaster } from "sonner";
import Currency from "@/components/setting/Currency";

const Setting = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-10">
        {/* Profile */}
        <Profile />

        {/* Infos */}
        <div className="flex justify-evenly gap-50">
          <div>
            <Infos />
            {/* Password */}
            <Password />
          </div>
          {/* Currency */}
          <div>
            <Currency />
          </div>
        </div>

        <Toaster richColors />
      </div>
    </>
  );
};

export default Setting;
