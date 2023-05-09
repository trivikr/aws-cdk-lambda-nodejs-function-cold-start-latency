#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AwsCdkLambdaNodeJsFunctionStack } from "./app-stack";

const app = new cdk.App();
new AwsCdkLambdaNodeJsFunctionStack(app, "AwsCdkLambdaNodeJsFunction");
