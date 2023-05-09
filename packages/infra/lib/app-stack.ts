import { Stack, StackProps, aws_lambda, aws_lambda_nodejs } from "aws-cdk-lib";
import { Construct } from "constructs";
import { join } from "path";

export class AwsCdkLambdaNodeJsFunctionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFnPath = join(__dirname, "..", "..", "lambdaFn");

    new aws_lambda_nodejs.NodejsFunction(this, "ProvidedSDK", {
      description: "NodejsFunction default (uses Lambda Provided SDK)",
      entry: join(lambdaFnPath, "index.mjs"),
      handler: "index.handler",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
    });

    new aws_lambda_nodejs.NodejsFunction(this, "DeployedSDK", {
      description: "NodejsFunction custom (uses Customer Deployed SDK)",
      entry: join(lambdaFnPath, "index.mjs"),
      bundling: { externalModules: [] },
      handler: "index.handler",
      runtime: aws_lambda.Runtime.NODEJS_18_X,
    });
  }
}
