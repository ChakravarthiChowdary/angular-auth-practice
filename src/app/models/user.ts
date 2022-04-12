export interface User {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export interface AuthError {
  error: {
    code: number;
    errors: { domain: string; message: string; reason: string }[];
    message: string;
  };
}
