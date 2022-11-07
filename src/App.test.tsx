import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a TicTacToe board', () => {
  render(<App />);
  const linkElement = screen.getByText(/your turn/i);
  expect(linkElement).toBeInTheDocument();
});
