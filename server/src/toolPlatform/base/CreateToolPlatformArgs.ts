import { ArgsType, Field } from "@nestjs/graphql";
import { ToolPlatformCreateInput } from "./ToolPlatformCreateInput";

@ArgsType()
class CreateToolPlatformArgs {
  @Field(() => ToolPlatformCreateInput, { nullable: false })
  data!: ToolPlatformCreateInput;
}

export { CreateToolPlatformArgs };
