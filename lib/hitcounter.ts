import {AttributeType, Table, TableEncryption} from "aws-cdk-lib/aws-dynamodb";
import {Code, Function, IFunction, Runtime} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";

export interface HitCounterProps {
    /** the function for which we want to count url hits **/
    downstream: IFunction;
    /**
     * The read capacity units for the table
     *
     * Must be greater than 5 and lower than 20
     *
     * @default 5
     */
    readCapacity?: number;
}

export class HitCounter extends Construct {
    /** allows accessing the counter function */
    public readonly handler: Function;

    /** allows accessing the hit counter table */
    public readonly table: Table;

    constructor(scope: Construct, id: string, props: HitCounterProps) {

        if (props.readCapacity !== undefined && (props.readCapacity < 5 || props.readCapacity > 20)) {
            throw new Error("readCapacity must be greater than 5 and less than 20");
        }

        super(scope, id);

        // const table = new Table(this, "Hits", {
        //     partitionKey: {name: "path", type: AttributeType.STRING},
        // });

        this.table = new Table(this, "Hits", {
            partitionKey: { name: "path", type: AttributeType.STRING },
            encryption: TableEncryption.AWS_MANAGED,
            readCapacity: props.readCapacity ?? 5,
        });

        this.handler = new Function(this, "HitCounterHandler", {
            runtime: Runtime.NODEJS_16_X,
            handler: "hitcounter.handler",
            code: Code.fromAsset("lambda"),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName,
            },
        });

        // grant the lambda role read/write permissions to our table
        this.table.grantReadWriteData(this.handler);

        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
