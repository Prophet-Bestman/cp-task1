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

  const onFinish = (data: any) => {
    const payload = shapeObjectToQuestionObject({
      id: generateRandomId(10),
      ...data,
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
          id={generateRandomId(10)}
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
                { value: "Short Answer", label: "Short Answer" },
                { value: "Dropdown", label: "Dropdown" },
                { value: "Yes/No", label: "Yes/No" },
                { value: "Multiple Choice", label: "Multiple Choice" },
                // { value: "Number", label: "Number" },
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
