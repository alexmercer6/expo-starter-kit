import * as React from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import { FocusAwareStatusBar, SafeAreaView, ScrollView } from '@/ui';

export default function Style() {
  return (
    <>
      <FocusAwareStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <ScrollView className="px-4">
          <SafeAreaView className="flex-1">
            <Typography />
            <Colors />
            <Buttons />
            <Inputs />
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
