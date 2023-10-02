#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshop2023Stack } from '../lib/cdk-workshop-2023-stack';

const app = new cdk.App();
new CdkWorkshop2023Stack(app, 'CdkWorkshop2023Stack');
