import { paginateListStateMachines, SFN } from "@aws-sdk/client-sfn";

const client = new SFN({});

export const getStateMachineArn = async () => {
  const paginator = paginateListStateMachines({ client, pageSize: 50 }, {});
  for await (const page of paginator) {
    for (const stateMachine of page.stateMachines ?? []) {
      if (stateMachine.name?.startsWith("MeasureColdStartStateMachine-")) {
        return stateMachine.stateMachineArn;
      }
    }
  }
};
