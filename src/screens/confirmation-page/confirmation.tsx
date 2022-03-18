import { Container, ButtonGroup, Button } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { UsersList } from "../../components/users-list/users-list";
import { useUsers } from "../../hooks/use-users/use-users";

export const ConfirmationPage = (): React.ReactElement => {
  const { users } = useUsers();
  const history = useHistory();

  const redirectToCreateNewUser = () => {
    const path = '/'
    history.push(path)
  }

  return (
    <div className="d-flex min-vh-100 bg-primary justify-content-center">
    <Container className="d-flex h-50 flex-column p-6 bg-light">
      <h2 className="d-flex p-4 justify-content-center align-items-center">
        {users.length > 0 ? "Thank you for creating your account!" : "You dont' have any accounts"}
      </h2>
      <ButtonGroup className="d-flex my-4 col-md-2">
        <Button size="sm" onClick={redirectToCreateNewUser}>Create new user (test purpose)</Button>
      </ButtonGroup>
      <UsersList />
    </Container>
    </div>
  )
}