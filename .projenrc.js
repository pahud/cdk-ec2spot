const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  description: 'CDK construct library for EC2 Spot',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.73.0',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'cdk-ec2spot',
  repositoryUrl: 'https://github.com/pahud/cdk-ec2spot.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-autoscaling',
  ],
  autoApproveOptions: {
    secret: 'PROJEN_GITHUB_TOKEN',
  },
  deps: [
    'cdk-spot-one',
  ],
  peerDeps: [
    'cdk-spot-one',
  ],
  publishToPypi: {
    distName: 'cdk-ec2spot',
    module: 'cdk_ec2spot',
  },
  defaultReleaseBranch: 'main',
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
