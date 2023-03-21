import { render, screen } from '@testing-library/react';
import App from './pages/App';

test('renders without crashing', () => {
  render(<App />);
});

test('displays loading text when isLoading is true', () => {
  render(<App />);
  const loadingText = screen.getByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});
