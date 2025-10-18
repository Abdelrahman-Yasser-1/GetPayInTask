import React from 'react';
import styles from './styles';
import { useAppTheme } from '@src/theme';
import Text from '../Text';
import Icon, { IconName } from '../Icon';
import { px } from '@src/common';

export interface IListItemBaseProps {
  iconName: IconName;
  title: string;
  disabled?: boolean;
}

const ListItemContent = ({ iconName, title, disabled }: IListItemBaseProps) => {
  const { theme } = useAppTheme();
  return (
    <>
      <Icon name={iconName} size={px(22)} color="SA600" />
      <Text
        color={disabled ? 'gray400' : 'defaultText'}
        fontWight="regular"
        textSize="size_16"
        textHeight="hight_24"
        style={styles(theme).listItemTitle}
      >
        {title}
      </Text>
    </>
  );
};

export default ListItemContent;
