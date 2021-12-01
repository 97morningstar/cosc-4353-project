import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';
import Home from './components/Home';

test('renders Header component', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument();
});

 test('renders Home component', () => {
  render(<Home />);
  const linkElement = screen.getByText(/NextFlood/i);
  expect(linkElement).toBeInTheDocument();
});



