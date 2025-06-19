export type ModelStepProps = {
  projectId: string | null;
  modelId: string | null;
  goToNextStep: () => void;
};

export interface ModelName {
  modelName: string;
}

export interface Model {
  _id: string;
  modelName: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  encodingCategoricalDataMethod: string;
  handlingMissingValueStrategy: string;
  normalizationTechnique: string;
  mlModelName: string;
}