import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, InputEmail, InputPassword } from '-src/components';
import { login } from '-src/services';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as s from './styled-login';

export interface ILoginFormInputs {
  email: string;
  password: string;
}

const SignSchema = yup
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

const Login = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(SignSchema),
  });

  const onSubmit = async (data: ILoginFormInputs) => {
    setIsLoadingLogin(true);

    await login(data.email, data.password)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoadingLogin(false));
  };

  return (
    <s.Container>
      <s.LoginBg />

      <s.FormContainer>
        <s.Form onSubmit={handleSubmit(onSubmit)}>
          <img src="/assets/logos/logo.png" alt="logotipo" id="logo" />

          <s.InputsContainer>
            <InputEmail
              name="email"
              label="E-mail"
              control={control}
              rules={{}}
              error={errors.email?.message}
            />

            <InputPassword
              name="password"
              label="Senha"
              control={control}
              rules={{}}
              error={errors?.password?.message}
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

export default Login;
