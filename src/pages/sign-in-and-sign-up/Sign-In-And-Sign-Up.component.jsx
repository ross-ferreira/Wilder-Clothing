import React from 'react';

import './Sign-In-And-Sign-Up.styles.scss';
import SignIn from '../../components/Sign-In/Sign-In.component';
import SignUp from '../../components/Sign-Up/Sign-Up.component';

const SignUpAndSignOut = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignUpAndSignOut;
