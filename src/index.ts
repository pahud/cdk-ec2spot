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

export interface LaunchTemplateOptions {
  readonly machineImage?: ec2.IMachineImage;
  readonly instanceType?: ec2.InstanceType;
  readonly spotOptions?: SpotOptions;
  readonly userData?: ec2.UserData;
  readonly instanceProfile?: iam.CfnInstanceProfile;
}

export interface AutoScalingGroupOptions extends LaunchTemplateOptions {
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
}

export interface SpotFleetOptions extends AutoScalingGroupOptions {
  /**
   * VPC subnet selection.
   *
   * @default ec2.SubnetType.PRIVATE
   */
  readonly vpcSubnet?: ec2.SubnetSelection;
  /**
   * The timestamp of the beginning of the valid duration
   * @default - now
   */
  readonly validFrom?: string;
  /**
   * The timestamp of the beginning of the valid duration
   * @default - unlimited
   */
  readonly validUntil?: string;
  /**
   * Whether to terminate the fleet with expiration
   *
   * @default true
   */
  readonly terminateInstancesWithExpiration?: boolean;
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
  public createInstanceProfile(id: string): iam.CfnInstanceProfile {
    const role = new iam.Role(this, `Role${id}`, {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });
    return new iam.CfnInstanceProfile(this, `InstanceProfile${id}`, {
      roles: [role.roleName],
    });
  }
  /**
   * Create Launch Template
   * @param id launch template id
   * @param options launch template options
   */
  public createLaunchTemplate(id: string, options: LaunchTemplateOptions = {}): ec2.CfnLaunchTemplate {
    const instanceProfileArn = options.instanceProfile ? options.instanceProfile.attrArn
      : this.createInstanceProfile('DefaultInstanceProfile').attrArn;
    return new ec2.CfnLaunchTemplate(this, id, {
      launchTemplateData: {
        imageId: options.machineImage?.getImage(this).imageId || this.amazonLinuxAmiImageId,
        instanceType: options.instanceType?.toString() || this.defaultInstanceType.toString(),
        userData: options.userData ? cdk.Fn.base64(options.userData.render()) : undefined,
        instanceMarketOptions: {
          marketType: 'spot',
          spotOptions: {
            blockDurationMinutes: options.spotOptions?.blockDurationMinutes?.valueOf(),
            instanceInterruptionBehavior: options.spotOptions?.instanceInterruptionBehavior?.valueOf(),
            maxPrice: options.spotOptions?.maxPrice,
            spotInstanceType: options.spotOptions?.spotInstanceType?.valueOf(),
          },
        },
        iamInstanceProfile: {
          arn: instanceProfileArn,
        },
        tagSpecifications: [
          {
            resourceType: 'instance',
            tags: [
              {
                key: 'Name',
                value: `${this.node.path}/${id}`,
              },
            ],
          },
        ],
      },
    });
  }
  /**
   * Create EC2 Spot Fleet
   * @param id fleet id
   * @param options spot fleet options
   */
  public createSpotFleet(id: string, options: SpotFleetOptions): ec2.CfnSpotFleet {
    const lt = this.createLaunchTemplate(id, {
      instanceProfile: options.instanceProfile,
      instanceType: options.instanceType,
      machineImage: options.machineImage,
      spotOptions: options.spotOptions,
      userData: options.userData,
    });

    const spotFleetRole = new iam.Role(this, 'FleetRole', {
      assumedBy: new iam.ServicePrincipal('spotfleet.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2SpotFleetTaggingRole'),
      ],
    });

    const vpcSubnetSelection = options.vpcSubnet ?? {
      subnetType: ec2.SubnetType.PRIVATE,
    };

    const subnetConfig = options.vpc.selectSubnets(vpcSubnetSelection).subnets.map(s => ({
      subnetId: s.subnetId,
    }));

    const fleet = new ec2.CfnSpotFleet(this, `${id}Resource`, {
      spotFleetRequestConfigData: {
        launchTemplateConfigs: [
          {
            launchTemplateSpecification: {
              launchTemplateId: lt.ref,
              version: lt.attrLatestVersionNumber,
            },
            overrides: subnetConfig,
          },
        ],
        iamFleetRole: spotFleetRole.roleArn,
        targetCapacity: options.defaultCapacitySize ?? 1,
        validFrom: options.validFrom,
        validUntil: options.validUntil,
        terminateInstancesWithExpiration: options.terminateInstancesWithExpiration ?? true,
      },
    });
    return fleet;
  }
  /**
   * Create AutoScaling Group
   * @param id AutoScaling Group ID
   * @param options AutoScaling Group options
   */
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
    const lt = this.createLaunchTemplate(`LaunchTemplate${id}`, {
      instanceProfile: cfnInstanceProfile,
      instanceType: options.instanceType,
      machineImage: options.machineImage,
      spotOptions: options.spotOptions,
      userData: options.userData,
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
