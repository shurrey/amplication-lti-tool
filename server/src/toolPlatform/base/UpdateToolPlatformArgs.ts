import { ArgsType, Field } from "@nestjs/graphql";
import { ToolPlatformWhereUniqueInput } from "./ToolPlatformWhereUniqueInput";
import { ToolPlatformUpdateInput } from "./ToolPlatformUpdateInput";

@ArgsType()
class UpdateToolPlatformArgs {
  @Field(() => ToolPlatformWhereUniqueInput, { nullable: false })
  where!: ToolPlatformWhereUniqueInput;
  @Field(() => ToolPlatformUpdateInput, { nullable: false })
  data!: ToolPlatformUpdateInput;
}

export { UpdateToolPlatformArgs };
