// A function that checks if the params are valid. It should check if the given param exists in the object passed as param.
type Params = {
  [key: string]: string | undefined;
};
export function checkParams({
  params,
  requiredParams,
}: {
  params: Params;
  requiredParams: string[];
}): boolean {
  return requiredParams.every((param) => param in params);
}
