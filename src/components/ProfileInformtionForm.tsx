import { useFormState } from "../contexts/FormProvider";
import AddQuestion from "./AddQuestion";
import QuestionItem from "./QuestionItem";
import ProfileInfoItem from "./ProfileInfoItem";

const ProfileInformationForm = () => {
  const { formState } = useFormState();
  return (
    <div
      style={{
        boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
      }}
      className="mt-8 rounded-2xl"
    >
      <div className="bg-[#D0F7FA] px-8 pt-7 pb-6 rounded-t-[20px] ">
        <h2 className="text-[25px] font-semibold">Profile</h2>
      </div>

      <div className="space-y-5 py-8 px-[30px]">
        <ProfileInfoItem fieldName="education" title="Education" />
        <ProfileInfoItem fieldName="experience" title="Experience" />
        <ProfileInfoItem fieldName="resume" title="Resume" />

        {formState.profile.profileQuestions.map((profileQuestion) => (
          <QuestionItem
            key={profileQuestion.key}
            personalQuestion={profileQuestion}
            type="Profile"
          />
        ))}
        <AddQuestion type="Profile" />
      </div>
    </div>
  );
};

export default ProfileInformationForm;
