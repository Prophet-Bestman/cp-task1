import { useFormState } from "../contexts/FormProvider";
import AddQuestion from "./AddQuestion";
import PersonalInfoItem from "./PersonalInfoItem";
import QuestionItem from "./QuestionItem";

const PersonalInformationForm = () => {
  const { formState } = useFormState();
  return (
    <div
      style={{
        boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
      }}
      className="mt-8 rounded-2xl"
    >
      <div className="bg-[#D0F7FA] px-8 pt-7 pb-6 rounded-t-[20px] ">
        <h2 className="text-[25px] font-semibold">Personal Information</h2>
      </div>

      <div className="space-y-5 py-8 px-[30px]">
        <PersonalInfoItem fieldName="emailId" title="Email" />
        <PersonalInfoItem
          fieldName="phoneNumber"
          title={
            <span>
              Phone
              <span className="text-xs font-light"> (without dial code)</span>
            </span>
          }
          isEditable
        />
        <PersonalInfoItem
          fieldName="nationality"
          title="Nationality"
          isEditable
        />
        <PersonalInfoItem
          fieldName="currentResidence"
          title="Current Residence"
          isEditable
        />
        <PersonalInfoItem fieldName="idNumber" title="ID Number" isEditable />
        <PersonalInfoItem
          fieldName="dateOfBirth"
          title="Date of Birth "
          isEditable
        />
        <PersonalInfoItem fieldName="gender" title="Gender" isEditable />
        {formState.personalInformation.personalQuestions.map(
          (personalQuestion) => (
            <QuestionItem
              key={personalQuestion.id}
              personalQuestion={personalQuestion}
              type="Personal Info"
            />
          )
        )}
        <AddQuestion type="Personal Info" />
      </div>
    </div>
  );
};

export default PersonalInformationForm;
