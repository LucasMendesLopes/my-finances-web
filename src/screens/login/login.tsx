import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { Button, Loading } from '-src/components';
import { login } from '-src/services';
import { TextField } from '@mui/material';

import * as s from './styled-login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingLogin(true);

    await login(email, password)
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
        <s.Form onSubmit={handleSubmit}>
          <img src="/assets/logos/logo.png" alt="logotipo" id="logo" />

          <s.InputsContainer>
            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              type="text"
              label="E-mail"
              variant="outlined"
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              size="small"
              fullWidth
              type="text"
              label="Senha"
              variant="outlined"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </s.InputsContainer>

          <s.ButtonContainer>
            <Button width="100%" disabled={!email || !password}>
              {isLoadingLogin ? (
                <Loading type="spin" color="#ffffff" width={30} height={30} />
              ) : (
                'Login'
              )}
            </Button>

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
