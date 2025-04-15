import { useState } from "react";
import { useAuthContext } from "@/hook/useAuthConext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/setting/Input";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Setting = () => {
  const { user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    // oldPassword: z
    //   .string()
    //   .min(6, "Password must be at least 6 characters long"),
    // newPassword: z
    //   .string()
    //   .min(6, "Password must be at least 6 characters long"),
  });

  const {
    register: registerInfos,
    formState: { errors: infosErrors },
    handleSubmit: handleInfosSubmit,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: user.name,
      email: user.email,
    },
  });

  const onSubmitInfos = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10">
        <div>
          <Avatar className={"w-24 h-auto"}>
            <AvatarImage src={user.img_url} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="border-b w-100 font-bold mt-10 mb-5">User infos</div>
        <form action="submit" onSubmit={handleInfosSubmit(onSubmitInfos)}>
          <div className="flex flex-col ">
            <div>
              <InputForm
                type={"text"}
                title={"Username"}
                register={registerInfos}
                schema={"username"}
              />
              {infosErrors.username && (
                <p className="text-red-500 text-sm mb-1 mt-2">
                  {infosErrors.username.message}
                </p>
              )}
            </div>
            <div>
              <InputForm
                type={"email"}
                title={"Email"}
                register={registerInfos}
                schema={"email"}
              />
              {infosErrors.email && (
                <p className="text-red-500 text-sm mb-1 mt-2">
                  {infosErrors.email.message}
                </p>
              )}
            </div>
          </div>
          <Button type="submit" className={"mt-3"}>
            Save Changes
          </Button>
        </form>
        <div className="border-b w-100 font-bold mt-2 mb-5">Password</div>
        {/* <div>
          <InputForm
            type={"password"}
            title={"Old Password"}
            register={register}
            schema={"oldPassword"}
            placeholder={"Your old password"}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mb-1">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div>
          <InputForm
            type={showPassword ? "text" : "password"}
            title={"New Password"}
            register={register}
            schema={"newPassword"}
            toggleIcon={showPassword ? faEye : faEyeSlash}
            onToggle={() => {
              setShowPassword((p) => !p);
            }}
            placeholder={"Your new password"}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mb-1 mt-2">
              {errors.newPassword.message}
            </p>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Setting;
