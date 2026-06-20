/**
 * Signup Request Payload
 */
export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

/**
 * Login Request Payload
 */
export interface LoginInput {
  email: string;
  password: string;
}