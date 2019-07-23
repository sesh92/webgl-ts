import { ModelType } from './WebGL/Modeles/ModelType';
import { ModelInstance } from './WebGL/Modeles/ModelInstance';
import { vec3 } from 'gl-matrix';

export interface ITickable {
  tick(player: ModelInstance): void;
}

export type GameObject = {
  type: ModelType;
  modelId?: string;
  instance?: ModelInstance;
};

export type ModelData = {
  vertices: number[];
  indices: number[];
  normals: number[];
  textureCoords: number[];
};

export interface IInstantiatePrimitive {
  modelData: ModelData;
  position?: Vector3;
  rotation?: Vector3;
  scale?: number;
  direction?: Vector3;
  textureName?: string;
  modelId?: string;
}

export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(vec: vec3) {
    if (!vec) {
      vec = vec3.create();
    }
    this.x = vec[0];
    this.y = vec[1];
    this.z = vec[2];
  }
}

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type RGBA = RGB & { a: number };

export type GAME_STATE = 'Awake' | 'Game' | 'GameOver';

export interface IWebGLProps {
  width: number;
  height: number;
  setGameState(state: GAME_STATE): void;
  setTime?: (time: number) => void;
  tryCounter: number;
}
