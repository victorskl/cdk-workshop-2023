# cdk-workshop-2023

From AWS CDK Immersion Day Workshop

## Notes

- For CodeCommit, need to create an IAM User with `AWSCodeCommitFullAccess` policy 
- For CodeBuild, need to bring CodeBuild environment to `buildImage: LinuxBuildImage.STANDARD_6_0`
- Hotswap: `cdk deploy --hotswap` or `cdk watch`

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
