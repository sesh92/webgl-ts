import React, { useEffect } from 'react';

import './index.scss';
import init from './Init';
import { IWebGLProps } from '../types';

export default ({ width, height, setGameState, tryCounter, setTime, time }: IWebGLProps) => {
  useEffect(() => {
    init(`webgl-${tryCounter}`, setGameState, setTime, time);
  }, [tryCounter]);
  return <canvas key={tryCounter} id={`webgl-${tryCounter}`} width={width} height={height} className="canvasBorder" />;
};
