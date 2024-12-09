import cn from 'classnames';
import React from 'react';

import styles from './header.module.scss';
import { HeaderThemes, IHeaderProps } from './types';

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
