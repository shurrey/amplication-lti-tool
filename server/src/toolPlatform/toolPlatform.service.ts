import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { ToolPlatformServiceBase } from "./base/toolPlatform.service.base";

@Injectable()
export class ToolPlatformService extends ToolPlatformServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
