import { IVpc } from '@aws-cdk/aws-ec2';
import { App, Stack } from '@aws-cdk/core';
import * as ec2spot from '../src';
import '@aws-cdk/assert/jest';

describe('default tests', () => {
  let app: App;
  let stack: Stack;
  let provider: ec2spot.Provider;
  let vpc: IVpc;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'testing-stack');
    provider = new ec2spot.Provider(stack, 'Provider');
    vpc = provider.getOrCreateVpc(stack);
  });

  test('create the ASG', () => {
    // GIVEN
    // WHEN
    provider.createAutoScalingGroup('ASG', {
      vpc,
    });

    // THEN
    expect(stack).toHaveResource('AWS::AutoScaling::AutoScalingGroup', {
      MaxSize: '1',
      MinSize: '1',
      LaunchTemplate: {
        LaunchTemplateId: {
          Ref: 'ProviderLaunchTemplateASG3977177B',
        },
        Version: {
          'Fn::GetAtt': [
            'ProviderLaunchTemplateASG3977177B',
            'LatestVersionNumber',
          ],
        },
      },
      Tags: [
        {
          Key: 'Name',
          PropagateAtLaunch: true,
          Value: 'testing-stack/Provider/ASG',
        },
      ],
      VPCZoneIdentifier: [
        {
          Ref: 'VpcPrivateSubnet1Subnet536B997A',
        },
        {
          Ref: 'VpcPrivateSubnet2Subnet3788AAA1',
        },
      ],
    });
  });


  test('create the fleet', () => {
    // GIVEN
    // WHEN
    provider.createFleet('Fleet', {
      vpc,
    });

    // THEN
    expect(stack).toHaveResource('AWS::EC2::SpotFleet', {
      SpotFleetRequestConfigData: {
        IamFleetRole: {
          'Fn::GetAtt': [
            'ProviderFleetRoleCE8E9F00',
            'Arn',
          ],
        },
        LaunchTemplateConfigs: [
          {
            LaunchTemplateSpecification: {
              LaunchTemplateId: {
                Ref: 'ProviderFleet8B88EE2A',
              },
              Version: {
                'Fn::GetAtt': [
                  'ProviderFleet8B88EE2A',
                  'LatestVersionNumber',
                ],
              },
            },
            Overrides: [
              {
                SubnetId: {
                  Ref: 'VpcPrivateSubnet1Subnet536B997A',
                },
              },
              {
                SubnetId: {
                  Ref: 'VpcPrivateSubnet2Subnet3788AAA1',
                },
              },
            ],
          },
        ],
        TargetCapacity: 1,
        TerminateInstancesWithExpiration: true,
      },
    });
  });

  test('create the instance', () => {
    // GIVEN
    // WHEN
    provider.createInstance('Instance', {
      vpc,
    });

    // THEN
    expect(stack).toHaveResource('AWS::EC2::Instance', {
      InstanceType: 't3.large',
      LaunchTemplate: {
        LaunchTemplateId: {
          Ref: 'ProviderInstancelaunchTemplateForInstanceLaunchTemplate148EDEC6',
        },
        Version: {
          'Fn::GetAtt': [
            'ProviderInstancelaunchTemplateForInstanceLaunchTemplate148EDEC6',
            'LatestVersionNumber',
          ],
        },
      },
    });
  });

});
