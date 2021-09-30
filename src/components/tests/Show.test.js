import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
  //add in approprate test data structure here.
  name: 'SpongeBob',
  summary: 'A sponge that lives under the sea in a pineapple that cooks burgers!',
  seasons: [{
    id: 0,
    name: 'Season 1',
    episodes: []
  }]
}

test('renders testShow and no selected Season without errors', () => {
  render(<Show show={testShow} selectedSeason={'none'}/>)
  
  const showSummary = screen.queryByText(`${testShow.name}`)
  expect(showSummary).toBeInTheDocument()
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason={'none'}/>)
  
  const loadingText = screen.getByTestId('loading-container')
  
  expect(loadingText).toBeInTheDocument()
  expect(loadingText).toBeTruthy()
});

test('renders same number of options seasons are passed in', () => {
  render(<Show show={testShow} selectedSeason={'none'}/>)
  
  const showSeasons = screen.getAllByTestId('season-option')
  
  expect(showSeasons).toHaveLength(testShow.seasons.length)
});

test('handleSelect is called when an season is selected', () => {
  const mockHandleSelect = jest.fn()
  render(<Show show={testShow} selectedSeason={'none'} handleSelect={mockHandleSelect} />)
  const seasonSelect = screen.queryByLabelText('Select A Season')
  userEvent.selectOptions(seasonSelect, ['0'])
  
  expect(mockHandleSelect).toBeCalledTimes(1)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
render(<Show show={testShow} selectedSeason={'none'}/>)
  const {rerender} = render(<Show show={testShow} selectedSeason={0} />)
});

//Tasks:
//1. [ COMPLETED ] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
//2. [ COMPLETED ] Test that the Show component renders when your test data is passed in through show and "none" is passed in through selectedSeason.
//3. [ COMPLETED ] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existance)
//4. [ COMPLETED ] Test that when your test data is passed through the show prop, the same number of season select options appears as there are seasons in your test data.
//5. [ COMPLETED ] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select Dom element and userEvent reference materials to see how to trigger a selection.
//6. [ COMPLETED ] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.