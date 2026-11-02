export interface AdmissionApplication {
  id?: string;
  submittedAt?: string;
  
  // 1. વિદ્યાર્થીની માહિતી (Student Information)
  studentName: string;
  dob: string;
  gender: string;
  standard: string;
  academicYear: string;

  // 2. વાલી / માતા-પિતાની માહિતી (Parent/Guardian Information)
  fatherName: string;
  motherName: string;
  mobile: string;
  email?: string;
  address: string;

  // 3. અગાઉની શાળાની માહિતી (Previous School Information)
  prevSchoolName?: string;
  prevStandard?: string;
  prevBoard?: string;

  // 4. વધારાની માહિતી (Additional Information)
  hearAbout?: string;
  suggestion?: string;

  status?: 'Pending' | 'Verified' | 'Admitted';
}

