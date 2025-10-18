import React from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import { useAppTheme } from '@src/theme';
import Text from '../Text';
import ListItem, { IListItemProps } from './ListItem';
import { gutters } from '@src/common';

export interface IListCardProps {
  title: string;
  items: IListItemProps[];
}

const ListCard = ({ title, items }: IListCardProps) => {
  const { theme } = useAppTheme();
  return (
    <View style={styles(theme).container}>
      <Text
        color="gray400"
        textSize="size_16"
        fontWight="medium"
        textHeight="hight_24"
        style={styles(theme).containerTitle}
      >
        {title}
      </Text>

      <FlatList
        data={items}
        renderItem={({ item }) => <ListItem {...item} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={gutters.marginBottom_16} />}
      />
    </View>
  );
};
export default ListCard;
