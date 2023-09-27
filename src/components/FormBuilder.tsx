import { Upload, UploadProps, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { MainLayout } from "../layouts";
import { useState } from "react";
import { CloseIcon } from "../assets/Icons";
import PersonalInformationForm from "./PersonalInformationForm";
import ProfileInformationForm from "./ProfileInformtionForm";
import AdditionalQuestions from "./AdditionalQuestions";

const { Dragger } = Upload;

const dummyRequest = ({ onSuccess }: any) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

const FormBuilder = () => {
  const [coverImage, setCoverImage] = useState<any>();

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;

      if (status === "done" && info.file.originFileObj) {
        setCoverImage(URL.createObjectURL(info.file.originFileObj));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
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
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
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
    </div>
  );
};

export default FormBuilder;
