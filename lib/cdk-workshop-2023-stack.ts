import {CfnOutput, Stack, StackProps} from "aws-cdk-lib";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";
import {LambdaRestApi} from "aws-cdk-lib/aws-apigateway";
import {HitCounter} from "./hitcounter";
import {TableViewer} from "cdk-dynamo-table-viewer";

export class CdkWorkshop2023Stack extends Stack {
    // ADD THIS
    public readonly hcViewerUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // defines an AWS Lambda resource
        const hello = new Function(this, "HelloHandler", {
            runtime: Runtime.NODEJS_16_X, // execution environment
            code: Code.fromAsset("lambda"), // code loaded from "lambda" directory
            handler: "hello.handler", // file is "hello", function is "handler"
        });

        const helloWithCounter = new HitCounter(this, "HelloHitCounter", {
            downstream: hello,
        });

        // defines an API Gateway REST API resource backed by our "hello" function.
        const gateway = new LambdaRestApi(this, "Endpoint", {
            handler: helloWithCounter.handler,
        });

        const tv = new TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table
        });

        // ADD THIS
        this.hcEndpoint = new CfnOutput(this, "GatewayUrl", {
            value: gateway.url,
        });

        this.hcViewerUrl = new CfnOutput(this, "TableViewerUrl", {
            value: tv.endpoint,
        });
    }
}
