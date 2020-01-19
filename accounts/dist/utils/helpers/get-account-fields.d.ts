declare const getAccountFields: () => ({
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        positive: boolean;
        min?: undefined;
        max?: undefined;
        optional?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        min: number;
        max: number;
        positive?: undefined;
        optional?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        max: number;
        optional: boolean;
        positive?: undefined;
        min?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
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
        positive?: undefined;
        min?: undefined;
        max?: undefined;
        optional?: undefined;
        values?: undefined;
        items?: undefined;
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
        positive?: undefined;
        min?: undefined;
        max?: undefined;
        optional?: undefined;
        values?: undefined;
        items?: undefined;
    };
} | {
    parameter: string;
    name: string;
    description: string;
    dateType: string;
    restrictions: {
        type: string;
        optional: boolean;
        min: number;
        positive?: undefined;
        max?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
    };
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        values: string[];
        positive?: undefined;
        min?: undefined;
        max?: undefined;
        optional?: undefined;
        convert?: undefined;
        items?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
} | {
    parameter: string;
    name: string;
    description: string;
    restrictions: {
        type: string;
        positive?: undefined;
        min?: undefined;
        max?: undefined;
        optional?: undefined;
        convert?: undefined;
        values?: undefined;
        items?: undefined;
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
        positive?: undefined;
        min?: undefined;
        max?: undefined;
        convert?: undefined;
        values?: undefined;
    };
    dateType?: undefined;
    isNotSchema?: undefined;
})[];
export default getAccountFields;
