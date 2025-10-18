import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { px } from '@src/common';
import Text from '../Text';
import { useAppTheme } from '@src/theme';
import styles from './styles';
import Icon, { IconName } from '../Icon';

type ITabProps = {
  title: string;
  iconName?: IconName;
  disabled?: boolean;
  selected: boolean;
  onPress: TouchableOpacityProps['onPress'];
};

const TabItem = ({
  title,
  iconName,
  disabled = false,
  selected = false,
  onPress,
}: ITabProps) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles(theme, disabled).container}
      onPress={onPress}
    >
      <View style={styles(theme, disabled).content}>
        {iconName && (
          <Icon
            name={iconName}
            size={px(14)}
            color={disabled ? 'gray400' : selected ? 'SA500' : 'iconDefault'}
          />
        )}
        <Text
          fontWight={selected ? 'bold' : 'regular'}
          color={disabled ? 'gray400' : selected ? 'primaryText' : 'gray700'}
        >
          {title}
        </Text>
      </View>
      {selected && <View style={styles(theme, disabled).selectedUnderline} />}
    </TouchableOpacity>
  );
};

export default TabItem;
