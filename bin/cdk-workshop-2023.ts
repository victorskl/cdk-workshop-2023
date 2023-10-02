#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshop2023Stack } from '../lib/cdk-workshop-2023-stack';
import { WorkshopPipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();

// cdk destroy
// and replace this with the following CDK Pipeline construct
// new CdkWorkshop2023Stack(app, 'CdkWorkshop2023Stack');

// CDK Pipeline
new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
