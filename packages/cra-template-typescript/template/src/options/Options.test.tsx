import React from 'react';
import { render, screen } from '@testing-library/react';
import Options from './Options';

test('renders learn react link', () => {
  render(<Options />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
