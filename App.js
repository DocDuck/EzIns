import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

export default function App() {
	const [focusSubject, setFocusSubject] = React.useState('');
	const handlePress = () => {setFocusSubject("Здарова, приложуха считай почти готова)")};
  return (
		  <View style={styles.container}>
				<Text>{focusSubject ?? 'Нажми на кнопку - получишь результат'}</Text>
				<Button title="Нажми на меня" style={styles.button} onPress={handlePress}/>
    	</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
    padding: 8,
  },
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
});
