import * as _ from 'lodash';

import GLC from '../../GLCommander';
import ModelShader from '../../Shaders/ModelShader';
import { ModelType } from '../../Modeles/ModelType';
import { ModelInstance } from '../../Modeles/ModelInstance';
import { Light } from '../../LightSource';
import { Camera } from '../../Camera';
import { GameObject } from '../../../types';
import Instantiator from '../../Instantiator';

class ModelRenderer {
  shader: ModelShader;
  models: { [key: string]: GameObject };
  player: ModelInstance;

  constructor() {
    this.models = {};
  }

  registerNewModel = (model: ModelType, id: string) => {
    if (!this.models[id]) {
      this.models[id] = {
        type: model,
      };
    }
  };

  addInstance = (instance: ModelInstance, id: string) => {
    this.models[id].instance = instance;
  };

  preRender = () => {
    GLC.viewport();
    GLC.depthTest(true);
  };

  render = (light: Light, camera: Camera) => {
    this.preRender();
    this.shader.use();
    this.shader.enableLight(light);

    camera.enable(this.shader);

    _.forEach(this.models, (model: GameObject, id: string) => {
      model.type.use(this.shader);

      model.instance.tick();
      this.shader.enableTransformationMatrix(model.instance.getTransformationMatrix());
      GLC.drawTriangles(model.type.indices.length);

      // REUSE UNVISIBLE MODELS
      if (model.instance.reuse) {
        Instantiator.nextGenerateTime = new Date().getTime();
        model.instance.updatePosition(Instantiator.generatePosition());
        model.instance.updateDirection(Instantiator.generateDirection());
        model.instance.reuse = false;
      }
    });
  };
}

const Renderer = new ModelRenderer();

export default Renderer;
