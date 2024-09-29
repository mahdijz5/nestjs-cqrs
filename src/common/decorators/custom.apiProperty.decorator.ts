import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, IsDateString, IsMongoId, IsArray, isUUID } from "class-validator";

export const ApiCustomeProperty = (data: { valueType?: "string" | "number" | "boolean" | 'undefined' | 'date' | "objectId" | "uuid" | "array", required?: boolean, example?: any, desc?: string, trim?: boolean } = {}) => {
  const { desc = "create", example = "example", required = true, valueType } = data
  return function (target: any, key: string) {
    ApiProperty({
      description: desc,
      required,
      example: example,
      uniqueItems: true,
    })(target, key);

    if(data.trim) {
      Transform(({ value }: TransformFnParams) => value?.trim())(target, key);
    }

    if (valueType) {
      switch (valueType) {
        case 'string':
          IsString()(target, key);
          break;
        case 'number':
          IsNumber()(target, key);
          break;
        case 'boolean':
          IsBoolean()(target, key);
          break;
        case 'date':
          IsDateString()(target, key);
          break;
        case 'objectId':
          IsMongoId()(target, key);
          break;
        case 'uuid':
          IsUUID()(target, key);
          break;
        case 'array':
          IsArray()(target, key);
          break;
        case 'undefined':
          break;

      }
    } else {
      switch (typeof example) {
        case 'string':
          IsString()(target, key);
          break;
        case 'number':
          IsNumber()(target, key);
          break;
        case 'boolean':
          IsBoolean()(target, key);
          break;
        case 'undefined':
          break;

      }
    }

    if (required) {
      IsNotEmpty()(target, key);
    } else {
      IsOptional()(target, key);
    }
  };
}