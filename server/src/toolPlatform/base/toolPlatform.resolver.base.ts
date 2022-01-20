import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateToolPlatformArgs } from "./CreateToolPlatformArgs";
import { UpdateToolPlatformArgs } from "./UpdateToolPlatformArgs";
import { DeleteToolPlatformArgs } from "./DeleteToolPlatformArgs";
import { ToolPlatformFindManyArgs } from "./ToolPlatformFindManyArgs";
import { ToolPlatformFindUniqueArgs } from "./ToolPlatformFindUniqueArgs";
import { ToolPlatform } from "./ToolPlatform";
import { ToolPlatformService } from "../toolPlatform.service";

@graphql.Resolver(() => ToolPlatform)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ToolPlatformResolverBase {
  constructor(
    protected readonly service: ToolPlatformService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "read",
    possession: "any",
  })
  async _toolPlatformsMeta(
    @graphql.Args() args: ToolPlatformFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [ToolPlatform])
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "read",
    possession: "any",
  })
  async toolPlatforms(
    @graphql.Args() args: ToolPlatformFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "ToolPlatform",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => ToolPlatform, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "read",
    possession: "own",
  })
  async toolPlatform(
    @graphql.Args() args: ToolPlatformFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "ToolPlatform",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => ToolPlatform)
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "create",
    possession: "any",
  })
  async createToolPlatform(
    @graphql.Args() args: CreateToolPlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "ToolPlatform",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"ToolPlatform"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => ToolPlatform)
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "update",
    possession: "any",
  })
  async updateToolPlatform(
    @graphql.Args() args: UpdateToolPlatformArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<ToolPlatform | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "ToolPlatform",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"ToolPlatform"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => ToolPlatform)
  @nestAccessControl.UseRoles({
    resource: "ToolPlatform",
    action: "delete",
    possession: "any",
  })
  async deleteToolPlatform(
    @graphql.Args() args: DeleteToolPlatformArgs
  ): Promise<ToolPlatform | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
