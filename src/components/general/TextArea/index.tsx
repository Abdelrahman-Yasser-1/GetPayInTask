import React from 'react';
import TextInput, { ITextInputProps } from '../TextInput';
import { Platform } from 'react-native';
import { pxH } from '@src/common';

export type ITextAreaProps = Omit<
  ITextInputProps,
  'prefix' | 'suffix' | 'startIconName' | 'multiline'
>;
const TextArea = ({ numberOfLines = 4, ...rest }: ITextAreaProps) => (
  <TextInput
    {...rest}
    multiline
    numberOfLines={numberOfLines}
    style={{
      minHeight: Platform.OS === 'ios' ? pxH(numberOfLines * 22) : undefined,
    }}
  />
);
export default TextArea;
