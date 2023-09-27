import { useFormState } from "../contexts/FormProvider";
import AddQuestion from "./AddQuestion";
import QuestionItem from "./QuestionItem";

const AdditionalQuestions = () => {
  const { formState } = useFormState();

  return (
    <div
      style={{
        boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)",
      }}
      className="mt-8 pb-7 rounded-2xl"
    >
      <div className="bg-[#D0F7FA] px-8 pt-7 pb-6 rounded-t-[20px] ">
        <h2 className="text-[25px] font-semibold">Additional Questions</h2>
      </div>

      <div className="space-y-5 px-[30px]">
        {formState.customisedQuestions?.length > 0 && (
          <div className="space-y-5 mt-7 ">
            {formState.customisedQuestions.map((customQuestion) => (
              <QuestionItem
                key={customQuestion.key}
                personalQuestion={customQuestion}
                type="Custom Question"
              />
            ))}
          </div>
        )}
        <AddQuestion type="Custom Question" />
      </div>
    </div>
  );
};

export default AdditionalQuestions;
