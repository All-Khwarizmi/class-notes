import useGetTemplatesByCreatorInfra from "../../infra/services/useGetTemplatesByCreatorInfra";
import useGetTemplatesByCreatorUsecase from "../usecases/useGetTemplatesByCreatorUsecase";
import useStartTemplateCreationUsecase from "../usecases/useStartTemplatesCreationUsecase";

export const templatesRepository = {
  useStartTemplateCreation: () => useStartTemplateCreationUsecase(),
  useGetTemplatesByCreator: ({ userId }: { userId: string }) =>
    useGetTemplatesByCreatorUsecase.bind(null, {
      userId,
      useGetTemplatesByCreatorInfra,
    }),
};
