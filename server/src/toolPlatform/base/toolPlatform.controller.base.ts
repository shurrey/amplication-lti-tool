import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ToolPlatformService } from "../toolPlatform.service";
import { ToolPlatformCreateInput } from "./ToolPlatformCreateInput";
import { ToolPlatformWhereInput } from "./ToolPlatformWhereInput";
import { ToolPlatformWhereUniqueInput } from "./ToolPlatformWhereUniqueInput";
import { ToolPlatformFindManyArgs } from "./ToolPlatformFindManyArgs";
import { ToolPlatformUpdateInput } from "./ToolPlatformUpdateInput";
import { ToolPlatform } from "./ToolPlatform";
@swagger.ApiBearerAuth()
export class ToolPlatformControllerBase {
  constructor(
    protected readonly service: ToolPlatformService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: ToolPlatform })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: ToolPlatformCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ToolPlatform",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ToolPlatform"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        clientId: true,
        contactEmail: true,
        createdAt: true,
        deploymentId: true,
        description: true,
        guid: true,
        id: true,
        name: true,
        productFamilyCode: true,
        updatedAt: true,
        url: true,
        version: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [ToolPlatform] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => ToolPlatformFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform[]> {
    const args = plainToClass(ToolPlatformFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ToolPlatform",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        clientId: true,
        contactEmail: true,
        createdAt: true,
        deploymentId: true,
        description: true,
        guid: true,
        id: true,
        name: true,
        productFamilyCode: true,
        updatedAt: true,
        url: true,
        version: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: ToolPlatform })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: ToolPlatformWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ToolPlatform",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        clientId: true,
        contactEmail: true,
        createdAt: true,
        deploymentId: true,
        description: true,
        guid: true,
        id: true,
        name: true,
        productFamilyCode: true,
        updatedAt: true,
        url: true,
        version: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ToolPlatform })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: ToolPlatformWhereUniqueInput,
    @common.Body()
    data: ToolPlatformUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ToolPlatform",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"ToolPlatform"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          clientId: true,
          contactEmail: true,
          createdAt: true,
          deploymentId: true,
          description: true,
          guid: true,
          id: true,
          name: true,
          productFamilyCode: true,
          updatedAt: true,
          url: true,
          version: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: ToolPlatform })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: ToolPlatformWhereUniqueInput
  ): Promise<ToolPlatform | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          clientId: true,
          contactEmail: true,
          createdAt: true,
          deploymentId: true,
          description: true,
          guid: true,
          id: true,
          name: true,
          productFamilyCode: true,
          updatedAt: true,
          url: true,
          version: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
