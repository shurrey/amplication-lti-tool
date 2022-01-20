import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ToolPlatformService } from "./toolPlatform.service";
import { ToolPlatformControllerBase } from "./base/toolPlatform.controller.base";

@swagger.ApiTags("tool-platforms")
@common.Controller("tool-platforms")
export class ToolPlatformController extends ToolPlatformControllerBase {
  constructor(
    protected readonly service: ToolPlatformService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
