import useGetUserAuthInfra from '../../infra/useGetUserAuthInfra';
import useGetUserAuthUsecase from '../usecases/useGetUserAuthUsecase';

const oldAuthRepositoy = {
  useGetUserId: useGetUserAuthUsecase.bind(null, {
    useGetUserAuthInfra,
  }),
};

export type AuthRepository = typeof oldAuthRepositoy;
export default oldAuthRepositoy;
