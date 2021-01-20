import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import * as ec2spot from './index';

export class IntegTesting {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
      account: process.env.CDK_DEFAULT_ACCOUNT || '123456789012',
    };

    const stack = new cdk.Stack(app, 'integ-stack', { env });

    const provider = new ec2spot.Provider(stack, 'Provider');

    const vpc = provider.getOrCreateVpc(stack);

    provider.createAutoScalingGroup('SpotASG', {
      vpc,
      defaultCapacitySize: 2,
      instanceType: new ec2.InstanceType('m5.large'),
    });

    this.stack = [stack];
  }
}

new IntegTesting();
