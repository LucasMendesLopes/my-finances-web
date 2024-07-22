import { ReactNode } from 'react';

import { Sidebar } from '../sidebar/sidebar';
import * as s from './styled-routes-layout';

interface LayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <s.Container>
      <Sidebar />

      {children}
    </s.Container>
  )
};
