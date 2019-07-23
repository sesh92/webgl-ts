import { mat4, vec3 } from 'gl-matrix';

import { createTransformationsMatrix } from '../../Utils/maths';
import Renderer from '../../Render/ModelRenderer';
import { ITickable, Vector3 } from '../../../types';

const ignoreModel = ['earth'];

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

    vec3.add(this.position, this.position, this.direction);
    this.updateTransformationMatrix();

    if (this.position[2] + 5 < player.position[2] || (vec3.dist(player.position, this.position) > 100 && !ignoreModel.includes(this.id))) {
      this.reuse = true;
    }
    if (this.id !== player.id && vec3.dist(this.position, player.position) < 1) {
      player.collision = true;
    }
  };
}
