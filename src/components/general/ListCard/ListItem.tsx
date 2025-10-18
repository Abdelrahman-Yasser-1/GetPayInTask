import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './styles';
import { useAppTheme } from '@src/theme';
import Icon from '../Icon';
import { px } from '@src/common';
import { XOR } from '@src/types';
import ListItemContent, { IListItemBaseProps } from './ListItemContent';
import Toggle from '../Toggle';

interface IClickableListItemProps extends IListItemBaseProps {
  onPress: TouchableOpacityProps['onPress'];
}

interface ISwitchableListItemProps extends IListItemBaseProps {
  value: boolean;
  onSwitch: (value: boolean) => void;
  toggleSize?: 'small' | 'medium' | 'large';
}

export type IListItemProps = XOR<
  IClickableListItemProps,
  ISwitchableListItemProps
>;

const ListItem = ({
  iconName,
  title,
  disabled = false,
  ...rest
}: IListItemProps) => {
  const { theme } = useAppTheme();
  const isSwitch = 'onSwitch' in rest;

  if (isSwitch) {
    return (
      <View style={styles(theme).listItemContainer}>
        <ListItemContent
          iconName={iconName}
          title={title}
          disabled={disabled}
        />
        <Toggle
          isToggled={rest.value}
          handleChange={rest.onSwitch}
          disabled={disabled}
        />
      </View>
    );
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={rest.onPress}
      style={styles(theme).listItemContainer}
    >
      <ListItemContent iconName={iconName} title={title} disabled={disabled} />
      <Icon name="ChevronRight" size={px(16)} color="SA600" />
    </TouchableOpacity>
  );
};
export default ListItem;
