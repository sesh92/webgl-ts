import * as OBJ from 'webgl-obj-loader';

import { DEFAULT_CLEAR_COLOR } from '../../../../settings.json';
import { ModelType } from '../Modeles/ModelType/index';

class GLCommander {
  gl: WebGLRenderingContext;

  init = (gl: WebGLRenderingContext) => {
    this.gl = gl;
  };

  meshInit = (mesh: OBJ.Mesh) => {
    OBJ.initMeshBuffers(this.gl, mesh);
  };

  clear = () => {
    this.gl.clearColor(DEFAULT_CLEAR_COLOR.r, DEFAULT_CLEAR_COLOR.g, DEFAULT_CLEAR_COLOR.b, DEFAULT_CLEAR_COLOR.a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  };

  viewport = () => this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  depthTest = (use: boolean) => (use ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST));
  createBuffer = () => this.gl.createBuffer();
  deleteBuffer = (buffer: WebGLBuffer) => this.gl.deleteBuffer(buffer);

  bindArrayBuffer = (buffer: WebGLBuffer) => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  unbindArrayBuffer = () => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  addArrayBufferData = (vertices: number[]) => this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

  bindElementArrayBuffer = (buffer: WebGLBuffer) => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  unbindElementArrayBuffer = () => this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  addElementArrayBufferData = (vertices: number[]) =>
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertices), this.gl.STATIC_DRAW);

  createVertexShader = () => this.gl.createShader(this.gl.VERTEX_SHADER);
  createFragmentShader = () => this.gl.createShader(this.gl.FRAGMENT_SHADER);

  addShaderSource = (shader: WebGLShader, source: string) => this.gl.shaderSource(shader, source);
  compileShader = (shader: WebGLShader) => this.gl.compileShader(shader);
  createShaderProgram = () => this.gl.createProgram();
  attachShaderToProgram = (program: WebGLProgram, shader: WebGLShader) => this.gl.attachShader(program, shader);
  linkProgram = (program: WebGLProgram) => this.gl.linkProgram(program);
  useProgram = (program: WebGLProgram) => this.gl.useProgram(program);

  getAttribLocation = (program: WebGLProgram, attribute: string) => this.gl.getAttribLocation(program, attribute);

  enableVertexAttributeArray = (attribute: number) => this.gl.enableVertexAttribArray(attribute);
  disableVertexAttributeArray = (attribute: number) => this.gl.disableVertexAttribArray(attribute);

  pointToAttribute = (data: number, dimensions: number) => this.gl.vertexAttribPointer(data, dimensions, this.gl.FLOAT, false, 0, 0);
  getUniformLocation = (program: WebGLProgram, uniform: string) => this.gl.getUniformLocation(program, uniform);

  drawTriangles = (count: number) => this.gl.drawElements(this.gl.TRIANGLES, count, this.gl.UNSIGNED_SHORT, 0);

  uploadMatrix4fv = (location: WebGLUniformLocation | null, matrix: Float32Array) => this.gl.uniformMatrix4fv(location, false, matrix);

  uploadVec3f = (location: WebGLUniformLocation, vec3: Float32List) => this.gl.uniform3fv(location, vec3);
  uploadFloat = (location: WebGLUniformLocation, value: number) => this.gl.uniform1f(location, value);
  uploadInt = (location: WebGLUniformLocation, value: number) => this.gl.uniform1i(location, value);
  uploadBool = (location: WebGLUniformLocation, value: boolean) => this.gl.uniform1i(location, value ? 1 : 0);

  createTexture = () => this.gl.createTexture();
  bindTexture = (texture: WebGLTexture) => this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  activeTexture = (texture: number) => this.gl.activeTexture(this.gl.TEXTURE0 + texture);
  defineTexture = (img: TexImageSource) =>
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
  defineDummyTexture = () =>
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  texturePowerOfTwo = () => this.gl.generateMipmap(this.gl.TEXTURE_2D);
  textureNoPowerOfTwo = () => {
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
  };
}

const GLC = new GLCommander();

export default GLC;
