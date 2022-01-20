import * as React from "react";
import { List, Datagrid, ListProps, TextField, DateField } from "react-admin";
import Pagination from "../Components/Pagination";

export const ToolPlatformList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Tool Platforms"}
      perPage={50}
      pagination={<Pagination />}
    >
      <Datagrid rowClick="show">
        <TextField label="Client Id" source="clientId" />
        <TextField label="Contact Email" source="contactEmail" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="Deployment Id" source="deploymentId" />
        <TextField label="Description" source="description" />
        <TextField label="Guid" source="guid" />
        <TextField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <TextField label="Product Family Code" source="productFamilyCode" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField label="URL" source="url" />
        <TextField label="Version" source="version" />
      </Datagrid>
    </List>
  );
};
