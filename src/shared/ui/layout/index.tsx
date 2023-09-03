import { type ReactNode, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ERouteName, NavProp } from 'shared/types';
import { View, Text } from 'react-native';
import Button from '../button';

type Props = {
  navbarSlot?: ReactNode
  headerSlot: ReactNode
  bottomSlot?: ReactNode
  announcementSlot?: ReactNode
  sidebarSlot?: ReactNode
}

export function Layout(props: Props) {
	const navigation = useNavigation<NavProp<ERouteName>>();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation])

  return (
    <View>
      <Text>Лейаут</Text>
      <Button onPress={onBack} ></Button>
    </View>
  )
}