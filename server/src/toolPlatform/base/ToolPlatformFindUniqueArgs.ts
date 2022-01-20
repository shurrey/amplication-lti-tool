import { ArgsType, Field } from "@nestjs/graphql";
import { ToolPlatformWhereUniqueInput } from "./ToolPlatformWhereUniqueInput";

@ArgsType()
class ToolPlatformFindUniqueArgs {
  @Field(() => ToolPlatformWhereUniqueInput, { nullable: false })
  where!: ToolPlatformWhereUniqueInput;
}

export { ToolPlatformFindUniqueArgs };
