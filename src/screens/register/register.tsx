import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, InputEmail, InputPassword } from '-src/components';
import { signUp } from '-src/services';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as s from './styled-register';

export interface IRegisterFormInputs {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = yup
  .object({
    email: yup
      .string()
      .required('Digite seu email.')
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Email inválido!'
      ),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref('email')], 'Os emails não coincidem!')
      .required('Confirme seu email.'),
    password: yup
      .string()
      .required('Digite sua senha.')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
        'Senha inválida!'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas não coincidem!')
      .required('Confirme sua senha.'),
  })
  .required();

const Register = () => {
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (data: IRegisterFormInputs) => {
    setIsLoadingRegister(true);

    await signUp(data.email, data.password)
      .then((resp) => {
        toast.success(resp);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoadingRegister(false));
  };

  return (
    <s.Container>
      <s.FormContainer>
        <s.Form onSubmit={handleSubmit(onSubmit)}>
          <img src="/assets/logos/logo.png" alt="logotipo" id="logo" />

          <s.InputsContainer>
            <InputEmail
              name="email"
              label="Digite seu e-mail"
              control={control}
              error={errors.email?.message}
            />

            <InputEmail
              name="confirmEmail"
              label="Confirme seu e-mail"
              control={control}
              error={errors.confirmEmail?.message}
            />

            <InputPassword
              name="password"
              label="Digite sua senha"
              control={control}
              error={errors?.password?.message}
            />

            <InputPassword
              name="confirmPassword"
              label="Confirme sua senha"
              control={control}
              error={errors?.confirmPassword?.message}
            />
          </s.InputsContainer>

          <s.ButtonContainer>
            <span id="password-rules">
              A senha deve ter no mínimo 6 dígitos, ao menos 1 letra maiúscula,
              1 letra minúscula, 1 caractere númerico ou especial (a-z, A-Z,
              0-9, @-_ç&*#$%).
            </span>

            <CustomButton
              isLoading={isLoadingRegister}
              text="Cadastrar"
              type="submit"
            />
          </s.ButtonContainer>
        </s.Form>
      </s.FormContainer>

      <s.RegisterBg />
    </s.Container>
  );
};

export default Register;
