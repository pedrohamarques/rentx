import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../databases/model/Car';

export const Container = styled.View`
    flex: 1;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background_primary}
`;

export const Header = styled.View`
    width: 100%;
    height: 113px;

    background-color: ${({ theme }) => theme.colors.header};
    
    justify-content: flex-end;
    padding: 32px 24px;
`;

export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TotalCars = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme}) => theme.colors.text};

`;

export const CarList = styled(FlatList as new (props: FlatListProps<Car>) => FlatList<Car>).attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center',
    },
    showsVerticalScrollIndicator: false
})``;
