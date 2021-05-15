const { Automation } = require('projen-automate-it');
const { AwsCdkConstructLibrary } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  description: 'CDK construct library for EC2 Spot',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.73.0',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  name: 'cdk-ec2spot',
  repositoryUrl: 'https://github.com/pahud/cdk-ec2spot.git',
  dependabot: false,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-autoscaling',
  ],
  deps: [
    'cdk-spot-one',
    'projen-automate-it',
  ],
  peerDeps: [
    'cdk-spot-one',
  ],
  bundledDeps: [
    'projen-automate-it',
  ],
  publishToPypi: {
    distName: 'cdk-ec2spot',
    module: 'cdk_ec2spot',
  },
  releaseBranches: ['main'],
  defaultReleaseBranch: ['main'],
});

const automation = new Automation(project, {
  automationToken: AUTOMATION_TOKEN,
});
automation.autoApprove();
automation.autoMerge();
automation.projenYarnUpgrade();

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
