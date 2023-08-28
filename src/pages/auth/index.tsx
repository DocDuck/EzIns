 import { useCallback } from 'react'
 import { Image, View } from 'react-native';
// import { LoginForm } from 'features/authentication/login'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper';
import Button from 'shared/ui/button'
import { ERouteName, NavProp } from 'shared/routes'
import { Asset } from 'expo-asset';

export function AuthScreen() {
	const navigation = useNavigation<NavProp<ERouteName>>();
  const onComplete = useCallback(() => {
    navigation.navigate(ERouteName.ProcessListScreen)
  }, [navigation])
  return (
    <View>
      <Text>Компания</Text>
      {/* <Image source={Asset.}/> */}
      <Button onPress={onComplete} ></Button>
    </View>
  )
}