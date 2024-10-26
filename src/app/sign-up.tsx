import React from 'react';

import { SignUpForm, type SignUpFormProps } from '@/components/sign-up-form';
import { useAuth } from '@/core';
import { AuthType } from '@/core/auth/utils';
import { FocusAwareStatusBar } from '@/ui';

export default function SignUp() {
  const signUp = useAuth.use.signUp();
  const authStatus = useAuth.use.status();

  const onSubmit: SignUpFormProps['onSubmit'] = (data) => {
    signUp({ data, type: AuthType.PASSWORD });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <SignUpForm onSubmit={onSubmit} status={authStatus} />
    </>
  );
}
