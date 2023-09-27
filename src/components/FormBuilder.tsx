import { Button, Upload, UploadProps, message } from "antd";
import { useState } from "react";

import { CloseIcon } from "../assets/Icons";
import PersonalInformationForm from "./PersonalInformationForm";
import ProfileInformationForm from "./ProfileInformtionForm";
import AdditionalQuestions from "./AdditionalQuestions";
import { useFormState } from "../contexts/FormProvider";
import upload from "../assets/upload.svg";
import { generateRandomId } from "../utils";

const { Dragger } = Upload;

const dummyRequest = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const apiUrl =
  "http://127.0.0.1:4010/api/583.9696999584548/programs/dolore/application-form";

const FormBuilder = () => {
  const [coverImage, setCoverImage] = useState<any>();
  const { formState } = useFormState();

  console.log("RENDER");

  const handleSubmit = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const payload: any = JSON.stringify({
      data: {
        id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        type: "applicationForm",
        attributes: formState,
      },
    });

    fetch(apiUrl, {
      method: "PUT",
      headers: headers,
      body: payload,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((responseData) => {
        console.log("Response Data:", responseData);
        message.success("Successfully updated data");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;

      console.log(info.file.size);

      if (!!info?.file?.size && info?.file.size < 1024000) {
        if (status === "done" && info.file.originFileObj) {
          setCoverImage(URL.createObjectURL(info.file.originFileObj));
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      } else {
        console.log("ERROR....!!!!");
        message.error({
          content: `Max file size is 1MB`,
          key: generateRandomId(),
        });
      }
    },
  };
  return (
    <div className="p-8 w-[595px] ">
      <div
        style={{
          boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
        }}
        className=" bg-white  rounded-[20px]"
      >
        {coverImage ? (
          <div className="">
            <img
              src={coverImage}
              className="object-cover rounded-t-[20px] w-full h-[400px]"
              alt=""
            />

            <div className="px-6 pb-5 pt-7">
              <div
                className="text-[#A80000] font-semibold text-sm flex items-center cursor-pointer"
                onClick={() => setCoverImage("")}
              >
                <CloseIcon />
                Delete & re-upload
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-[#D0F7FA] px-8 pt-7 pb-6 rounded-t-[20px] ">
              <h2 className="text-[25px] font-semibold">Upload cover image</h2>
            </div>
            <div className="px-10 pt-16 pb-[57px]">
              <Dragger
                showUploadList={false}
                customRequest={dummyRequest}
                style={{
                  background: "white",
                }}
                {...props}
                accept="image/*"
              >
                <div className="flex justify-center mb-2">
                  {/* <InboxOutlined /> */}
                  <img src={upload} alt="" />
                </div>
                <p className="font-semibold ant-upload-text">
                  Upload cover image
                </p>
                <p className="ant-upload-hint text-[Upload cover image]">
                  16:9 ratio is recommended. Max image size 1mb
                </p>
              </Dragger>
            </div>
          </>
        )}
      </div>
      <PersonalInformationForm />
      <ProfileInformationForm />
      <AdditionalQuestions />

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default FormBuilder;
