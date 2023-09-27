import { useState } from "react";
import editIcon from "../assets/edit.svg";
import EditQuestion from "./EditQuestion";

interface PeronsalQuestionProps {
  personalQuestion: IAddedQuestion;
  type: QuestionTypes;
}

const QuestionItem = ({ personalQuestion, type }: PeronsalQuestionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {!isEditing && (
        <div className="flex items-start justify-between">
          <p className="text-lg font-semibold">{personalQuestion.question}</p>

          <img
            className="cursor-pointer"
            onClick={() => setIsEditing(true)}
            src={editIcon}
          />
        </div>
      )}

      {isEditing && (
        <EditQuestion
          setEditing={setIsEditing}
          defaultValue={personalQuestion}
          type={type}
        />
      )}
    </div>
  );
};

export default QuestionItem;
