export function generateRandomId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function shapeObjectToQuestionObject(
  obj: Partial<IAddedQuestion>
): IAddedQuestion {
  // Define default values for each property
  const defaults: IAddedQuestion = {
    id: "",
    type: "Paragraph",
    question: "",
    choices: [],
    maxChoice: 0,
    disqualify: false,
    other: false,
  };

  // Merge the provided object with default values
  const shapedObject: IAddedQuestion = {
    ...defaults,
    ...obj,
  };

  return shapedObject;
}
