import ReactLoading from 'react-loading';

import { colors } from '../../styles/theme';
import * as s from './styled-fallback';

export const Fallback = () => {
  return (
    <s.Container>
      <ReactLoading type="spin" color={colors.blue} width={50} height={50} />
    </s.Container>
  );
};
