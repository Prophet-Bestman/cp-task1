import { Checkbox, Switch } from "antd";
import { useFormState } from "../contexts/FormProvider";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  fieldName: "education" | "experience" | "resume";
}

const ProfileInfoItem = ({ title, fieldName }: Props) => {
  const { updatePersonalInfo, formState } = useFormState();

  return (
    <div className="pb-6 border-b border-[#C4C4C4] flex items-center justify-between">
      <div className="font-semibold text-[20px]">{title}</div>

      <div className="flex items-center gap-8">
        <Checkbox
          //  @ts-ignore
          value={formState?.profile[fieldName].mandatory}
          onChange={(e) =>
            updatePersonalInfo(fieldName, "internalUse", e.target.checked)
          }
        >
          <p className="text-[15px]">Mandatory</p>
        </Checkbox>

        <div className="flex items-center text-[15px] gap-2">
          <Switch
            //  @ts-ignore
            value={formState?.profile[fieldName].show}
            onChange={(e) => {
              updatePersonalInfo(fieldName, "show", !e);
            }}
          />
          Hide
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoItem;
