import {Stage, StageProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CdkWorkshop2023Stack} from "./cdk-workshop-2023-stack";

export class WorkshopPipelineStage extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new CdkWorkshop2023Stack(this, "WebService");
    }

}
