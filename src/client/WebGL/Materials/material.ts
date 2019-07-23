import { Texture } from './texture';
import GLC from '../GLCommander';
import ModelShader from '../Shaders/ModelShader';

export class Material {
  diffuse: Texture;

  constructor() {
    this.diffuse = new Texture();
  }

  addDiffuse = (url: string) => {
    this.diffuse.loadTexture(url);
    return this;
  };

  _enableDiffuse = (shader: ModelShader) => {
    GLC.activeTexture(0);
    this.diffuse.enable();
    GLC.uploadInt(shader.diffuseTexture, 0);
    GLC.uploadBool(shader.hasDiffuseTexture, this.diffuse.hasTexture());
  };

  enable = (shader: ModelShader) => {
    this._enableDiffuse(shader);
  };
}
