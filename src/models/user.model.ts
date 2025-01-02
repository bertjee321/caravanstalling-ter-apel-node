export interface User {
  id: number;
  email: string;
  password: string; // This will be hashed
}

let users: User[] = [
  {
    id: 1,
    email: "admin",
    password: "$2a$10$ZKum3TrfzuH4u5kSM4SueesWDCYF0NkJPDSMwpXUro.3QHqqj9gay",
  },
]; // In-memory array to store users (replace with DB later)

export function createUser(email: string, password: string): User {
  const id = users.length + 1;
  const newUser = { id, email, password };
  users.push(newUser);
  return newUser;
}

export function findUserByUsername(username: string): User | undefined {
  return users.find((user) => user.email === username);
}
