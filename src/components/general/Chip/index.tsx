import Text from '../Text';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { px } from '@src/common';
import style from './style.styles';
import {
  chipOptions,
  getTagIcon,
  IChipProps,
  tagSizes,
  TChipVariants,
} from './chipVariants';
import Icon from '../Icon';

type Props = {
  icon?: React.ReactElement;
};
type TTagProps = Props & IChipProps;
type TStatusProps = Omit<IChipProps, 'size' | 'iconType' | 'iconOnly'>;

const Tag = ({
  label,
  variants,
  theme,
  iconOnly,
  iconType,
  size = 'medium',
  onPress,
  isRounded,
  iconName,
  icon,
}: TTagProps) => {
  const TagColors = chipOptions[variants as TChipVariants];
  const TagText = tagSizes[size];

  return (
    <Pressable onPress={onPress}>
      <View
        style={StyleSheet.flatten({
          ...style(
            theme[TagColors.backgroundColor],
            theme[TagColors.borderColor],
            isRounded,
          ).tagContainer,
          height: TagText.hight,
        })}
      >
        {icon}
        {iconType && getTagIcon(iconType, theme[TagColors.textColor])}
        {!iconOnly && (
          <Text
            fontWight="medium"
            color={TagColors.textColor}
            textSize={TagText.textSize ?? 'size_16'}
            textHeight={tagSizes[size].textHeight}
          >
            {label}
          </Text>
        )}

        {iconName ? <Icon name={iconName} size={px(10)} /> : null}
      </View>
    </Pressable>
  );
};

const Status = ({ label, variants, theme, isRounded = true }: TStatusProps) => (
  <View
    style={
      style(
        theme[chipOptions[variants as TChipVariants].backgroundColor],
        '',
        isRounded,
      ).chipContainer
    }
  >
    <FontAwesomeIcon
      size={px(10)}
      name="circle"
      color={theme[chipOptions[variants as TChipVariants].textColor]}
    />
    <Text
      color={chipOptions[variants as TChipVariants].textColor}
      textSize="size_16"
      fontWight="medium"
      textHeight="hight_20"
    >
      {label}
    </Text>
  </View>
);

const Chip = {
  Tag,
  Status,
};

export default Chip;
