import cn from 'classnames';
import React, { ReactNode } from 'react';

import styles from './header.module.scss';

export enum HeaderThemes {
  COLORED = 'colored',
  WHITE = 'white'
}

export interface IHeaderProps {
  centerNode?: ReactNode;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  theme?: HeaderThemes;
}

export const Header: React.FC<IHeaderProps> = ({
  centerNode,
  leftNode,
  rightNode,
  theme = HeaderThemes.WHITE
}) => (
  <header className={cn(styles.header, styles[theme])}>
    {leftNode}
    {centerNode}
    {rightNode}
  </header>
);
