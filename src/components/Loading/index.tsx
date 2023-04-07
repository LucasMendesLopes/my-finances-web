import ReactLoading from 'react-loading';

import { ILoading } from '-src/types';

export const Loading = ({ type, height, width }: ILoading) => {
  return (
    <ReactLoading
      type={type}
      color="#297373"
      height={height || 50}
      width={width || 50}
    />
  );
};
