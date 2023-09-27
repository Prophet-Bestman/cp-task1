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

  const onFinish = (data: IAddedQuestion) => {
    const payload = shapeObjectToQuestionObject({
      ...data,
      id: defaultValue.id,
      key: defaultValue.key,
      maxChoice: Number.parseInt(`${data.maxChoice}`) || 0,
      other: !!data.other,
    });

    if (type === "Personal Info") {
      updatePeronsalQuestionList(payload, "edit");
    } else if (type === "Profile") {
      updateProfileQuestionList(payload, "edit");
    } else {
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
        name={defaultValue.key}
        id={generateRandomId()}
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
              { value: "ShortAnswer", label: "Short Answer" },
              { value: "Dropdown", label: "Dropdown" },
              { value: "YesNo", label: "Yes/No" },
              { value: "MultipleChoice", label: "Multiple Choice" },
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

        {selectedType === "MultipleChoice" && <MultiChoice />}
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
