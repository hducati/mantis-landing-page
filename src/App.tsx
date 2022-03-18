import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UsersProvider } from './hooks/use-users/use-users';
import { ConfirmationPage } from './screens/confirmation-page/confirmation';
import { LandingPage } from './screens/landing-page/landing-page';

function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
      <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/confirmation" exact component={ConfirmationPage} />
      </Switch>
      </BrowserRouter>
    </UsersProvider>
  )
}

export default App;
