export interface UserBase {
  id?: number;
  email?: string;
  password?: string; // This will be hashed
  role?: UserRole;
}

export interface AddUser extends UserBase {
  email: string;
  password: string; // This will be hashed
  role: UserRole;
}

export interface UpdateUser extends UserBase {
  id: number; // ID is required for updating a vehicle
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}