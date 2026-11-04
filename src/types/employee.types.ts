
export interface Employee {
  id: number;
  name: string;
  contact: string;
  address: string;
  isActive: boolean;
  created_at: string;
}

export interface CreateEmployeeDto {
  name: string;
  contact: string;
  address: string;
  isActive: boolean;
}
