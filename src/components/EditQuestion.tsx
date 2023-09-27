import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";

import { CloseIcon } from "../assets/Icons";
import MultiChoice from "./MultiChoice";
import DropDown from "./Dropdown";
import { generateRandomId, shapeObjectToQuestionObject } from "../utils";
import { useFormState } from "../contexts/FormProvider";

interface EditQuestionProps {
  defaultValue: IAddedQuestion;
  setEditing: (arg: boolean) => void;
  type: QuestionTypes;
}

const EditQuestion = ({
  defaultValue,
  setEditing,
  type,
}: EditQuestionProps) => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    defaultValue?.type
  );
  const {
    updatePeronsalQuestionList,
    updateProfileQuestionList,
    updateCustomQuestionList,
  } = useFormState();

  const [form] = Form.useForm();

  const onFinish = (data: any) => {
    const payload = shapeObjectToQuestionObject({
      id: defaultValue.id,
      ...data,
    });

    if (type === "Personal Info") {
      updatePeronsalQuestionList(payload, "edit");
    } else if (type === "Profile") {
      updateProfileQuestionList(payload, "edit");
    } else {
      console.log("EDITING....");
      updateCustomQuestionList(payload, "edit");
    }

    setEditing(false);
    form.resetFields();
  };

  const handleDelete = () => {
    if (type === "Personal Info") {
      updatePeronsalQuestionList(defaultValue, "delete");
    } else if (type === "Profile") {
      updateProfileQuestionList(defaultValue, "delete");
    } else updateCustomQuestionList(defaultValue, "delete");
  };

  return (
    <div className="pt-8">
      <Form
        form={form}
        name={defaultValue.id}
        id={generateRandomId(10)}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={defaultValue}
      >
        <Form.Item
          label={<div className="text-[20px] font-semibold">Type</div>}
          name="type"
          id=""
          rules={[
            {
              required: true,
              message: "Please select a type",
            },
          ]}
        >
          <Select
            onChange={(e) => setSelectedType(e)}
            placeholder="Select Type"
            options={[
              { value: "Paragraph", label: "Paragraph" },
              { value: "Short Answer", label: "Short Answer" },
              { value: "Dropdown", label: "Dropdown" },
              { value: "Yes/No", label: "Yes/No" },
              { value: "Multiple Choice", label: "Multiple Choice" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<div className="text-[20px] font-semibold">Question</div>}
          name="question"
          rules={[
            {
              required: true,
              message: "Please input your question!",
            },
          ]}
        >
          <Input disabled={!selectedType} style={{ width: "100%" }} />
        </Form.Item>

        {selectedType === "Multiple Choice" && <MultiChoice />}
        {selectedType === "Dropdown" && <DropDown />}
        {selectedType === "disqualify" && (
          <Form.Item
            className="mt-0 mb-10"
            name="other"
            valuePropName="checked"
          >
            <Checkbox>Disqualify candidate if the answer is no</Checkbox>
          </Form.Item>
        )}

        <div className="flex items-center justify-between">
          <div
            onClick={handleDelete}
            className="text-[#A80000] font-semibold text-sm flex items-center cursor-pointer"
          >
            <CloseIcon />
            Delete question
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default EditQuestion;
