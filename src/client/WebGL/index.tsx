import React, { useEffect } from 'react';

import './index.scss';
import init from './Init';
import { IWebGLProps } from '../types';

export default ({ width, height, setGameState, tryCounter, setTime }: IWebGLProps) => {
  useEffect(() => {
    init(`webgl-${tryCounter}`, setGameState, setTime);
  }, [tryCounter]);
  return <canvas id={`webgl-${tryCounter}`} width={width} height={height} className="canvasBorder" />;
};
