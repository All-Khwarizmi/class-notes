import { isLeft } from "fp-ts/lib/Either";
import AuthRepository, { authRepository } from "../repository/auth-repository";

export interface AuthUseCasesOptions {
  authRepository: AuthRepository;
}

export default class AuthUseCases {
  private readonly _authRepository: AuthRepository;

  constructor(options: AuthUseCasesOptions) {
    this._authRepository = options.authRepository;
  }

  async getUserAuth() {
    return this._authRepository.getUserAuth();
  }

  async isCurrentUser(userId: string) {
    const result = await this.getUserAuth();
    if (isLeft(result)) {
      return false;
    }
    return result.right.userId === userId;
  }
}

export const authUseCases = new AuthUseCases({
  authRepository,
});
