import ReactLoading, { LoadingType } from 'react-loading';

export interface ILoading {
  type: LoadingType;
  height?: number;
  width?: number;
  color?: string;
}

const Loading = ({ type, height, width, color }: ILoading) => {
  return (
    <ReactLoading
      type={type}
      color={color || '#297373'}
      height={height || 50}
      width={width || 50}
    />
  );
};

export default Loading;
