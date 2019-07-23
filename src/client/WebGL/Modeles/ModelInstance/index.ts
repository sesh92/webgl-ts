import { mat4, vec3 } from 'gl-matrix';

import { createTransformationsMatrix } from '../../Utils/maths';
import Renderer from '../../Render/ModelRenderer';
import { ITickable, Vector3 } from '../../../types';
import SETTINGS from '../../../../../settings.json';

export class ModelInstance implements ITickable {
  position: vec3;
  rotation: Vector3;
  scale: number;
  transformationMatrix: mat4;
  direction: vec3;
  id: string;
  reuse: boolean;
  collision: boolean;

  constructor(position: Vector3, rotation: Vector3, scale: number, direction: Vector3, id: string) {
    this.rotation = rotation;
    this.scale = scale;
    this.position = vec3.create();
    this.direction = vec3.normalize(vec3.create(), vec3.fromValues(direction.x, direction.y, direction.z));
    this.id = id;
    this.updatePosition(position);
    this.updateDirection(direction);
    this.updateTransformationMatrix();
  }

  updateDirection = (direction: Vector3) => {
    this.direction = vec3.fromValues(direction.x, direction.y, direction.z);
    this.updateTransformationMatrix();
  };

  updatePosition = (position: Vector3) => {
    this.position = vec3.fromValues(position.x, position.y, position.z);
    this.updateTransformationMatrix();
  };

  updateRotation = (rotation: Vector3) => {
    this.rotation = rotation;
    this.updateTransformationMatrix();
  };

  updateTransformationMatrix = () => {
    this.transformationMatrix = createTransformationsMatrix(this.position, this.rotation, this.scale);
  };

  getTransformationMatrix = () => this.transformationMatrix;

  tick = () => {
    const { player } = Renderer;

    vec3.scaleAndAdd(this.position, this.position, this.direction, SETTINGS.gameSpeed);

    this.updateTransformationMatrix();

    if (this.position[2] + 5 < player.position[2] || vec3.dist(player.position, this.position) > 100) {
      this.reuse = true;
    }
    if (this.id !== 'player' && vec3.dist(this.position, player.position) < 1) {
      player.collision = true;
    }
  };
}
