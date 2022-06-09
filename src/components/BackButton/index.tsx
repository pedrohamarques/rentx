import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
// import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { TouchableOpacityProps } from 'react-native';

import {
    Container
} from './styles';

interface Props extends TouchableOpacityProps {
    color?: string;
}

export function BackButton({ color } : Props){
    const theme = useTheme();

    return (
        <Container>
            <MaterialIcons 
                name= 'chevron-left'
                size={24}
                color={color ?  color : theme.colors.text}
            />
        </Container>
    );
}