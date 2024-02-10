#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CicdExampleStack } from "../lib/cicd-example-stack";

const app = new cdk.App();
new CicdExampleStack(app, `CicdExampleTwoElectricBoogalooStack-${process.env.DEPLOY_ENV}`, {
  env: { account: "359317520455", region: "us-east-1" },
  description: `CICD Example Two Stack for ${process.env.DEPLOY_ENV}`,
});
