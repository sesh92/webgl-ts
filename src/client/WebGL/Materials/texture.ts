import GLC from '../GLCommander';

export class Texture {
  texture: WebGLTexture;
  done: boolean;

  constructor() {
    this.texture = GLC.createTexture();
    GLC.bindTexture(this.texture);
    GLC.defineDummyTexture();
  }

  loadTexture = (url: string) => {
    const img = new Image();
    img.setAttribute('crossOrigin', '');
    img.onload = () => this.onLoad(img);
    img.src = url;
  };

  onLoad = (img: TexImageSource) => {
    GLC.bindTexture(this.texture);
    GLC.defineTexture(img);
    if (this.isPowerOf2(img.width) && this.isPowerOf2(img.height)) {
      GLC.texturePowerOfTwo();
    } else {
      GLC.textureNoPowerOfTwo();
    }
    this.done = true;
  };

  isPowerOf2 = (side: number) => (side && side - 1) === 0;

  enable = () => GLC.bindTexture(this.texture);

  hasTexture = () => !!this.done;
}
