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
}

export const authUseCases = new AuthUseCases({
  authRepository,
});
