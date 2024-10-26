import React from 'react';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { AuthType } from '@/core/auth/utils';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  const login = useAuth.use.login();
  const authStatus = useAuth.use.status();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    login({ data, type: AuthType.PASSWORD });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} status={authStatus} />
    </>
  );
}
