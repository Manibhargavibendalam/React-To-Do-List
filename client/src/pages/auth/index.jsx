import { useState } from "react";
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import CommonButton from "../../components/common-button";


function AuthPage() {
  const [Isloginview, setIsloginview] = useState(true);
  return (
    <div className="flex flex-auto flex-col min-h-screen h-full">
      <div className="flex h-full flex-col justify-center items-center bg-white">

        <h3 className="text-3xl font-bold">Welcome</h3>
        <div className="mt-4">  {Isloginview ? <SignIn /> : <SignUp />}

          {/* Toggle between Sign In and Sign Up views */}
          <div className="mt-5 text-center">

            <CommonButton
              type={'button'}
              onClick={() => setIsloginview(!Isloginview)}
              buttonText={Isloginview ? "Switch to Sign Up" : "Switch to Sign In"}
            />
          </div>







        </div>

      </div>

    </div>
  );
}

export default AuthPage;