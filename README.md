[![NPM version](https://badge.fury.io/js/cdk-ec2spot.svg)](https://badge.fury.io/js/cdk-ec2spot)
[![PyPI version](https://badge.fury.io/py/cdk-ec2spot.svg)](https://badge.fury.io/py/cdk-ec2spot)
![Release](https://github.com/pahud/cdk-ec2spot/workflows/Release/badge.svg)

# `cdk-ec2spot`

CDK construct library that allows you to create EC2 Spot instances with `AWS AutoScaling Group`, `Spot Fleet` or just single `Spot Instance`.

# Sample

```ts
import * as ec2spot from 'cdk-ec2spot';

// create a ec2spot provider
const provider = new ec2spot.Provider(stack, 'Provider');

// import or create a vpc
const vpc = provider.getOrCreateVpc(stack);

// create an AutoScalingGroup with Launch Template for spot instances
provider.createAutoScalingGroup('SpotASG', {
  vpc,
  defaultCapacitySize: 2,
  instanceType: new ec2.InstanceType('m5.large'),
});
```

# EC2 Spot Fleet support

In addition to EC2 AutoScaling Group, you may use `createFleet()` to create an EC2 Spot Fleet:


```ts
provider.createFleet('SpotFleet', {
  vpc,
  defaultCapacitySize: 2,
  instanceType: new ec2.InstanceType('t3.large'),
});
```

# Single Spot Instnce

If you just need single spot instance without any autoscaling group or spot fleet, use `createInstance()`:

```ts
provider.createInstance('SpotInstance', { vpc })
```
