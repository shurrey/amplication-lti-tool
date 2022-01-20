import { ArgsType, Field } from "@nestjs/graphql";
import { ToolPlatformWhereUniqueInput } from "./ToolPlatformWhereUniqueInput";

@ArgsType()
class DeleteToolPlatformArgs {
  @Field(() => ToolPlatformWhereUniqueInput, { nullable: false })
  where!: ToolPlatformWhereUniqueInput;
}

export { DeleteToolPlatformArgs };
