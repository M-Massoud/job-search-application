type pageLayoutProps = {
  children: ReactNode;
};

import { ReactNode } from 'react';
import Header from '../Header';

export default function PageLayout({ children }: pageLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
