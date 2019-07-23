import GLC from '../../GLCommander';

import VertexSource from './vertex';
import FragmantSource from './fragment';
import Locations from './locations';
import { Light } from '../../LightSource';

export default class ModelShader {
  positionAttribute: number;
  normalAttribute: number;
  textureCoordsAttribute: number;
  program: WebGLProgram;
  transformationMatrix: WebGLUniformLocation;
  viewMatrix: WebGLUniformLocation;
  projectionMatrix: WebGLUniformLocation;
  lightPosition: WebGLUniformLocation;
  lightColor: WebGLUniformLocation;
  lightAmbient: WebGLUniformLocation;
  diffuseTexture: WebGLUniformLocation;
  hasDiffuseTexture: WebGLUniformLocation;

  constructor() {
    const vertexShader: WebGLShader = GLC.createVertexShader();
    GLC.addShaderSource(vertexShader, VertexSource);
    GLC.compileShader(vertexShader);
    this.compileStatus(vertexShader);

    const fragmentShader: WebGLShader = GLC.createFragmentShader();
    GLC.addShaderSource(fragmentShader, FragmantSource);
    GLC.compileShader(fragmentShader);
    this.compileStatus(fragmentShader);

    const program: WebGLProgram = GLC.createShaderProgram();
    GLC.attachShaderToProgram(program, vertexShader);
    GLC.attachShaderToProgram(program, fragmentShader);
    GLC.linkProgram(program);

    this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
    this.textureCoordsAttribute = GLC.getAttribLocation(program, Locations.TEXTURE_COORDS);
    this.normalAttribute = GLC.getAttribLocation(program, Locations.NORMAL);

    this.transformationMatrix = GLC.getUniformLocation(program, Locations.TRANSFORMATION_MATRIX);
    this.viewMatrix = GLC.getUniformLocation(program, Locations.VIEW_MATRIX);
    this.projectionMatrix = GLC.getUniformLocation(program, Locations.PROJECTION_MATRIX);

    this.lightPosition = GLC.getUniformLocation(program, Locations.LIGHT_POSITION);
    this.lightColor = GLC.getUniformLocation(program, Locations.LIGHT_COLOR);
    this.lightAmbient = GLC.getUniformLocation(program, Locations.LIGHT_AMBIENT);

    this.diffuseTexture = GLC.getUniformLocation(program, Locations.DIFFUSE_TEXTURE);
    this.hasDiffuseTexture = GLC.getUniformLocation(program, Locations.HAS_DIFFUSE_TEXTURE);
    this.program = program;
  }

  compileStatus = (shader: WebGLShader) => {
    if (!GLC.gl.getShaderParameter(shader, GLC.gl.COMPILE_STATUS)) {
      console.error(GLC.gl.getShaderInfoLog(shader));
    }
  };

  use = () => {
    GLC.useProgram(this.program);
  };

  enableArrtibute = (attribute: number, dimenssions: number) => {
    GLC.enableVertexAttributeArray(attribute);
    GLC.pointToAttribute(attribute, dimenssions);
  };

  enablePosition = () => this.enableArrtibute(this.positionAttribute, 3);
  enableTextureCoords = () => this.enableArrtibute(this.textureCoordsAttribute, 2);
  enableNormals = () => this.enableArrtibute(this.normalAttribute, 3);

  enableTransformationMatrix = (matrix: Float32Array) => GLC.uploadMatrix4fv(this.transformationMatrix, matrix);

  enableViewProjectionMatrices = (view: Float32Array, projection: Float32Array) => {
    GLC.uploadMatrix4fv(this.viewMatrix, view);
    GLC.uploadMatrix4fv(this.projectionMatrix, projection);
  };

  enableLight = (light: Light) => {
    GLC.uploadVec3f(this.lightPosition, light.getPosition());
    GLC.uploadVec3f(this.lightColor, light.getColor());
    GLC.uploadFloat(this.lightAmbient, light.getAmbient());
  };
}
