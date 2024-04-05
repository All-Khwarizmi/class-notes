import useGetUserInfra from "@/features/user/infra/services/useGetUserInfra";
import useGetUserUsecase from "../usecases/useGetUserUsecase";
import useOnboardUserUsecase from "../usecases/useOnboardUserUsecase";
import useOnboardUserInfra from "@/features/user/infra/services/useOnboardUserInfra";

export const userRepositry = {
  useGetUser: useGetUserUsecase.bind(null, { useGetUserInfra }),
  useOnboardUser: useOnboardUserUsecase.bind(null, { useOnboardUserInfra }),
};
