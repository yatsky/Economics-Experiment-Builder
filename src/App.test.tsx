import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import store from './Components/Store'
import {Provider} from "react-redux";

test('sanity check', () => {
    expect(false).toBe(false)
})

test('renders app successfully', () => {
  render(
      <Provider store={store}>
        <App/>
      </Provider>
  );
  const linkElement = screen.getByText(/Experiment builder/i);
  expect(linkElement).toBeInTheDocument();
});

