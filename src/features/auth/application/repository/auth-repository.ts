import IAuth from "@/core/auth/i-auth";

export interface AuthRepositoryOptons {
  auth: IAuth;
}
export default class AuthRepository {
  private readonly _auth: IAuth;

  constructor(options: AuthRepositoryOptons) {
    this._auth = options.auth;
  }

  async getUserAuth() {
    return this._auth.getUserAuthInfra();
  }
}
