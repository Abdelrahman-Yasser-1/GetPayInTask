import React, { ReactNode } from 'react';
import {
  Image,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import styles from './style';
import { px } from '@src/common';
import Button, { IButtonProps } from '../Button';
import { useNavigation } from '@react-navigation/native';
import Icon, { IconProps } from '../Icon';
import Text, { ITextProps } from '../Text';
import { useAppTheme } from '@src/theme';

interface ITitleProps extends Omit<ITextProps, 'children'> {
  title: string;
}

interface ILogoProps {
  logo: ImageProps['source'];
}

interface IStackProps {
  stackNodes: ReactNode[];
  stackGap?: number;
}

export type IconButtonVariants =
  | 'default'
  | 'whiteFaded'
  | 'blackFaded'
  | 'transparent';

interface IIconButtonProps extends IconProps {
  onPress: TouchableOpacityProps['onPress'];
  variant?: IconButtonVariants;
}

const Title = ({ title, ...rest }: ITitleProps) => (
  <Text
    textSize="size_14"
    fontWight="medium"
    textHeight="hight_20"
    color="defaultText"
    numberOfLines={1}
    ellipsizeMode="tail"
    {...rest}
  >
    {title}
  </Text>
);

const Logo = ({ logo }: ILogoProps) => {
  const { theme } = useAppTheme();
  return <Image style={styles(theme).logo} source={logo} />;
};

const NavigationButton = (props: IButtonProps) => (
  <Button
    variant={props?.variant ?? 'secondaryOutline'}
    size="small"
    {...props}
  />
);

const Stack = ({ stackNodes, stackGap = px(16) }: IStackProps) => {
  const { theme } = useAppTheme();
  const maxStackNodes = 3;
  const limitedStackNodes = stackNodes.slice(0, maxStackNodes);

  return (
    <View style={[styles(theme).stackContainer, { gap: px(stackGap) }]}>
      {limitedStackNodes.map((node, index) => (
        <View key={index}>{node}</View>
      ))}
    </View>
  );
};

const IconButton = ({
  name: iconName,
  onPress,
  variant,

  ...rest
}: IIconButtonProps) => {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      style={styles(theme, variant).iconButton}
      onPress={onPress}
    >
      <Icon
        name={iconName}
        color={variant === 'blackFaded' ? 'iconOnColor' : 'iconDefault'}
        size={px(16)}
        {...rest}
      />
    </TouchableOpacity>
  );
};

const Back = ({ variant }: { variant?: IconButtonVariants }) => {
  const navigation = useNavigation();
  return (
    <IconButton
      name={'ChevronLeft'}
      onPress={() => navigation.goBack()}
      size={px(16)}
      variant={variant}
    />
  );
};
const Search = ({
  variant,

  onPress,
}: {
  variant?: IconButtonVariants;

  onPress: TouchableOpacityProps['onPress'];
}) => (
  <IconButton
    name={'Search'}
    onPress={onPress}
    size={px(18)}
    variant={variant}
  />
);
const Cancel = ({
  variant,

  onPress,
}: {
  variant?: IconButtonVariants;

  onPress: TouchableOpacityProps['onPress'];
}) => <IconButton name={'X'} onPress={onPress} variant={variant} />;

const GridAndListView = ({
  viewType,
  variant,
  onPress,
}: {
  viewType: 'grid' | 'list';
  variant?: IconButtonVariants;
  onPress: TouchableOpacityProps['onPress'];
}) => (
  <IconButton
    name={viewType !== 'grid' ? 'Grid' : 'List'}
    onPress={onPress}
    variant={variant}
  />
);

const Edit = ({
  variant,
  onPress,
}: {
  variant?: IconButtonVariants;
  onPress: TouchableOpacityProps['onPress'];
}) => (
  <IconButton
    name={'Pencil'}
    onPress={onPress}
    size={px(16)}
    variant={variant}
  />
);

const NavigationAction = {
  Edit,
  Title,
  Logo,
  Button: NavigationButton,
  Stack,
  IconButton,
  Back,
  Search,
  Cancel,
  GridAndListView,
};

export default NavigationAction;
