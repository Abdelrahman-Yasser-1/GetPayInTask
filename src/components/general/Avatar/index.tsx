import { ImageSourcePropType, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import styles from './styles';
import { useAppTheme } from '@src/theme';
import { Image } from 'react-native';
import { AppImages } from '@src/assets/images';

type IAvatarSize = 'small' | 'medium' | 'large';
interface IAvatarProps {
  testID?: string;
  size?: IAvatarSize;
  imageUrl?: string;
  localImage?: ImageSourcePropType;
  initials?: string;
  icon?: React.ReactNode;
  textColor?: string;
  backgroundColor?: string;
  isSquare?: boolean;
  noBorder?: boolean;
}
const Avatar = ({
  testID,
  size = 'large',
  imageUrl,
  localImage,
  initials,
  icon,
  textColor,
  backgroundColor,
  isSquare,
  noBorder,
}: IAvatarProps) => {
  const { theme } = useAppTheme();
  const [hasError, setHasError] = React.useState(false);
  const sizes = useMemo(
    () => ({
      small: 24,
      medium: 40,
      large: 80,
    }),
    [],
  );
  const avatarStyle = useMemo(
    () => styles(theme, backgroundColor, isSquare, sizes[size]).avatar,
    [theme, backgroundColor, isSquare, size, sizes],
  );
  const textStyle = useMemo(
    () => styles(theme, backgroundColor, isSquare, sizes[size], textColor).text,
    [theme, backgroundColor, isSquare, size, textColor, sizes],
  );
  return (
    <View
      testID={testID}
      style={
        styles(
          theme,
          backgroundColor,
          isSquare,
          sizes[size],
          textColor,
          noBorder,
        ).container
      }
    >
      {localImage ? (
        <Image source={localImage} style={avatarStyle} />
      ) : imageUrl && !hasError ? (
        <Image
          source={{ uri: imageUrl }}
          style={avatarStyle}
          onError={() => setHasError(true)}
        />
      ) : initials ? (
        <Text style={textStyle}>{initials}</Text>
      ) : icon ? (
        icon
      ) : (
        <Image source={AppImages.avatarPlaceholder} style={avatarStyle} />
      )}
    </View>
  );
};

export default React.memo(Avatar);
