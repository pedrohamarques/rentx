import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
    Container,
    InputText,
    IconContainer,
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();


    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }


    function handlePasswordVisibility() {
        setIsPasswordVisible(prevState => !prevState)
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText
                isFocused={isFocused}
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus} //entrar na caixa
                onBlur={handleInputBlur}  //sair da caixa
                autoCorrect={false}
                {...rest}
            />

            <BorderlessButton
                onPress={handlePasswordVisibility}
            >
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={theme.colors.text_detail}
                    />
                </IconContainer>
            </BorderlessButton>
        </Container>
    );
}