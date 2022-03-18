import { FormEvent, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { useUsers } from "../../hooks/use-users/use-users";
import countries from '../../data/countries.json'

export const LandingPage = (): React.ReactElement => {
  const { createUser } = useUsers()
  const history = useHistory()

  const firstCountry = Object.keys(countries)[0]

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState(18);
  const [country, setCountry] = useState(firstCountry);
  const [checkbox, setCheckbox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();

    if (!checkbox) {
      return;
    }

    if (phoneNumber.match(".*[a-z].*")) {
      setErrorMessage("Invalid number")
      return;
    }

    setPhoneNumber(phoneNumber.replace(/[^a-zA-Z ]/g, ""))

    await createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      age
    })

    setFirstName('');
    setLastName('');
    setEmail('');
    setCountry(firstCountry);
    setCheckbox(false);
    setAge(18)
    setErrorMessage('');

    history.push('/confirmation')
  }

  const handleCheckboxClick = () => {
    setCheckbox(!checkbox)
  }

  return (
    <div className="bg-primary min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Welcome!</h1>
      <Form onSubmit={handleCreate} className="container w-75 p-4 bg-light rounded">
        <Form.Group controlId="formFirstName" className="mb-3 col-md-12">
          <Input
            label="First Name"
            type="text" 
            placeholder="Enter your first name"
            value={firstName}
            onChange={event => setFirstName(event.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formLastName" className="mb-3 col-md-12">
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={event => setLastName(event.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3 col-md-12">
          <Input
            label="Email address"
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={event => setEmail(event.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber" className="mb-3 col-md-6">
          <Input
            label="Phone number"
            type="text" 
            placeholder="Enter your phone" 
            value={phoneNumber}
            onChange={event => setPhoneNumber(event.target.value)} 
          />
          {!!errorMessage && <span className="mt-2 text-danger">{errorMessage}</span>}
        </Form.Group>

        <Form.Group controlId="formAge" className="mb-3 col-md-4">
          <Form.Label>Age</Form.Label>
          <Form.Range min="18" max="99"value={age} required onChange={event => setAge(parseInt(event.target.value))} />
          <Form.Label>{age}</Form.Label>
        </Form.Group>

        <Form.Group controlId="formCountry" className="mb-3 col-md-4">
          <Form.Label>Country</Form.Label>
          <Form.Select onChange={event => setCountry(event.target.value)} required>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>{country.toUpperCase()}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formAgeChecker" className="mb-3">
          <Form.Check
            type="checkbox"
            label="I certify that I am at least 18 years or older"
            onClick={handleCheckboxClick}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
} 