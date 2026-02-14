export type SignupUser = {
  username: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
};

export type UpdateProfileUser = {
  username: string;
  email: string;
};

