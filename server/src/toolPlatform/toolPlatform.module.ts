import { Module } from "@nestjs/common";
import { ToolPlatformModuleBase } from "./base/toolPlatform.module.base";
import { ToolPlatformService } from "./toolPlatform.service";
import { ToolPlatformController } from "./toolPlatform.controller";
import { ToolPlatformResolver } from "./toolPlatform.resolver";

@Module({
  imports: [ToolPlatformModuleBase],
  controllers: [ToolPlatformController],
  providers: [ToolPlatformService, ToolPlatformResolver],
  exports: [ToolPlatformService],
})
export class ToolPlatformModule {}
