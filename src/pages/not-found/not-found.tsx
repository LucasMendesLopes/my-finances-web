import { useNavigate } from 'react-router-dom';

import { CustomButton } from '-src/components';

import * as s from './styled-not-found';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <s.Container>
      <p id="warning">Página não encontrada!</p>

      <s.ImagePageNotFound
        src="assets/images/not-found.png"
        alt="duas pessoas segurando cabos desconectados"
      />

      <p id="redirect">Não se preocupe, volte para a página de Login (:</p>

      <CustomButton
        text="Voltar"
        sx={{ maxWidth: '12.5rem' }}
        onClick={() => navigate('/login')}
      />
    </s.Container>
  );
};

