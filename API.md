# API Reference

**Classes**

Name|Description
----|-----------
[Provider](#cdk-ec2spot-provider)|*No description*


**Structs**

Name|Description
----|-----------
[AutoScalingGroupOptions](#cdk-ec2spot-autoscalinggroupoptions)|*No description*
[LaunchTemplateOptions](#cdk-ec2spot-launchtemplateoptions)|*No description*
[SpotFleetOptions](#cdk-ec2spot-spotfleetoptions)|*No description*
[SpotOptions](#cdk-ec2spot-spotoptions)|*No description*


**Enums**

Name|Description
----|-----------
[BlockDurationMinutes](#cdk-ec2spot-blockdurationminutes)|*No description*
[InstanceInterruptionBehavior](#cdk-ec2spot-instanceinterruptionbehavior)|*No description*
[SpotInstanceType](#cdk-ec2spot-spotinstancetype)|*No description*



## class Provider  <a id="cdk-ec2spot-provider"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Provider(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**amazonLinuxAmiImageId** | <code>string</code> | <span></span>

### Methods


#### createAutoScalingGroup(id, options) <a id="cdk-ec2spot-provider-createautoscalinggroup"></a>

Create AutoScaling Group.

```ts
createAutoScalingGroup(id: string, options: AutoScalingGroupOptions): AutoScalingGroup
```

* **id** (<code>string</code>)  AutoScaling Group ID.
* **options** (<code>[AutoScalingGroupOptions](#cdk-ec2spot-autoscalinggroupoptions)</code>)  AutoScaling Group options.
  * **instanceProfile** (<code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>)  *No description* __*Optional*__
  * **instanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  *No description* __*Optional*__
  * **spotOptions** (<code>[SpotOptions](#cdk-ec2spot-spotoptions)</code>)  *No description* __*Optional*__
  * **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description* __*Optional*__
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The vpc for the AutoScalingGroup. 
  * **defaultCapacitySize** (<code>number</code>)  default capacity size for the Auto Scaling Group. __*Default*__: 1

__Returns__:
* <code>[AutoScalingGroup](#aws-cdk-aws-autoscaling-autoscalinggroup)</code>

#### createFleet(id, options) <a id="cdk-ec2spot-provider-createfleet"></a>

Create EC2 Spot Fleet.

```ts
createFleet(id: string, options: SpotFleetOptions): CfnSpotFleet
```

* **id** (<code>string</code>)  fleet id.
* **options** (<code>[SpotFleetOptions](#cdk-ec2spot-spotfleetoptions)</code>)  spot fleet options.
  * **instanceProfile** (<code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>)  *No description* __*Optional*__
  * **instanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  *No description* __*Optional*__
  * **spotOptions** (<code>[SpotOptions](#cdk-ec2spot-spotoptions)</code>)  *No description* __*Optional*__
  * **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description* __*Optional*__
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The vpc for the AutoScalingGroup. 
  * **defaultCapacitySize** (<code>number</code>)  default capacity size for the Auto Scaling Group. __*Default*__: 1
  * **terminateInstancesWithExpiration** (<code>boolean</code>)  Whether to terminate the fleet with expiration. __*Default*__: true
  * **validFrom** (<code>string</code>)  The timestamp of the beginning of the valid duration. __*Default*__: now
  * **validUntil** (<code>string</code>)  The timestamp of the beginning of the valid duration. __*Default*__: unlimited
  * **vpcSubnet** (<code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code>)  VPC subnet selection. __*Default*__: ec2.SubnetType.PRIVATE

__Returns__:
* <code>[CfnSpotFleet](#aws-cdk-aws-ec2-cfnspotfleet)</code>

#### createInstance(id, optons) <a id="cdk-ec2spot-provider-createinstance"></a>



```ts
createInstance(id: string, optons: SpotInstanceProps): SpotInstance
```

* **id** (<code>string</code>)  *No description*
* **optons** (<code>[SpotInstanceProps](#cdk-spot-one-spotinstanceprops)</code>)  *No description*
  * **additionalUserData** (<code>Array<string></code>)  Additional commands for user data. __*Default*__: no additional user data
  * **assignEip** (<code>boolean</code>)  Auto assign a new EIP on this instance if `eipAllocationId` is not defined. __*Default*__: true
  * **customAmiId** (<code>string</code>)  custom AMI ID. __*Default*__: The latest Amaozn Linux 2 AMI ID
  * **defaultInstanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  default EC2 instance type. __*Default*__: t3.large
  * **ebsVolumeSize** (<code>number</code>)  default EBS volume size for the spot instance. __*Default*__: 60;
  * **eipAllocationId** (<code>string</code>)  Allocation ID for your existing Elastic IP Address. __*Optional*__
  * **instanceInterruptionBehavior** (<code>[InstanceInterruptionBehavior](#cdk-spot-one-instanceinterruptionbehavior)</code>)  The behavior when a Spot Instance is interrupted. __*Default*__: InstanceInterruptionBehavior.TERMINATE
  * **instanceProfile** (<code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>)  instance profile for the resource. __*Default*__: create a new one
  * **instanceRole** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  IAM role for the spot instance. __*Optional*__
  * **keyName** (<code>string</code>)  SSH key name. __*Default*__: no ssh key will be assigned
  * **securityGroup** (<code>[SecurityGroup](#aws-cdk-aws-ec2-securitygroup)</code>)  Security group for the spot fleet. __*Default*__: allows TCP 22 SSH ingress rule
  * **targetCapacity** (<code>number</code>)  number of the target capacity. __*Default*__: 1
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  VPC for the spot fleet. __*Default*__: new VPC will be created
  * **vpcSubnet** (<code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code>)  VPC subnet for the spot fleet. __*Default*__: public subnet

__Returns__:
* <code>[SpotInstance](#cdk-spot-one-spotinstance)</code>

#### createInstanceProfile(id) <a id="cdk-ec2spot-provider-createinstanceprofile"></a>



```ts
createInstanceProfile(id: string): CfnInstanceProfile
```

* **id** (<code>string</code>)  *No description*

__Returns__:
* <code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>

#### createLaunchTemplate(id, options?) <a id="cdk-ec2spot-provider-createlaunchtemplate"></a>

Create Launch Template.

```ts
createLaunchTemplate(id: string, options?: LaunchTemplateOptions): CfnLaunchTemplate
```

* **id** (<code>string</code>)  launch template id.
* **options** (<code>[LaunchTemplateOptions](#cdk-ec2spot-launchtemplateoptions)</code>)  launch template options.
  * **instanceProfile** (<code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>)  *No description* __*Optional*__
  * **instanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  *No description* __*Optional*__
  * **spotOptions** (<code>[SpotOptions](#cdk-ec2spot-spotoptions)</code>)  *No description* __*Optional*__
  * **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description* __*Optional*__

__Returns__:
* <code>[CfnLaunchTemplate](#aws-cdk-aws-ec2-cfnlaunchtemplate)</code>

#### getOrCreateVpc(scope) <a id="cdk-ec2spot-provider-getorcreatevpc"></a>



```ts
getOrCreateVpc(scope: Construct): IVpc
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*

__Returns__:
* <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>



## struct AutoScalingGroupOptions  <a id="cdk-ec2spot-autoscalinggroupoptions"></a>






Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The vpc for the AutoScalingGroup.
**defaultCapacitySize**? | <code>number</code> | default capacity size for the Auto Scaling Group.<br/>__*Default*__: 1
**instanceProfile**? | <code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code> | __*Optional*__
**instanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | __*Optional*__
**machineImage**? | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | __*Optional*__
**spotOptions**? | <code>[SpotOptions](#cdk-ec2spot-spotoptions)</code> | __*Optional*__
**userData**? | <code>[UserData](#aws-cdk-aws-ec2-userdata)</code> | __*Optional*__



## struct LaunchTemplateOptions  <a id="cdk-ec2spot-launchtemplateoptions"></a>






Name | Type | Description 
-----|------|-------------
**instanceProfile**? | <code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code> | __*Optional*__
**instanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | __*Optional*__
**machineImage**? | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | __*Optional*__
**spotOptions**? | <code>[SpotOptions](#cdk-ec2spot-spotoptions)</code> | __*Optional*__
**userData**? | <code>[UserData](#aws-cdk-aws-ec2-userdata)</code> | __*Optional*__



## struct SpotFleetOptions  <a id="cdk-ec2spot-spotfleetoptions"></a>






Name | Type | Description 
-----|------|-------------
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The vpc for the AutoScalingGroup.
**defaultCapacitySize**? | <code>number</code> | default capacity size for the Auto Scaling Group.<br/>__*Default*__: 1
**instanceProfile**? | <code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code> | __*Optional*__
**instanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | __*Optional*__
**machineImage**? | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | __*Optional*__
**spotOptions**? | <code>[SpotOptions](#cdk-ec2spot-spotoptions)</code> | __*Optional*__
**terminateInstancesWithExpiration**? | <code>boolean</code> | Whether to terminate the fleet with expiration.<br/>__*Default*__: true
**userData**? | <code>[UserData](#aws-cdk-aws-ec2-userdata)</code> | __*Optional*__
**validFrom**? | <code>string</code> | The timestamp of the beginning of the valid duration.<br/>__*Default*__: now
**validUntil**? | <code>string</code> | The timestamp of the beginning of the valid duration.<br/>__*Default*__: unlimited
**vpcSubnet**? | <code>[SubnetSelection](#aws-cdk-aws-ec2-subnetselection)</code> | VPC subnet selection.<br/>__*Default*__: ec2.SubnetType.PRIVATE



## struct SpotOptions  <a id="cdk-ec2spot-spotoptions"></a>






Name | Type | Description 
-----|------|-------------
**blockDurationMinutes**? | <code>[BlockDurationMinutes](#cdk-ec2spot-blockdurationminutes)</code> | __*Optional*__
**instanceInterruptionBehavior**? | <code>[InstanceInterruptionBehavior](#cdk-ec2spot-instanceinterruptionbehavior)</code> | __*Optional*__
**maxPrice**? | <code>string</code> | __*Optional*__
**spotInstanceType**? | <code>[SpotInstanceType](#cdk-ec2spot-spotinstancetype)</code> | __*Optional*__
**validUntil**? | <code>string</code> | __*Optional*__



## enum BlockDurationMinutes  <a id="cdk-ec2spot-blockdurationminutes"></a>



Name | Description
-----|-----
**ONE_HOUR** |
**TWO_HOURS** |
**THREE_HOURS** |
**FOUR_HOURS** |
**FIVE_HOURS** |
**SIX_HOURS** |


## enum InstanceInterruptionBehavior  <a id="cdk-ec2spot-instanceinterruptionbehavior"></a>



Name | Description
-----|-----
**HIBERNATE** |
**STOP** |
**TERMINATE** |


## enum SpotInstanceType  <a id="cdk-ec2spot-spotinstancetype"></a>



Name | Description
-----|-----
**ONE_TIME** |
**PERSISTENT** |


