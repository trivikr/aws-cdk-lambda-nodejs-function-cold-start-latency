#!/usr/bin/env node
import { parseArgs } from "node:util";

import { getColdStartMetrics } from "./getColdStartMetrics";
import { getLambdaFunctionDescription } from "./getLambdaFunctionDescription";
import { getLambdaFunctionNames } from "./getLambdaFunctionNames";
import { getStateMachineArn } from "./getStateMachineArn";

(async () => {
  const { values } = parseArgs({
    args: process.argv.slice(2),
    options: { count: { type: "string" } },
  });
  const count = values.count ? parseInt(values.count) : 10;

  const [stateMachineArn, lambdaFunctionNames] = await Promise.all([
    getStateMachineArn(),
    getLambdaFunctionNames(),
  ]);

  const results = await Promise.all(
    lambdaFunctionNames.map((lambdaFunctionName) =>
      Promise.all([
        getLambdaFunctionDescription(lambdaFunctionName),
        getColdStartMetrics(stateMachineArn!, lambdaFunctionName!, count),
      ])
    )
  );

  console.log(Object.fromEntries(results));
})();
