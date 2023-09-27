import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState } from "react";

import { CloseIcon, PlusIcon } from "../assets/Icons";
import MultiChoice from "./MultiChoice";
import DropDown from "./Dropdown";
import { generateRandomId, shapeObjectToQuestionObject } from "../utils";
import { useFormState } from "../contexts/FormProvider";

const AddQuestion = ({ type }: { type: QuestionTypes }) => {
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const {
    appendToPersonalQuestions,
    appendToProfileQuestions,
    appendToCustomQuestions,
  } = useFormState();
  const [showQuestion, setShowQuestion] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (data: IAddedQuestion) => {
    const payload = shapeObjectToQuestionObject({
      ...data,
      key: generateRandomId(),
      id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      maxChoice: Number.parseInt(`${data.maxChoice}`) || 0,
      other: !!data.other,
    });

    if (type === "Personal Info") {
      appendToPersonalQuestions(payload);
    } else if (type === "Profile") {
      appendToProfileQuestions(payload);
    } else appendToCustomQuestions(payload);

    form.resetFields();
  };

  return (
    <div className="pt-5">
      {showQuestion && (
        <Form
          form={form}
          name="add question"
          id={generateRandomId()}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ choices: [""] }}
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
              onClick={() => setShowQuestion(false)}
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
      )}
      {!showQuestion && (
        <div
          onClick={() => setShowQuestion(true)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <PlusIcon />
          Add a question
        </div>
      )}
    </div>
  );
};

export default AddQuestion;
