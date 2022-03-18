export interface UsersContextData {
  users: User[]
  createUser: (userInput: UserInput) => Promise<void>;
}

export interface UserProviderProps {
  children: React.ReactNode
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  age: number;
  createdAt: Date;
}

export type UserInput = Omit<User, "id" | "createdAt">