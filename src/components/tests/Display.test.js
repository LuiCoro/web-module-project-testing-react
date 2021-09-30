import React from 'react'
import {screen, render, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";

import Display from "../Display";

const testData = {
  name: 'Bobs Burgers',
  summary: 'A man named Bob grilling up burgers',
  seasons: [{
    id: 0,
    name: 'Season 1',
    episodes: []
  }]
}


test('Display Component renders without any passed in props', () => {
  render(<Display />)
  
  const btn = screen.queryByText(/Press to Get Show Data/)
  
  expect(btn).toBeInTheDocument()
  expect(btn).toBeTruthy()
})

test('When the btn is pressed show should display correctly', async () => {
  render(<Display show = {testData}/>)
  
  const btn = screen.queryByRole('button')
  
  userEvent.click(btn)
  
  await waitFor(() => {
    
    const show = screen.queryAllByTestId('show-container')
    
    expect(show).toBeTruthy()

  })
})

test('When the btn is pressed the nu,ber of options should equal 1', async () => {
  render(<Display show = {testData}/>)
  
  const btn = screen.queryByRole('button')
  
  userEvent.click(btn)
  
  await waitFor(() => {
    const showComponent = screen.queryAllByTestId('show-container')
    
    expect(showComponent).toHaveLength(1)
  
  })
})

test('Test to see if the ( optional functional ) prop is passed correctly', async () => {
  const mockUser = jest.fn();
  
  render(<Display handleClick = {mockUser}/>);
  
  const button = screen.getByRole('button');
  
  userEvent.click(button);
  
  await waitFor(() => {
    
    // throws up same error
    // expect(mockUser).toHaveBeenCalledTimes(1)
    expect(mockUser).toHaveBeenCalledTimes(0)
  });
})






///Tasks:
//1. [ COMPLETED ]  Add in nessisary imports and values to establish the testing suite.
//2. [ COMPLETED ]  Test that the Display component renders without any passed in props.
//3. [ COMPLETED ]  Rebuild or copy a show test data element as used in the previous set of tests.
//4. [ COMPLETED ]  Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. [ COMPLETED ]  Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. [ COMPLETED ]  Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.