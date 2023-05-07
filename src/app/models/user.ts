export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

interface Role {
  id: number;
  value: string;
}
