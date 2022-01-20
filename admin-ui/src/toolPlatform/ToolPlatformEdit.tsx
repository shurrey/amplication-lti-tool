import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ToolPlatformEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Client Id" source="clientId" />
        <TextInput label="Contact Email" source="contactEmail" type="email" />
        <TextInput label="Deployment Id" source="deploymentId" />
        <TextInput label="Description" multiline source="description" />
        <TextInput label="Guid" source="guid" />
        <TextInput label="Name" source="name" />
        <TextInput label="Product Family Code" source="productFamilyCode" />
        <TextInput label="URL" source="url" />
        <TextInput label="Version" source="version" />
      </SimpleForm>
    </Edit>
  );
};
