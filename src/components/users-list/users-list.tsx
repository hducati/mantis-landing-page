import { Table } from "react-bootstrap"
import { useUsers } from "../../hooks/use-users/use-users";

export const UsersList = (): React.ReactElement => {
  const { users } = useUsers();

  return(
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Age</th>
          <th>Country flag</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.age}</td>
          <td>
            <img
              src={`https://flagcdn.com/24x18/${user.country}.png`}
              srcSet={`https://flagcdn.com/48x36/${user.country}.png 2x,
                https://flagcdn.com/72x54/${user.country}.png 3x`}
              width="24"
              height="18"
              alt={`Country ${user.country}`}
              className=""
            />
          </td>
          <td>{user.country.toUpperCase()}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}