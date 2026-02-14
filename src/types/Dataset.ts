export interface Dataset {
  _id: string;
  originalFileName: string;
  createdAt?: string;
}

export interface UploadDatasetProps {
  projectId: string;
}
