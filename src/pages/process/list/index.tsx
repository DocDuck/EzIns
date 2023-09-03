import * as React from 'react'
import { View } from 'react-native';
// import { LoginForm } from 'features/authentication/login'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper';
import Button from 'shared/ui/button'
import { ERouteName, NavProp } from 'shared/types'

export function ProcessListScreen() {
	const navigation = useNavigation<NavProp<ERouteName>>();
  const onBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation])

  return (
    <View>
      <Text>Список</Text>
      <Button onPress={onBack} ></Button>
    </View>
  )
}