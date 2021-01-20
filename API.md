# API Reference

**Classes**

Name|Description
----|-----------
[Provider](#cdk-ec2spot-provider)|*No description*


**Structs**

Name|Description
----|-----------
[AutoScalingGroupOptions](#cdk-ec2spot-autoscalinggroupoptions)|*No description*
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



```ts
createAutoScalingGroup(id: string, options: AutoScalingGroupOptions): AutoScalingGroup
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[AutoScalingGroupOptions](#cdk-ec2spot-autoscalinggroupoptions)</code>)  *No description*
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The vpc for the AutoScalingGroup. 
  * **defaultCapacitySize** (<code>number</code>)  default capacity size for the Auto Scaling Group. __*Default*__: 1
  * **instanceProfile** (<code>[CfnInstanceProfile](#aws-cdk-aws-iam-cfninstanceprofile)</code>)  *No description* __*Optional*__
  * **instanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  *No description* __*Optional*__
  * **spotOptions** (<code>[SpotOptions](#cdk-ec2spot-spotoptions)</code>)  *No description* __*Optional*__
  * **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description* __*Optional*__

__Returns__:
* <code>[AutoScalingGroup](#aws-cdk-aws-autoscaling-autoscalinggroup)</code>

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


