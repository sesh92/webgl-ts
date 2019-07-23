import * as OBJ from 'webgl-obj-loader';

import GLC from '../GLCommander';
import { Light } from '../LightSource';
import { Camera } from '../Camera';
import Joystick from '../EventHandlers/joystick';
import Instantiator from '../Instantiator';
import { calcDirection } from '../Utils/maths';
import SETTINGS from '../../../../settings.json';
import Renderer from '../Render/ModelRenderer';
import ModelShader from '../Shaders/ModelShader';
import { GAME_STATE } from '../../types';

export default async (id: string, setGameState: (s: GAME_STATE) => void, setTime: Function) => {
  const canvas: HTMLCanvasElement = document.querySelector(`#${id}`);
  if (!canvas) {
    throw new Error(`#${id} not found canvas`);
  }

  const gl: WebGLRenderingContext = canvas.getContext('webgl');
  if (!gl) {
    throw new Error(`webgl no context`);
  }

  GLC.init(gl);
  Joystick.init();

  Renderer.shader = new ModelShader();

  const camera = new Camera();
  const light = new Light();

  // Earth
  Instantiator.InstantiatePrimitive({
    modelData: Instantiator.Plane,
    ...SETTINGS.instance,
    position: { x: 0, y: -210, z: 190 },
    scale: 200,
    textureName: 'cube',
    modelId: 'earth',
  });

  // Player
  const response = await OBJ.downloadModels([
    {
      obj: `/Resources/Objects/player.obj`,
    },
  ]);
  const player = Instantiator.Instantiate({
    modelData: response.player as any,
    ...SETTINGS.player,
  });
  Renderer.player = player.instance;
  camera.follow = player.instance;
  camera.generateMatrices();

  const playerDirection = SETTINGS.player.direction;

  Joystick.subscribe({
    onLeft: () => Joystick.setDir(1),
    offLeft: () => Joystick.setDir(-1),
    onRight: () => Joystick.setDir(-1),
    offRight: () => Joystick.setDir(1),
  });

  const render = () => {
    GLC.clear();

    Instantiator.generate();

    calcDirection(playerDirection, Joystick.side);
    player.instance.updateDirection(playerDirection);
    player.instance.updateRotation({ ...SETTINGS.player.rotation, y: SETTINGS.player.rotation.y + playerDirection.x * 25 });

    camera.generateMatrices();
    Renderer.render(light, camera);

    // Check finish
    if (!player.instance.collision) {
      window.requestAnimationFrame(render);
    } else {
      setGameState('GameOver');
      Joystick.clear();
    }
    setTime(new Date().getTime());
  };

  window.requestAnimationFrame(render);
};
