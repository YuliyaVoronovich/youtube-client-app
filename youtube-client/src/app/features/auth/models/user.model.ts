export interface User {
  username: string;
  password: string;
}

export interface LoginFormValue {
  username?: string | null;
  password?: string | null;
}
