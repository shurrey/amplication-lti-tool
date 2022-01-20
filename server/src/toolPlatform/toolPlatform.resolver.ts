import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ToolPlatformResolverBase } from "./base/toolPlatform.resolver.base";
import { ToolPlatform } from "./base/ToolPlatform";
import { ToolPlatformService } from "./toolPlatform.service";

@graphql.Resolver(() => ToolPlatform)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ToolPlatformResolver extends ToolPlatformResolverBase {
  constructor(
    protected readonly service: ToolPlatformService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
