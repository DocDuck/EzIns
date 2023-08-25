import React from 'react';
import { View, Text } from 'react-native';
import Button from './src/shared/ui/button';
import styled from 'styled-components/native';

export default function App() {
	const [focusSubject, setFocusSubject] = React.useState('Нажми на кнопку - получишь результат');
	const handlePress = () => {setFocusSubject("Здарова, приложуха считай почти готова)")};
  return (
		  <View>
				<Text>{focusSubject}</Text>
				<Button onPress={handlePress} title='Press me' />
    	</View>
  );
}

const Wrapper = styled(View)`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 600px;
	padding: 24px;
`;