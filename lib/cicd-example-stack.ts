import * as cdk from 'aws-cdk-lib';
import { RestApi, EndpointType, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { join } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CicdExampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, `DummyFn`, {
      entry: join(__dirname, `lambda/dummy.ts`),
      runtime: Runtime.NODEJS_18_X,
      timeout: cdk.Duration.minutes(15),
      logRetention: RetentionDays.TWO_WEEKS,
      memorySize: 1024,
      retryAttempts: 0,
    });

    const api = new RestApi(this, `ExampleApi`, {
      description: `Example API`,
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
    });
    api.root.addResource(`pizza`).addMethod(`GET`, new LambdaIntegration(fn));
    api.root.addResource(`soemthing`).addMethod(`GET`, new LambdaIntegration(fn));
  }
}
