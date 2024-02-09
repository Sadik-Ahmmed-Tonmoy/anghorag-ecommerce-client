import React, { useState } from 'react';
import CheckoutLoginCompo from './CheckoutLoginCompo/CheckoutLoginCompo';
import CheckoutSignupCompo from './CheckoutSignupCompo/CheckoutSignupCompo';

const CheckoutLoginAndSignup = () => {

    const [isLogIn, setIsLogIn] = useState(true)
    return (
        <>
           {
                isLogIn ? <CheckoutLoginCompo setIsLogIn={setIsLogIn} /> : <CheckoutSignupCompo setIsLogIn={setIsLogIn} />
           }
        </>
    );
};

export default CheckoutLoginAndSignup;