import { render, screen } from '@testing-library/react';
import Dashboard from './../index';
import MockTheme from './../../../mockTheme';

test('renders learn react link', () => {
  render(<MockTheme><Dashboard /></MockTheme>);
});
