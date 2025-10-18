import { Switch, View } from 'react-native';
import React, { useCallback } from 'react';
import { useAppTheme } from '@src/theme';
export type ToggleProps = {
  disabled?: boolean;
  isToggled?: boolean;
  handleChange?: (isOn: boolean) => void;
};
const Toggle = ({ disabled, isToggled, handleChange }: ToggleProps) => {
  const { theme } = useAppTheme();

  const handleToggleChange = useCallback(
    (value: boolean) => {
      handleChange && handleChange(value);
    },
    [handleChange],
  );

  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: disabled
          ? theme.toggleColorDisabled
          : isToggled
          ? theme.SA600
          : theme.toggleColorEnabled,
        backgroundColor: disabled
          ? 'transparent'
          : isToggled
          ? theme.SA600
          : 'transparent',
        padding: 2,
        borderRadius: 30,
      }}
    >
      <Switch
        value={isToggled}
        onValueChange={handleToggleChange}
        trackColor={
          disabled
            ? { false: 'transparent', true: 'transparent' }
            : { false: theme.SA600, true: theme.SA600 }
        }
        thumbColor={disabled ? theme.toggleColorDisabled : 'white'}
        disabled={disabled}
      />
    </View>
  );
};

export default Toggle;
