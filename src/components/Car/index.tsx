import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcons';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles';

interface Props extends TouchableOpacityProps {
    data: CarDTO
    onPress?: () => void;
    }

export function Car({ data, onPress } : Props){
    const MotorIcon = getAccessoryIcon(data.fuel_type);

    return (
        <Container onPress={onPress}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CarImage 
            source={{ uri: data.thumbnail }}
            resizeMode="contain"
            />
        </Container>
    );
}