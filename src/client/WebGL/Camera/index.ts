import { vec3, mat4 } from 'gl-matrix';

import { toRadians } from '../Utils/maths';
import GLC from '../GLCommander';
import ModelShader from '../Shaders/ModelShader';
import { Vector3 } from '../../types';
import { CAMERA } from '../../../../settings.json';
import { ModelInstance } from '../Modeles/ModelInstance';

export class Camera {
  position: vec3;
  rotation: Vector3;
  near: number;
  far: number;
  fov: number;
  viewMatrix: Float32Array;
  projectionMatrix: Float32Array;
  follow?: ModelInstance;

  constructor(
    position: Vector3 = CAMERA.POSITION,
    rotation: Vector3 = CAMERA.ROTATION,
    near: number = CAMERA.LIMITS.MIN,
    far: number = CAMERA.LIMITS.MAX,
    fov: number = CAMERA.FOV,
    follow?: ModelInstance,
  ) {
    this.position = vec3.fromValues(position.x, position.y, position.z);
    this.rotation = rotation;
    this.near = near;
    this.far = far;
    this.fov = fov;
    this.follow = follow;
    this.generateMatrices();
  }

  enable = (shader: ModelShader) => {
    shader.enableViewProjectionMatrices(this.viewMatrix, this.projectionMatrix);
  };

  generateMatrices = () => {
    this.viewMatrix = this.createViewMatrix();
    this.projectionMatrix = this.createProjectionMatrix();
  };

  following = (matrix: mat4) => {
    const { position: myPos, follow } = this;
    const position = { ...myPos } as vec3;
    if (follow) {
      vec3.subtract(position, myPos, follow.position);
    }
    mat4.translate(matrix, matrix, position);
  };

  createViewMatrix = () => {
    const matrix: mat4 = mat4.create();
    const { rotation } = this;
    mat4.identity(matrix);
    mat4.rotateX(matrix, matrix, toRadians(rotation.x));
    mat4.rotateY(matrix, matrix, toRadians(rotation.y));
    mat4.rotateZ(matrix, matrix, toRadians(rotation.z));
    this.following(matrix);
    return matrix;
  };

  createProjectionMatrix = () => {
    const aspectRatio = GLC.gl.canvas.width / GLC.gl.canvas.height;
    const matrix: mat4 = mat4.create();
    mat4.perspective(matrix, toRadians(this.fov), aspectRatio, this.near, this.far);
    return matrix;
  };
}
