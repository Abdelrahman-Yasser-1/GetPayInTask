import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import { gutters, hapticFeedback, layout } from '@src/common';
import TabItem from './TabItem';
import { IconName } from '../Icon';

type ITabProps = {
  title: string;
  iconName?: IconName;
  disabled?: boolean;
};

interface ITabsProps {
  tabs: ITabProps[];
  selectedTabIndex?: number;
  onTabChange: (tab: ITabProps, index: number) => void;
}

const Tabs = ({
  tabs,
  selectedTabIndex: activeTabIndex,
  onTabChange,
}: ITabsProps) => {
  const ref = useRef<FlatList>(null);

  const handleTabPress = useCallback(
    (tab: ITabProps, index: number) => {
      hapticFeedback('tabSelection');
      onTabChange(tab, index);
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    },
    [onTabChange],
  );

  const renderTab = useCallback(
    ({ item, index }: { item: ITabProps; index: number }) => {
      const selected = index === activeTabIndex;
      const disabled = item.disabled;
      return (
        <TabItem
          {...item}
          selected={selected}
          disabled={disabled}
          onPress={() => {
            handleTabPress(item, index);
          }}
        />
      );
    },
    [activeTabIndex, handleTabPress],
  );

  return (
    <FlatList
      ref={ref}
      horizontal
      data={tabs}
      renderItem={renderTab}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        ...layout.row,
        flexGrow: 1,
        ...layout.justifyBetween,
        ...gutters.gap_20,
      }}
      onScrollToIndexFailed={() => {}}
      onEndReached={() => {
        hapticFeedback('scrollEnd');
      }}
    />
  );
};

export default Tabs;
