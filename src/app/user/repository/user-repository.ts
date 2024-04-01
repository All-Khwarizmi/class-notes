import useGetUserInfra from "@/infrastructure/user/useGetUserInfra";
import useGetUserUsecase from "../usecases/useGetUserUsecase";

export const userRepositry = {
  useGetUser: ({ id }: { id: string }) =>
    useGetUserUsecase.bind(null, { useGetUserInfra, id }),
};
