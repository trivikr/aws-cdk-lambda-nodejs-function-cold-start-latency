# aws-cdk-lambda-nodejs-function-cold-start-latency

> Repro for https://github.com/aws/aws-cdk/issues/25492

A CDK application which tests cold start latency of lambda functions created with AWS CDK Lambda NodeJsFunction construct.

## Pre-requisites

- Install **Node.js** by following these steps:
  1. Install [nvm][nvm].
  1. Use node v18.x.x by running `nvm use` or `nvm use 18` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows Node.js >=18, such as `v18.16.0`).
  1. Enable corepack by running `corepack enable` in a terminal window.
- Install dependencies by running `yarn`.
- Install the [AWS CLI][aws-cli] and run [aws configure][aws-cli-configure].
- Install [`measure-cold-start`][sar-measure-cold-start] serverless application on your AWS Account.

## Setup

- Run `yarn cdk deploy` deploy this stack to your default AWS account/region.
- Run `yarn benchmark` to run the benchmark comparing cold starts between NodejsFunction with Lambda Provided SDK vs Customer Deployed SDK.

## Example output

```console
$ yarn benchmark --count 1000
{
  'NodejsFunction default (uses Lambda Provided SDK)': 1227.1435,
  'NodejsFunction custom (uses Customer Deployed SDK)': 929.441
}
```

### Clean up

- Run `yarn cdk destroy`.
- Delete Cloudformation stack with name `serverlessrepo-measure-cold-start` created by [`measure-cold-start`][sar-measure-cold-start].

[aws-cli]: https://aws.amazon.com/cli/
[aws-cli-configure]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[nvm]: https://github.com/nvm-sh/nvm#installation-and-update
[sar-measure-cold-start]: https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~measure-cold-start
