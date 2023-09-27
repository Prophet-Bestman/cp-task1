import { Checkbox, Form, Input } from "antd";

import { MultiChoiceIcon, PlusIcon } from "../assets/Icons";

const DropDown = () => {
  return (
    <>
      <Form.List
        name="choices"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error("At least 2 choices"));
              }
            },
          },
        ]}
      >
        {(fields, { add }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item style={{ margin: 0 }} required={false} key={field.key}>
                <div className="flex items-center w-full gap-2">
                  <MultiChoiceIcon />
                  <Form.Item
                    {...field}
                    style={{ width: "100%", marginTop: 20 }}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input choices or delete this field.",
                      },
                    ]}
                    //   noStyle
                  >
                    <Input placeholder="Type here" />
                  </Form.Item>

                  {fields.length - index === 1 && (
                    <div
                      onClick={() => add()}
                      className="scale-50 cursor-pointer"
                    >
                      <PlusIcon />
                    </div>
                  )}
                </div>
              </Form.Item>
            ))}
          </>
        )}
      </Form.List>
      <Form.Item className="mt-0 mb-10" name="other" valuePropName="checked">
        <Checkbox>Enable “Other” option</Checkbox>
      </Form.Item>
    </>
  );
};

export default DropDown;
