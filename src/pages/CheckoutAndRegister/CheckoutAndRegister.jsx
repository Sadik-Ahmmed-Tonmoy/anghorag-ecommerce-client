import { useForm } from "react-hook-form";
import BottomNav from "../../components/BottomNav/BottomNav";
import useAuthUser from "../../hooks/useAuthUser";
import BillingDetails from "../Checkout/BillingDetails/BillingDetails";
import YourOrder from "../Checkout/YourOrder/YourOrder";
import CheckoutSignupCompo from "../Checkout/CheckoutLoginAndSignup/CheckoutSignupCompo/CheckoutSignupCompo";

const CheckoutAndRegister = () => {
    const { userData } = useAuthUser();
    
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm();
    // const onSubmit = (data) =>  

    // 

    return (
        <>
            <BottomNav title={"Checkout"} />
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="container mx-auto px-2 w-full md:flex justify-between md:gap-5 lg:gap-20">
                    {/* <div className="w-full">{userData.id ? <BillingDetails register={register} /> :   <CheckoutSignupCompo/>}</div> */}
                    <div className="w-full">{userData?.id ||  <CheckoutSignupCompo/>}</div>
                    <div className="w-full">
                        <YourOrder />
                        {/* <YourOrder register={register} /> */}
                    </div>
                </div>
            {/* </form> */}
        </>
    );
};

export default CheckoutAndRegister;
