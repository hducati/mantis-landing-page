import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { createNewUser } from "../../services/create-new-user/create-new-user";
import { User, UserInput, UserProviderProps, UsersContextData } from "./types";

const UsersContext = createContext<UsersContextData>(
  {} as UsersContextData
);

export function UsersProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.get('users')
      .then(response => setUsers(response.data.users))
  }, [])

  async function createUser(userInput: UserInput) {
    const response = await createNewUser(userInput);

    const { user } = response.data

    setUsers([
      ...users,
      user
    ])
  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsers() {
  const context = useContext(UsersContext);

  return context;
}