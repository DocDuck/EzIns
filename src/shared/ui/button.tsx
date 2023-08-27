import React from 'react';
import { ViewProps } from 'react-native';
import { Button as _Button } from 'react-native-paper';
import styled from 'styled-components/native';

interface IButtonProps extends ViewProps {
  // TODO theme?: ThemeInterface;
  backgroundColor?: string;
	onPress: () => void;
	title?: string;

}

const ButtonContainer = styled(_Button)<Omit<IButtonProps, 'title'>>`
  margin-vertical: 40px;
  width: 120px;
  height: 40px;
  padding: 12px 24px;
  border-radius: 10px;
  background-color: ${(props: Omit<IButtonProps, 'title'>) => props.backgroundColor ?? 'cyan'};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

const Button: React.FC<IButtonProps> = ({ onPress, backgroundColor, title = '' }) => (
  <ButtonContainer onPress={onPress} backgroundColor={backgroundColor}>
    {title && <ButtonText>{title}</ButtonText>}
  </ButtonContainer>
);

export default Button;