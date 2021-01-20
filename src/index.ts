import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export enum SpotInstanceType {
  ONE_TIME = 'one-time',
  PERSISTENT = 'persistent',
}

export enum InstanceInterruptionBehavior {
  HIBERNATE = 'hibernate',
  STOP = 'stop',
  TERMINATE = 'terminate',
}

export enum BlockDurationMinutes {
  ONE_HOUR = 60,
  TWO_HOURS = 120,
  THREE_HOURS = 180,
  FOUR_HOURS = 240,
  FIVE_HOURS = 300,
  SIX_HOURS = 360,
}

export interface SpotOptions {
  readonly spotInstanceType?: SpotInstanceType;
  readonly validUntil?: string;
  readonly maxPrice?: string;
  readonly instanceInterruptionBehavior?: InstanceInterruptionBehavior;
  readonly blockDurationMinutes?: BlockDurationMinutes;

}

export interface AutoScalingGroupOptions {
  /**
   * The vpc for the AutoScalingGroup
   */
  readonly vpc: ec2.IVpc;
  /**
   * default capacity size for the Auto Scaling Group
   *
   * @default 1
   */
  readonly defaultCapacitySize?: number;
  readonly machineImage?: ec2.IMachineImage;
  readonly instanceType?: ec2.InstanceType;
  readonly spotOptions?: SpotOptions;
  readonly userData?: ec2.UserData;
  readonly instanceProfile?: iam.CfnInstanceProfile;
}

export class Provider extends cdk.Construct {
  private readonly defaultInstanceType: ec2.InstanceType = new ec2.InstanceType('t3.large');
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
  }
  public get amazonLinuxAmiImageId() {
    return new ec2.AmazonLinuxImage({
      generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
    }).getImage(this).imageId;
  }
  public getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
    return scope.node.tryGetContext('use_default_vpc') === '1' ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
      scope.node.tryGetContext('use_vpc_id') ?
        ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
        new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
  }
  public createAutoScalingGroup(id: string, options: AutoScalingGroupOptions): autoscaling.AutoScalingGroup {
    const asg = new autoscaling.AutoScalingGroup(this, id, {
      instanceType: this.defaultInstanceType,
      machineImage: new ec2.AmazonLinuxImage(),
      vpc: options.vpc,
      minCapacity: options.defaultCapacitySize ?? 1,
      updatePolicy: autoscaling.UpdatePolicy.replacingUpdate(),
    });
    const cfnInstanceProfile = asg.node.tryFindChild('InstanceProfile') as iam.CfnInstanceProfile;
    asg.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
    const lt = new ec2.CfnLaunchTemplate(this, `LaunchTemplate${id}`, {
      launchTemplateData: {
        imageId: options.machineImage?.getImage(this).imageId || this.amazonLinuxAmiImageId,
        instanceType: options.instanceType?.toString() || this.defaultInstanceType.toString(),
        userData: options.userData ? cdk.Fn.base64(options.userData.render()) : undefined,
        instanceMarketOptions: {
          marketType: options.spotOptions ? 'spot' : undefined,
          spotOptions: {
            blockDurationMinutes: options.spotOptions?.blockDurationMinutes?.valueOf(),
            instanceInterruptionBehavior: options.spotOptions?.instanceInterruptionBehavior?.valueOf(),
            maxPrice: options.spotOptions?.maxPrice,
            spotInstanceType: options.spotOptions?.spotInstanceType?.valueOf(),
          },
        },
        iamInstanceProfile: {
          arn: cfnInstanceProfile.attrArn,
        },
      },
    });
      // property override
    const cfnAsg = asg.node.tryFindChild('ASG') as autoscaling.CfnAutoScalingGroup;
    cfnAsg.addPropertyDeletionOverride('LaunchConfigurationName');
    cfnAsg.addPropertyOverride('LaunchTemplate', {
      LaunchTemplateId: lt.ref,
      Version: lt.attrLatestVersionNumber,
    });
    return asg;
  }
}
