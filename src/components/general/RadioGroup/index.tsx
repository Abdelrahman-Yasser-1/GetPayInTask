import { View } from 'react-native';
import React from 'react';
import SelectBox, { ISelectBoxProps } from '../SelectBox';
import { gutters } from '@src/common';

type TRadioButton = Omit<
  ISelectBoxProps,
  'variant' | 'isSelected' | 'onSelect'
>;

interface IRadioGroup {
  radioButtons: TRadioButton[];
  selectedId?: string;
  onSelect: ISelectBoxProps['onSelect'];
}

const RadioGroup = ({ radioButtons, selectedId, onSelect }: IRadioGroup) => (
  <View style={gutters.gap_16}>
    {radioButtons.map(btn => (
      <SelectBox
        key={btn.value}
        variant="radio-box"
        isSelected={selectedId === btn.value}
        onSelect={onSelect}
        {...btn}
      />
    ))}
  </View>
);

export default RadioGroup;
