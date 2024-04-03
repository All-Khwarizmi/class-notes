import useGetUserInfra from "@/infrastructure/user/useGetUserInfra";
import useGetUserUsecase from "../usecases/useGetUserUsecase";
import useOnboardUserUsecase from "../usecases/useOnboardUserUsecase";
import useOnboardUserInfra from "@/infrastructure/user/useOnboardUserInfra";

export const userRepositry = {
  useGetUser: useGetUserUsecase.bind(null, { useGetUserInfra }),
  useOnboardUser: useOnboardUserUsecase.bind(null, { useOnboardUserInfra }),
};
