import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CustomButton, Input, InputPassword } from '-src/components';
import { useAuth } from '-src/contexts/auth-context';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as s from './styled-login';

export interface ILoginFormInputs {
  email: string;
  password: string;
}

const SignInSchema = yup
  .object({
    email: yup
      .string()
      .required('Digite seu email.')
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Email inválido!'
      ),
    password: yup.string().required('Digite sua senha.'),
  })
  .required();

export const Login = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const { signIn } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    setIsLoadingLogin(true);

    signIn(data.email, data.password);
  };

  return (
    <s.Container>
      <s.LoginBg />

      <s.FormContainer>
        <s.Form onSubmit={handleSubmit(onSubmit)}>
          <img src="/assets/logos/logo.png" alt="logotipo" id="logo" />

          <s.InputsContainer>
            <Input
              name="email"
              label="E-mail"
              control={control}
              errorMessage={errors.email?.message}
            />

            <InputPassword
              name="password"
              label="Senha"
              control={control}
              errorMessage={errors.password?.message}
            />
          </s.InputsContainer>

          <s.ButtonContainer>
            <CustomButton
              isLoading={isLoadingLogin}
              text="Login"
              type="submit"
            />

            <s.RegisterRedirect>
              <span>Novo no My Finances?</span>

              <a href="/register">Cadastre-se aqui!</a>
            </s.RegisterRedirect>
          </s.ButtonContainer>
        </s.Form>
      </s.FormContainer>
    </s.Container>
  );
};


