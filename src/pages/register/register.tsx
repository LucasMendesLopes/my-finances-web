import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CustomButton, Input, InputPassword } from '-src/components';
import { useAuth } from '-src/hooks';
import { register } from '-src/services';
import { colors } from '-src/styles/theme';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowLeft } from 'phosphor-react';
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
      .oneOf([yup.ref('email')], 'Os emails não coincidem.')
      .required('Confirme seu email.'),
    password: yup
      .string()
      .required('Digite sua senha.')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
        'Senha inválida.'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas não coincidem.')
      .required('Confirme sua senha.'),
  })
  .required();

export const Register = () => {
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(SignUpSchema),
  });

  const { signIn } = useAuth();

  const onSubmit = async (data: IRegisterFormInputs) => {
    setIsLoadingRegister(true);

    await register(data.email, data.password)
      .then(() => {
        signIn(data.email, data.password);
      })
      .catch((error) => toast.error(error))
      .finally(() => setIsLoadingRegister(false));
  };

  return (
    <s.Container>
      <s.FormContainer>
        <a id='back-button' href='/login'>
          <ArrowLeft color={colors.grey200} size={30} />
        </a>

        <s.Form onSubmit={handleSubmit(onSubmit)}>
          <s.InputsContainer>
            <Input
              name="email"
              label="Digite seu e-mail"
              control={control}
              errorMessage={errors.email?.message}
            />

            <Input
              name="confirmEmail"
              label="Confirme seu e-mail"
              control={control}
              errorMessage={errors.confirmEmail?.message}
            />

            <InputPassword
              name="password"
              label="Digite sua senha"
              control={control}
              errorMessage={errors?.password?.message}
            />

            <InputPassword
              name="confirmPassword"
              label="Confirme sua senha"
              control={control}
              errorMessage={errors?.confirmPassword?.message}
            />
          </s.InputsContainer>

          <s.ButtonContainer>
            <span id="password-rules">
              A senha deve ter no mínimo 6 dígitos, ao menos 1 letra maiúscula,
              1 letra minúscula, 1 caractere numérico ou especial (a-z, A-Z,
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

