import React from 'react';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface IButtonProps extends ViewProps {
  // TODO theme?: ThemeInterface;
  backgroundColor?: string;
	onPress: () => void;
	title: string;

}

const ButtonContainer = styled.TouchableOpacity<Omit<IButtonProps, 'title'>>`
  margin-vertical: 40px;
  width: 120px;
  height: 40px;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor ?? 'cyan'};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const Button: React.FC<IButtonProps> = ({ onPress, backgroundColor, title }) => (
  <ButtonContainer onPress={onPress} backgroundColor={backgroundColor}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

export default Button;