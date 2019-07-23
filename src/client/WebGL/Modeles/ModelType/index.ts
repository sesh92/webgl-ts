import GLC from '../../GLCommander';
import ModelShader from '../../Shaders/ModelShader';
import { Material } from '../../Materials/material';
import { ModelData } from '../../../types';

export class ModelType {
  vertices: number[];
  indices: number[];
  normals: number[];
  textureCoords: number[];
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  normalBuffer: WebGLBuffer;
  textureCoordsBuffer: WebGLBuffer;
  material: Material;

  constructor({ vertices, indices, normals, textureCoords }: ModelData) {
    this.vertices = vertices;
    this.indices = indices;
    this.normals = normals;
    this.textureCoords = textureCoords;
    this._genVertexBuffer();
    this._genTextureCoords();
    this._genIndexBuffer();
    this._genNormalBuffer();
    this.material = new Material();
  }

  _genTextureCoords = () => {
    this.textureCoordsBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.textureCoordsBuffer);
    GLC.addArrayBufferData(this.textureCoords);
    GLC.unbindArrayBuffer();
  };

  _genNormalBuffer = () => {
    this.normalBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.normalBuffer);
    GLC.addArrayBufferData(this.normals);
    GLC.unbindArrayBuffer();
  };

  _genVertexBuffer = () => {
    this.vertexBuffer = GLC.createBuffer();
    GLC.bindArrayBuffer(this.vertexBuffer);
    GLC.addArrayBufferData(this.vertices);
    GLC.unbindArrayBuffer();
  };

  _genIndexBuffer = () => {
    this.indexBuffer = GLC.createBuffer();
    GLC.bindElementArrayBuffer(this.indexBuffer);
    GLC.addElementArrayBufferData(this.indices);
    GLC.unbindElementArrayBuffer();
  };

  addMaterial = (material: Material) => {
    this.material = material;
  };

  use = (shader: ModelShader) => {
    GLC.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();

    GLC.bindArrayBuffer(this.normalBuffer);
    shader.enableNormals();

    GLC.bindArrayBuffer(this.textureCoordsBuffer);
    shader.enableTextureCoords();

    GLC.bindElementArrayBuffer(this.indexBuffer);
    this.material.enable(shader);
  };

  remove = () => {};
}
