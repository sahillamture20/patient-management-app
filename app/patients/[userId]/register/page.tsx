import RegisterForm from "@/components/form/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
//   console.log(userId);
  const user = await getUser(userId );
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-conatiner max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt={"patient"}
            className="mb-10 h-9 w-fit"
          />

          <RegisterForm user={user} />
          
          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>
      
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
        priority={true}
      />
    </div>
  );
};

export default Register;