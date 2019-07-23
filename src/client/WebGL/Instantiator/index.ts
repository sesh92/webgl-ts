import { vec3 } from 'gl-matrix';

import GLC from '../GLCommander';
import { GameObject, ModelData, Vector3, IInstantiatePrimitive } from '../../types';
import { Material } from '../Materials/material';
import { ModelType } from '../Modeles/ModelType';
import Cube from './primitives/cube';
import Plane from './primitives/plane';
import Renderer from '../Render/ModelRenderer';
import { ModelInstance } from '../Modeles/ModelInstance';
import SETTINGS from '../../../../settings.json';

class Instantiator {
  Cube: ModelData = Cube;
  Plane: ModelData = Plane;
  nextGenerateTime: number;
  count: number;

  constructor() {
    this.nextGenerateTime = new Date().getTime();
    this.count = 0;
  }

  Instantiate = ({ modelData, position, rotation, scale, direction, modelId = `obj_${this.count++}` }) => {
    const material = new Material();
    const instance: ModelInstance = new ModelInstance(position, rotation, scale, direction, modelId);

    GLC.meshInit(modelData);

    const type = new ModelType({
      vertices: modelData.vertices,
      indices: modelData.indices,
      normals: modelData.vertexNormals,
      textureCoords: modelData.textures,
    });

    type.addMaterial(material);
    Renderer.registerNewModel(type, modelId);

    Renderer.addInstance(instance, modelId);

    return {
      type,
      modelId,
      instance,
    };
  };

  InstantiatePrimitive = ({
    modelData,
    position,
    rotation,
    scale,
    direction,
    textureName,
    modelId = `obj_${this.count++}`,
  }: IInstantiatePrimitive): GameObject => {
    const material = new Material();
    const type = new ModelType(modelData);
    const instance: ModelInstance = new ModelInstance(position, rotation, scale, direction, modelId);

    if (textureName) {
      material.addDiffuse(`/Resources/Textures/${textureName}.png`);
    }

    type.addMaterial(material);
    Renderer.registerNewModel(type, modelId);
    Renderer.addInstance(instance, modelId);

    return {
      type,
      modelId,
      instance,
    };
  };

  generatePosition = () => {
    const pos = new Vector3(Renderer.player.position);
    pos.z += 30;
    pos.x += Math.random() * 40 - 20;
    return pos;
  };

  generateDirection = () => {
    const tmp = vec3.fromValues(Math.random() - 0.5, 0, -Math.random());
    vec3.normalize(tmp, tmp);
    return new Vector3(tmp);
  };

  generate = () => {
    if (this.nextGenerateTime <= new Date().getTime() && this.count <= SETTINGS.countInstances) {
      this.InstantiatePrimitive({
        ...SETTINGS.instance,
        modelData: Cube,
        position: this.generatePosition(),
        direction: this.generateDirection(),
        textureName: 'cube',
      });
      this.nextGenerateTime = new Date().getTime() + SETTINGS.delayGenerationTime * 1000;
    }
  };
}

const instantiator = new Instantiator();

export default instantiator;
