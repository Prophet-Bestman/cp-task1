interface IAttributes {
  coverImage: string;
  personalInformation: IPersonalInformation;
  profile: Profile;
  customisedQuestions: CustomisedQuestion[];
}

interface IPersonalInformation {
  firstName: IDefaultField;
  lastName: IDefaultField;
  emailId: IDefaultField;
  phoneNumber: IDefaultField;
  nationality: IDefaultField;
  currentResidence: IDefaultField;
  idNumber: IDefaultField;
  dateOfBirth: IDefaultField;
  gender: IDefaultField;
  personalQuestions: IAddedQuestion[];
}

interface IDefaultField {
  internalUse: boolean;
  show: boolean;
}
interface IDefaultProfileField {
  mandatory: boolean;
  show: boolean;
}

interface IAddedQuestion {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

interface Profile {
  education: IDefaultProfileField;
  experience: IDefaultProfileField;
  resume: IDefaultProfileField;
  profileQuestions: ProfileQuestion[];
}

interface ProfileQuestion {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

interface CustomisedQuestion {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice: number;
  disqualify: boolean;
  other: boolean;
}

type QuestionTypes = "Personal Info" | "Profile" | "Custom Question";
