export function generateRandomId(): string {
  const segments: number[] = Array(5)
    .fill(0)
    .map(() => Math.floor(Math.random() * 65536));

  const formattedSegments: string[] = segments.map((segment) =>
    segment.toString(16).padStart(4, "0")
  );

  // Join the segments with hyphens
  const randomId = formattedSegments.join("-");

  return randomId;
}

export function shapeObjectToQuestionObject(
  obj: Partial<IAddedQuestion>
): IAddedQuestion {
  const defaults: IAddedQuestion = {
    id: "",
    type: "Paragraph",
    question: "",
    choices: [],
    maxChoice: 0,
    disqualify: false,
    other: false,
    key: "",
  };

  // Merge the provided object with default values
  const shapedObject: IAddedQuestion = {
    ...defaults,
    ...obj,
  };

  return shapedObject;
}
