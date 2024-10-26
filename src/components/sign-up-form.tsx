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
  firstName: z.string({
    required_error: 'First name is required',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
  contactNumber: z.string({
    required_error: 'Contact number required',
  }),
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

export type SignUpFormType = z.infer<typeof schema>;

export type SignUpFormProps = {
  onSubmit?: SubmitHandler<SignUpFormType>;
  status: AuthStatusEnum;
};

export const SignUpForm = ({
  onSubmit = () => {},
  status,
}: SignUpFormProps) => {
  const { handleSubmit, control } = useForm<SignUpFormType>({
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
          Create your account.
        </Text>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="Email"
        />
        <ControlledInput
          testID="first-name-input"
          control={control}
          name="firstName"
          label="First Name"
        />
        <ControlledInput
          testID="last-name-input"
          control={control}
          name="lastName"
          label="Last Name"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label="Password"
          placeholder="***"
          secureTextEntry={true}
        />
        <ControlledInput
          testID="contact-number-input"
          control={control}
          name="contactNumber"
          label="Contact Number"
          placeholder="***"
          inputMode="numeric"
        />
        <Button
          testID="login-button"
          label="Sign Up"
          onPress={handleSubmit(onSubmit)}
          loading={status === AuthStatusEnum.LOADING}
        />
        <Button
          variant="ghost"
          label="Already have an account? Login here."
          onPress={() => router.navigate('/login')}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
