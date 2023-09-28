import { Checkbox, Switch } from "antd";
import { useFormState } from "../contexts/FormProvider";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  fieldName:
    | "firstName"
    | "lastName"
    | "emailId"
    | "phoneNumber"
    | "nationality"
    | "currentResidence"
    | "idNumber"
    | "dateOfBirth"
    | "gender";
  isEditable?: boolean;
}

const PersonalInfoItem = ({ title, fieldName, isEditable }: Props) => {
  const { updatePersonalInfo, formState } = useFormState();

  return (
    <div className="pb-6 border-b border-[#C4C4C4] flex items-center justify-between">
      <div className="font-semibold text-[20px]">{title}</div>

      {isEditable && (
        <div className="flex items-center gap-8">
          <Checkbox
            defaultChecked={
              formState?.personalInformation[fieldName].internalUse
            }
            onChange={(e) =>
              updatePersonalInfo(fieldName, "internalUse", e.target.checked)
            }
          >
            <p className="text-[15px]">Internal</p>
          </Checkbox>

          <div className="flex items-center text-[15px] gap-2">
            <Switch
              defaultChecked={formState?.personalInformation[fieldName].show}
              onChange={(e) => {
                updatePersonalInfo(fieldName, "show", e);
              }}
            />
            {formState?.personalInformation[fieldName].show ? "Show" : "Hide"}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoItem;
