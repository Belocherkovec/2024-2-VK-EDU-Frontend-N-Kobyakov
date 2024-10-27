import { ReactNode } from 'react';

export const HeaderThemes = {
  COLORED: 'colored',
  WHITE: 'white'
} as const;

type THeaderThemes = (typeof HeaderThemes)[keyof typeof HeaderThemes];

export interface IHeaderProps {
  centerNode?: ReactNode;
  className?: string;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  theme?: THeaderThemes;
}
