import useGetUserAuthInfra from "../../infra/useGetUserAuthInfra";
import useGetUserAuthUsecase from "../usecases/useGetUserAuthUsecase";

const authRepositoy = {
  useGetUserId: useGetUserAuthUsecase.bind(null, {
    useGetUserAuthInfra,
  }),
};

export type AuthRepository = typeof authRepositoy;
export default authRepositoy;
