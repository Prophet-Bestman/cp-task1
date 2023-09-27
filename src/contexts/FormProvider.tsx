import { PropsWithChildren, createContext, useContext, useState } from "react";

import { attributes } from "../data";

interface IFormContext {
  formState: IAttributes;
  updatePersonalInfo: (...args: any) => void;
  appendToPersonalQuestions: (args: IAddedQuestion) => void;
  appendToProfileQuestions: (args: IAddedQuestion) => void;
  appendToCustomQuestions: (args: IAddedQuestion) => void;
  updatePeronsalQuestionList: (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => void;
  updateProfileQuestionList: (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => void;
  updateCustomQuestionList: (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => void;
}

export const FormContext = createContext<IFormContext | undefined>(undefined);

export function useFormState() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormState must be used within an FormProvider");
  }
  return context;
}

const FormProvider = ({ children }: PropsWithChildren) => {
  const [formState, setFormState] = useState(attributes);

  const updatePersonalInfo = <T extends keyof IPersonalInformation>(
    fieldName: T,
    attribute: "show" | "internalUse",
    value: boolean
  ) => {
    setFormState({
      ...formState,
      personalInformation: {
        ...formState.personalInformation,
        [fieldName]: {
          ...formState.personalInformation[fieldName],
          [attribute]: value,
        },
      },
    });
  };

  // ADD QUESTION TO PERSONAL QUESTIONS
  const appendToPersonalQuestions = (question: IAddedQuestion) => {
    setFormState({
      ...formState,
      personalInformation: {
        ...formState.personalInformation,
        personalQuestions: [
          ...formState?.personalInformation?.personalQuestions,
          question,
        ],
      },
    });
  };

  // ADD QUESTION TO PROFILE QUESTIONS
  const appendToProfileQuestions = (question: IAddedQuestion) => {
    setFormState({
      ...formState,
      profile: {
        ...formState.profile,
        profileQuestions: [...formState?.profile?.profileQuestions, question],
      },
    });
  };

  // ADD QUESTION TO CUSTOM QUESTIONS
  const appendToCustomQuestions = (question: IAddedQuestion) => {
    setFormState({
      ...formState,
      customisedQuestions: [...formState?.customisedQuestions, question],
    });
  };

  // EDIT A QUESTION IN PERSONAL QUESTIONS LIST
  const updatePeronsalQuestionList = (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => {
    let initialQuestions = formState.personalInformation.personalQuestions;
    if (action === "edit") {
      for (let i = 0; i < initialQuestions.length; i++) {
        if (initialQuestions[i].id === question.id) {
          initialQuestions[i] = {
            ...initialQuestions[i],
            ...question,
          };
          break;
        }
      }
    } else {
      initialQuestions = initialQuestions.filter(
        (initialQuestion) => initialQuestion.id !== question.id
      );
    }
    setFormState({
      ...formState,
      personalInformation: {
        ...formState.personalInformation,
        personalQuestions: initialQuestions,
      },
    });
  };

  // EDIT A QUESTION IN PROFILE QUESTIONS LIST
  const updateProfileQuestionList = (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => {
    let initialQuestions = formState.profile.profileQuestions;
    if (action === "edit") {
      for (let i = 0; i < initialQuestions.length; i++) {
        if (initialQuestions[i].id === question.id) {
          initialQuestions[i] = {
            ...initialQuestions[i],
            ...question,
          };
          break;
        }
      }
    } else {
      initialQuestions = initialQuestions.filter(
        (initialQuestion) => initialQuestion.id !== question.id
      );
    }
    setFormState({
      ...formState,
      profile: {
        ...formState.profile,
        profileQuestions: initialQuestions,
      },
    });
  };

  // EDIT A QUESTION IN CUSTOM QUESTIONS LIST
  const updateCustomQuestionList = (
    question: IAddedQuestion,
    action: "edit" | "delete"
  ) => {
    let initialQuestions = formState.customisedQuestions;
    if (action === "edit") {
      for (let i = 0; i < initialQuestions.length; i++) {
        if (initialQuestions[i].id === question.id) {
          initialQuestions[i] = {
            ...initialQuestions[i],
            ...question,
          };
          break;
        }
      }
    } else {
      initialQuestions = initialQuestions.filter(
        (initialQuestion) => initialQuestion.id !== question.id
      );
    }
    setFormState({
      ...formState,
      customisedQuestions: initialQuestions,
    });
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        updatePersonalInfo,
        appendToPersonalQuestions,
        updatePeronsalQuestionList,
        appendToProfileQuestions,
        updateProfileQuestionList,
        appendToCustomQuestions,
        updateCustomQuestionList,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
