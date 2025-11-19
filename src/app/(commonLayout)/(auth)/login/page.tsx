import Image from "next/image";
import LoginImage from "@/assets/images/loginImage.png";
import { LogInForm } from "@/components/Authentication/LogInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login || ToDo Web App",
  description: "For user login to our Todo Web App",
};

const LoginPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={LoginImage}
          alt="loginImage"
          loading="eager"
          className="absolute container mx-auto inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LogInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
