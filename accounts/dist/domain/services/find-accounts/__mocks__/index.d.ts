declare const accountFieldsMock: ({
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        min: number;
        max: number;
        positive?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
        optional?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        positive: boolean;
        min?: undefined;
        max?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
        optional?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    dateType: string;
    restrictions: {
        type: string;
        convert: boolean;
        min?: undefined;
        max?: undefined;
        positive?: undefined;
        values?: undefined;
        items?: undefined;
        optional?: undefined;
    };
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    dateType: string;
    isNotSchema: boolean;
    restrictions: {
        type: string;
        convert: boolean;
        min?: undefined;
        max?: undefined;
        positive?: undefined;
        values?: undefined;
        items?: undefined;
        optional?: undefined;
    };
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        values: string[];
        min?: undefined;
        max?: undefined;
        positive?: undefined;
        convert?: undefined;
        items?: undefined;
        optional?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        min?: undefined;
        max?: undefined;
        positive?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
        optional?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        items: string;
        optional: boolean;
        min?: undefined;
        max?: undefined;
        positive?: undefined;
        convert?: undefined;
        values?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
})[];
export { accountFieldsMock };
