import React from 'react';
import { Pressable } from 'react-native';
import { useAppTheme } from '@src/theme';
import { ICategory } from '@src/types/apiResponse';
import Text from '../Text';
import styles from './styles';

export interface ICategoryItemProps {
  category: ICategory;
  onPress?: (category: ICategory) => void;
  isSelected?: boolean;
  style?: any;
}

const CategoryItem = ({
  category,
  onPress,
  isSelected = false,
  style,
}: ICategoryItemProps) => {
  const { theme } = useAppTheme();

  const handlePress = () => {
    onPress?.(category);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles(theme).chipContainer,
        isSelected && styles(theme).selectedChip,
        style,
      ]}
    >
      <Text
        textSize="size_16"
        textHeight="hight_20"
        fontWight={isSelected ? 'bold' : 'regular'}
        color={isSelected ? 'alphaWhite' : 'secondaryParagraph'}
      >
        {category.name}
      </Text>
    </Pressable>
  );
};

export default CategoryItem;
