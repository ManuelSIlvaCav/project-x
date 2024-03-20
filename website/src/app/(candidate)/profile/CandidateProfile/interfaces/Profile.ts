export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  start_date_month: string;
  start_date_year: string;
  end_date_year: string;
  end_date_month: string;
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
