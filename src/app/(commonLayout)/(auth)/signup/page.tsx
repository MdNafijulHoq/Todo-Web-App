import Image from "next/image";
import SignupImage from "@/assets/images/signupImage.png";
import { SignUpForm } from "@/components/Authentication/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register || ToDo Web App",
  description: "For user registration to our Todo Web App",
};

const SignupPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={SignupImage}
          alt="signupImage"
          loading="eager"
          className="absolute container mx-auto inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
