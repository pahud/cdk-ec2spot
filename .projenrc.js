const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  author: 'Pahud',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.73.0',
  jsiiFqn: "projen.AwsCdkConstructLibrary",
  name: 'cdk-ec2spot',
  repositoryUrl: 'https://github.com/pahudnet/cdk-ec2spot.git',
});

project.synth();
