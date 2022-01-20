import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type ToolPlatformWhereInput = {
  clientId?: StringFilter;
  contactEmail?: StringNullableFilter;
  deploymentId?: StringFilter;
  description?: StringNullableFilter;
  guid?: StringFilter;
  id?: StringFilter;
  name?: StringNullableFilter;
  productFamilyCode?: StringNullableFilter;
  url?: StringNullableFilter;
  version?: StringNullableFilter;
};
