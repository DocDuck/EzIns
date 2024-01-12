import * as React from 'react'
import { View } from 'react-native';
// import { LoginForm } from 'features/authentication/login'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper';
import { instructionsModel } from "entities/instructions";
import Button from 'shared/ui/button'
import { ERouteName, NavProp, useAppDispatch } from 'shared/types'

export function AuthScreen() {
	const navigation = useNavigation<NavProp<ERouteName>>();
	const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(instructionsModel.getInstructionsTable());
  }, [])

  const onComplete = React.useCallback(() => {
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