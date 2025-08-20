import CommonForm from "@/components/common-form";
import { useForm } from "react-hook-form";
import { signUpFormControls } from "../../../config";
import { callRegisterUserApi } from "../../../services";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";




// import CommonForm from "../../../components/common-form";

function SignUp(){
    
    const formData=useForm({
        defaultValues: {
            name:'',
            email:'',
            password:''
        },
    });
   const navigate=useNavigate();

   async function handleSubmit(getData){
        // console.log(getData);
        // Here you can handle the form submission, e.g., send data to the server
        // For now, we just log the data to the console

        const data=await callRegisterUserApi(getData);

        console.log(data,"data from api");
        // Handle the response as needed, e.g., show a success message or redirect
        if(data?.success){
            toast("success fully registered",{
                icon: "✅",
                description: "You can now log in with your credentials.",
                duration: 3000,
                 
            });
            navigate("/tasks/list")
           
        }
        else{
            toast("Error",{
                icon: "❌",
                description: data?.message || "Registration failed. Please try again.",
                duration: 3000,
            })
        }

    }
    return (
        <div>
            <CommonForm 
            form={formData}
             handleSubmit={handleSubmit}
             formControls={signUpFormControls}
               btnText={"Sign Up"}
             />
        </div>
    )
}

export default SignUp;