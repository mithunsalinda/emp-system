export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  joinedDate: string;
  profilePicture: string;
};

export type EmployeeData = {
  data: Employee;
  isLoading: boolean;
};
