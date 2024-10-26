import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { AuthStatusEnum } from '@/core';
import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<LoginFormType>;
  status: AuthStatusEnum;
};

export const LoginForm = ({ onSubmit = () => {}, status }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<LoginFormType>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <Text testID="form-title" className="pb-6 text-center text-2xl">
          Login to your account.
        </Text>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label="Login"
          onPress={handleSubmit(onSubmit)}
          loading={status === AuthStatusEnum.LOADING}
          variant="secondary"
        />
        <Button
          variant="ghost"
          label="No account? Sign up here."
          onPress={() => router.navigate('/sign-up')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
