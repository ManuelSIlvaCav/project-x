export interface Profile {
  id: string;
  cv: File;
  workExperiences: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
  }[];
}
