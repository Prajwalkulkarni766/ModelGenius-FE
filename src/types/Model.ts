export type BaseModelStepProps = {
  projectId: string;
  goToNextStep: () => void;
};

export type ModelStepProps = BaseModelStepProps & {
  modelId: string;
};

export interface Model {
  _id: string;
  modelName: string;
  mlModelName: string;
  createdAt: string;
  updatedAt?: string;
  algorithm?: string;
  handlingMissingValueStrategy?: string;
  encodingCategoricalMethod?: string;
  normalizationTechnique?: string;
}

export interface ModelName {
  modelName: string;
}
