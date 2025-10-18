import React from 'react';
import SelectBox, { ISelectBoxProps } from '../SelectBox';

interface ICheckbox
  extends Omit<ISelectBoxProps, 'variant' | 'onSelect' | 'value'> {
  id: string;
  onSelect: (val: boolean) => void;
}

const Checkbox = ({ onSelect, id, isSelected, ...rest }: ICheckbox) => (
  <SelectBox
    {...rest}
    variant="check-box"
    onSelect={() => onSelect(!isSelected)}
    value={id}
    isSelected={isSelected}
  />
);

export default Checkbox;
