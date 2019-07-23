import { mat4, vec3 } from 'gl-matrix';

import { Vector3 } from '../../types';
import SETTINGS from '../../../../settings.json';

export const toRadians = (deg: number) => deg * (Math.PI / 180);

export const createTransformationsMatrix = (position: vec3, { x: rx, y: ry, z: rz }: Vector3, scale: number): mat4 => {
  const matrix: mat4 = mat4.create();
  mat4.identity(matrix);
  mat4.translate(matrix, matrix, position);
  mat4.rotateX(matrix, matrix, toRadians(rx));
  mat4.rotateY(matrix, matrix, toRadians(ry));
  mat4.rotateZ(matrix, matrix, toRadians(rz));
  mat4.scale(matrix, matrix, vec3.fromValues(scale, scale, scale));
  return matrix;
};

export const calcDirection = (direction: Vector3, side: number) => {
  const { turnSpeed } = SETTINGS;
  if (side === -1) {
    if (direction.x > -1) {
      direction.x -= turnSpeed;
    }
  } else {
    if (direction.x < 0) {
      direction.x += turnSpeed;
    }
  }

  if (side === 1) {
    if (direction.x < 1) {
      direction.x += turnSpeed;
    }
  } else {
    if (direction.x > 0) {
      direction.x -= turnSpeed;
    }
  }

  if (side === 0 && Math.abs(direction.x) < turnSpeed * 2) {
    direction.x = 0;
  }
};
