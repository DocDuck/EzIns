import * as React from 'react'
import { SafeAreaView, StyleSheet, Image } from 'react-native';
// import { LoginForm } from 'features/authentication/login'
import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native-paper';
import { instructionsModel } from "entities/instructions";
import { ERouteName, NavProp, useAppDispatch, useAppSelector } from 'shared/types'
import { images } from 'shared/images';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export function LoadScreen() {
	const navigation = useNavigation<NavProp<ERouteName>>();
	const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(instructionsModel.selectors.getIsLoaded())
    React.useEffect(() => {
        if (!isLoaded) {
            dispatch(instructionsModel.getInstructionsTableThunk());
         } else {
            navigation.navigate(ERouteName.AuthScreen)
         }
    }, [isLoaded])
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={images.logo}/>
            <Text>Eazy Instructions</Text>
        </SafeAreaView>
    )
}