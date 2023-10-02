import {CfnOutput, Stage, StageProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CdkWorkshop2023Stack} from "./cdk-workshop-2023-stack";

export class WorkshopPipelineStage extends Stage {
    public readonly hcViewerUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);

        const service = new CdkWorkshop2023Stack(this, "WebService");

        this.hcEndpoint = service.hcEndpoint;
        this.hcViewerUrl = service.hcViewerUrl;
    }
}
