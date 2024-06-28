import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PathApp from './PathApp';
import { calculateGridPaths } from './PathApp';

test('renders Grid Path Calculator heading', () => {
  render(<PathApp />);
  const headingElement = screen.getByText(/Grid Path Calculator/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders initial grid and calculates paths correctly', () => {
  render(<PathApp />);
  const initialLastCell = screen.getByText('6'); // 3x3 grid initial value
  expect(initialLastCell).toBeInTheDocument();
});

test('updates grid size and calculates paths correctly', () => {
  render(<PathApp />);
  const rowsInput = screen.getByLabelText(/Rows:/i);
  const columnsInput = screen.getByLabelText(/Columns:/i);
  const button = screen.getByText(/Calculate/i);

  // Change grid size to 4x4
  fireEvent.change(rowsInput, { target: { value: 4 } });
  fireEvent.change(columnsInput, { target: { value: 4 } });
  fireEvent.click(button);

  // Check the last cell value for 4x4 grid
  const updatedLastCell = screen.getByText('20'); // 4x4 grid value
  expect(updatedLastCell).toBeInTheDocument();

  // Check the number of paths to the last cell text
  const lastPathNumberText = screen.getByText(/Number of paths to the last cell: 20/i);
  expect(lastPathNumberText).toBeInTheDocument();
});

test('last cell has red background color', () => {
  render(<PathApp />);
  const lastCell = screen.getByText('6'); // 3x3 grid initial value
  expect(lastCell).toHaveClass('finalCell');
});

test('calculateGridPaths function works correctly', () => {
  const result = calculateGridPaths(3, 3);
  expect(result[2][2]).toBe(6); // 3x3 grid last cell value
  const result2 = calculateGridPaths(4, 4);
  expect(result2[3][3]).toBe(20); // 4x4 grid last cell value
});
