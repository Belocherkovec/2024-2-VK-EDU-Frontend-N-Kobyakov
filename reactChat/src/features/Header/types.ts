import { ReactNode } from 'react';

export enum HeaderThemes {
  COLORED = 'colored',
  WHITE = 'white'
}

export interface IHeaderProps {
  centerNode?: ReactNode;
  className?: string;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  theme?: HeaderThemes;
}
