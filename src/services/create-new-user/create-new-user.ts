import { UserInput } from "../../hooks/use-users/types"
import { api } from "../api"

export const createNewUser = async (userInput: UserInput) => {
  const response = await api.post('/users', {
    ...userInput,
    createdAt: new Date()
  })

  return response;
}