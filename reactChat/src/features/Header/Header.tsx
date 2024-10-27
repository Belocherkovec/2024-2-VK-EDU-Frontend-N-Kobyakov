import { HeaderThemes, IHeaderProps } from '@/features/Header/types';
import cn from 'classnames';
import React from 'react';

import styles from './header.module.scss';

export const Header: React.FC<IHeaderProps> = ({
  centerNode,
  className,
  leftNode,
  rightNode,
  theme = HeaderThemes.WHITE
}) => (
  <header className={cn(styles.header, styles[theme], className)}>
    {leftNode}
    {centerNode}
    {rightNode}
  </header>
);
