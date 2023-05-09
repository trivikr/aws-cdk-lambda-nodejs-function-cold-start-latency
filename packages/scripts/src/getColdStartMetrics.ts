import { SFN } from "@aws-sdk/client-sfn";
import { promisify } from "util";

const sfnClient = new SFN({});
const setTimeoutAsync = promisify(setTimeout);

export const getColdStartMetrics = async (
  stateMachineArn: string,
  lambdaFnName: string,
  count: number
) => {
  const { executionArn } = await sfnClient.startExecution({
    stateMachineArn,
    input: JSON.stringify({
      functionName: lambdaFnName,
      count,
    }),
  });

  // Rough estimate: Step function takes (2*count + 60) seconds to complete.
  await setTimeoutAsync((count * 2 + 60) * 1000);

  // Wait for ~15 mins past estimated completion time
  for (let i = 1; i <= 30; i++) {
    const response = await sfnClient.describeExecution({ executionArn });
    const { status } = response;
    if (status === "SUCCEEDED") {
      return JSON.parse(response.output!).result[0].median;
    } else if (status === "RUNNING" || status === "QUEUED") {
      await setTimeoutAsync(i * 1000);
    } else {
      throw new Error(`Execution failed with status ${status}`);
    }
  }

  throw new Error(
    "Execution didn't succeed after waiting ~15 mins past estimated completion time"
  );
};
