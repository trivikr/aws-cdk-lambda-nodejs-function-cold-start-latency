import { Lambda } from "@aws-sdk/client-lambda";

const client = new Lambda({});

export const getLambdaFunctionDescription = async (lambdaFnName: string) =>
  (await client.getFunctionConfiguration({ FunctionName: lambdaFnName }))
    .Description!;
