import { ReactNode } from 'react';

import * as s from './styled-routes-layout';

interface LayoutProps {
  children: ReactNode;
}

export const RoutesLayout = ({ children }: LayoutProps) => {
  return <s.Container>{children}</s.Container>;
};
