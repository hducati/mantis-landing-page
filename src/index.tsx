import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

createServer({
  models: {
    user: Model
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', () => {
      return this.schema.all('user')
    })

    this.post('/users', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('user', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
