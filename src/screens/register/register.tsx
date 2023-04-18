import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { Button, Loading } from '-src/components';
import { register } from '-src/services';
import { TextField } from '@mui/material';

import * as s from './styled-register';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingRegister(true);

    await register(email, password)
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
      <s.RegisterBg />

      <s.FormContainer>
        <s.Form onSubmit={handleSubmit}>
          <img
            style={{ width: '65%' }}
            src="./src/assets/logo-readme.png"
            alt=""
          />

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
              {isLoadingRegister ? (
                <Loading type="spin" color="#ffffff" width={30} height={30} />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </s.ButtonContainer>
        </s.Form>
      </s.FormContainer>
    </s.Container>
  );
};

export default Register;
