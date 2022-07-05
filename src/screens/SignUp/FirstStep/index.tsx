import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
} from './styles';

export function FirstStep() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string()
                .required('CNH é obrigatória'),
                name: Yup.string()
                .required('Nome é obrigatório'),
                email: Yup.string()
                .email('E-mail é inválido')
                .required('E-mail é obrigatório'),
            });

            const data = { name, email, driverLicense};
            await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data })
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message)
            }
        }
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
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='number-pad'
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>

                    <Button
                        title="Próximo"
                        onPress={handleNextStep}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}