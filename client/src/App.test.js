import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';

test('renders Header component', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument();
});

//Render


