import * as React from "react";
import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
} from "react-admin";

export const ToolPlatformShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
