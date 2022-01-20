import { PrismaService } from "nestjs-prisma";
import { Prisma, ToolPlatform } from "@prisma/client";

export class ToolPlatformServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ToolPlatformFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformFindManyArgs>
  ): Promise<number> {
    return this.prisma.toolPlatform.count(args);
  }

  async findMany<T extends Prisma.ToolPlatformFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformFindManyArgs>
  ): Promise<ToolPlatform[]> {
    return this.prisma.toolPlatform.findMany(args);
  }
  async findOne<T extends Prisma.ToolPlatformFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformFindUniqueArgs>
  ): Promise<ToolPlatform | null> {
    return this.prisma.toolPlatform.findUnique(args);
  }
  async create<T extends Prisma.ToolPlatformCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformCreateArgs>
  ): Promise<ToolPlatform> {
    return this.prisma.toolPlatform.create<T>(args);
  }
  async update<T extends Prisma.ToolPlatformUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformUpdateArgs>
  ): Promise<ToolPlatform> {
    return this.prisma.toolPlatform.update<T>(args);
  }
  async delete<T extends Prisma.ToolPlatformDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ToolPlatformDeleteArgs>
  ): Promise<ToolPlatform> {
    return this.prisma.toolPlatform.delete(args);
  }
}
