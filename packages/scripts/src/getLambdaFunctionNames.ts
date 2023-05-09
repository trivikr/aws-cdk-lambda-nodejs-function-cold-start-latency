import { Lambda, paginateListFunctions } from "@aws-sdk/client-lambda";

const client = new Lambda({});

export const getLambdaFunctionNames = async () => {
  const functionNames: string[] = [];

  const paginator = paginateListFunctions({ client, pageSize: 50 }, {});
  for await (const page of paginator) {
    for (const lambdaFn of page.Functions ?? []) {
      if (lambdaFn.FunctionName?.startsWith("AwsCdkLambdaNodeJsFunction-")) {
        functionNames.push(lambdaFn.FunctionName);
      }
    }
  }

  return functionNames;
};
