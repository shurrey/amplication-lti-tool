import { ToolPlatform as TToolPlatform } from "../api/toolPlatform/ToolPlatform";

export const TOOLPLATFORM_TITLE_FIELD = "name";

export const ToolPlatformTitle = (record: TToolPlatform): string => {
  return record.name || record.id;
};
