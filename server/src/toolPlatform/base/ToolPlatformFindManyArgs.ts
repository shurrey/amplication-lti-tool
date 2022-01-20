import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ToolPlatformWhereInput } from "./ToolPlatformWhereInput";
import { Type } from "class-transformer";
import { ToolPlatformOrderByInput } from "./ToolPlatformOrderByInput";

@ArgsType()
class ToolPlatformFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ToolPlatformWhereInput,
  })
  @Field(() => ToolPlatformWhereInput, { nullable: true })
  @Type(() => ToolPlatformWhereInput)
  where?: ToolPlatformWhereInput;

  @ApiProperty({
    required: false,
    type: ToolPlatformOrderByInput,
  })
  @Field(() => ToolPlatformOrderByInput, { nullable: true })
  @Type(() => ToolPlatformOrderByInput)
  orderBy?: ToolPlatformOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ToolPlatformFindManyArgs };
