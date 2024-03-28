export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  start_date_month: number;
  start_date_year: number;
  end_date_year: number;
  end_date_month: number;
  descriptions: { value: string }[];
}

export interface Education {
  id: string;
  school_name: string;
  start_date_year: string;
  end_date_year: string;
  description: string;
}

export interface Profile {
  id: string;
  cv: File;
  work_experiences: WorkExperience[];
  education: Education[];
}
