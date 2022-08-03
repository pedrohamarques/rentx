import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { Car } from '../../components/Car';
import { Car as ModelCar} from '../../databases/model/Car';

import {
    Container,
    Header,
    Title,
    Subtitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,

} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    starDate: string;
    endDate: string;
}

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const theme = useTheme();

    function handleGoBack() {
        navigation.goBack()
    }

    useFocusEffect(useCallback(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/rentals');
                const dateFormatted = response.data.map((data: DataProps) => {
                    return {
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    }
                })
                setCars(dateFormatted);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    },[]))
    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor='transparent' />

                <BackButton
                    onPress={handleGoBack}
                    color={theme.colors.shape}
                />

                <Title>
                    Seus agendamentos{'\n'}
                    estão aqui.
                </Title>

                <Subtitle>
                    Conforto, segurança e praticidade.
                </Subtitle>
            </Header>
            {loading ? <LoadAnimation /> :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamento feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            }
        </Container>
    );
}