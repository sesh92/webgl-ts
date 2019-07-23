import { vec3 } from 'gl-matrix';

import { Vector3, RGBA } from '../../types';
import { DEFAULT_LIGHT_POSITION, DEFAULT_LIGHT_COLOR } from '../../../../settings.json';

export class Light {
  position: Vector3;
  color: RGBA;

  constructor(position: Vector3 = DEFAULT_LIGHT_POSITION, color: RGBA = DEFAULT_LIGHT_COLOR) {
    this.position = position;
    this.color = color;
  }

  getPosition = () => vec3.fromValues(this.position.x, this.position.y, this.position.z);
  getColor = () => vec3.fromValues(this.color.r, this.color.g, this.color.b);
  getAmbient = () => this.color.a;
}
