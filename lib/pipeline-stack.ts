import {Stack, StackProps} from "aws-cdk-lib";
import {Repository} from "aws-cdk-lib/aws-codecommit";
import {Construct} from "constructs";
import {CodeBuildStep, CodePipeline, CodePipelineSource} from "aws-cdk-lib/pipelines";

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Creates a CodeCommit repository called 'WorkshopRepo'
        const repo = new Repository(this, "WorkshopRepo", {
            repositoryName: "WorkshopRepo",
        });

        // The basic pipeline declaration. This sets the initial structure
        // of our pipeline
        const pipeline = new CodePipeline(this, "Pipeline", {
            pipelineName: "WorkshopPipeline",
            synth: new CodeBuildStep("SynthStep", {
                input: CodePipelineSource.codeCommit(repo, "main"),
                // installCommands: ["npm i -g npm@latest"],
                commands: ["node -v", "npm -v", "npm ci", "npm run build", "npx cdk synth"],
            }),
        });
    }
}
