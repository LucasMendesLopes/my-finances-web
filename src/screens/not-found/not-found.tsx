import { useNavigate } from 'react-router-dom';

import { Button } from '-src/components';

import * as s from './styled-not-found';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <s.Container>
      <p id="warning">Página não encontrada!</p>

      <s.ImagePageNotFound
        src="assets/images/not-found.png"
        alt="duas pessoas segurando cabos desconectados"
      />

      <p id="redirect">Não se preocupe, volte para a página de Login (:</p>

      <Button
        id="button-redirect"
        width="200px"
        onClick={() => navigate('/login')}
      >
        Voltar
      </Button>
    </s.Container>
  );
};

export default NotFound;
