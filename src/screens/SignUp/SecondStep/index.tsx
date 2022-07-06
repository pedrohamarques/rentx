import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { api } from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    async function handleRegister() {
        if(!password || !passwordConfirm) {
            return Alert.alert('Ambos os campos são obrigatórios');
        }
        if(password != passwordConfirm) {
            return Alert.alert('As senhas não conferem');
        }

        await api.post("/users", {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        }).then(() => {
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada!',
                message: `Agora é só fazer login\ne aproveitar`,
            });
        }).catch((error) => {
            console.log(error)
            Alert.alert('Opa', 'Não foi possível cadastrar');
        });
    }



    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Cria sua{'\n'}conta
                    </Title>
                    <Subtitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil.
                    </Subtitle>

                    <Form>
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput
                        iconName='lock'
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                        />
                         <PasswordInput
                        iconName='lock'
                        placeholder='Repetir senha'
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                        />
                    </Form>

                    <Button
                        title="Cadastrar"
                        onPress={handleRegister}
                        color={theme.colors.success}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}