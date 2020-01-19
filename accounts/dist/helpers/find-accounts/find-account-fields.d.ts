import { FieldTypes } from '../../types';
declare const findAccountFields: ({
    parameter: string;
    name: string;
    type: FieldTypes;
    dateType?: undefined;
} | {
    parameter: string;
    name: string;
    dateType: FieldTypes;
    type: FieldTypes;
})[];
export default findAccountFields;
