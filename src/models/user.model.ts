export interface User {
  id?: number;
  email?: string;
  password?: string; // This will be hashed
  role?: UserRole;
}

export interface AddUser extends User {
  id: number;
  email: string;
  password: string; // This will be hashed
  role: UserRole;
}

export interface UpdateUser extends User {
  id: number; // ID is required for updating a vehicle
}

enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// export function createUser(email: string, password: string): User {
//   const id = users.length + 1;
//   const newUser = { id, email, password };
//   users.push(newUser);
//   return newUser;
// }
