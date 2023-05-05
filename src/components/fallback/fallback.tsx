import Loading from '-components/loading/loading';

import * as s from './styled-fallback';

const Fallback = () => {
  return (
    <s.Container>
      <Loading type="spin" />
    </s.Container>
  );
};

export default Fallback;
