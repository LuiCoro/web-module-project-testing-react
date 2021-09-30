import React from 'react';
import {render, screen} from '@testing-library/react';
import Episode from './../Episode';

const testEpisode = {
  id: 1,
  name: "",
  image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
  season: 1,
  number: 1,
  summary: "Hopefully my tests come out decent at the very least!",
  runtime: 1
}

const testEpisodeWithoutImage = {
  //Add in approprate test data structure here.
  id: 1,
  name: 'Workaholics',
  image: '',
  season: 1,
  number: 1,
  summary: 'Three best friends enjoying life',
  runtime: 1
}

test("renders without error", () => {
  render(<Episode episode={testEpisode}/>)
  
});

test("renders the summury test passed as prop", () => {
render(<Episode episode={testEpisode} />)
  
  const summary = screen.queryByText(`${testEpisode.summary}`)
  
  expect(summary).toBeInTheDocument()
  expect(summary).toBeTruthy()
  expect(summary).toBeVisible()
});

test("renders default image when image is not defined", () => {
render(<Episode episode={testEpisodeWithoutImage} />)
  
  const altTag = screen.getByAltText('./stranger_things.png')
  
  expect(altTag).toBeTruthy()
})

//Tasks
//1. [ COMPLETED ]  Complete a test that shows the Episode component renders. Pass in the provided example episode data as a test prop.
//2. [ COMPLETED ]  Modify the test data to display a specific summary statement. Complete a test that shows that the summary value passed in to the Episode component displays as expected. Use no more then 3 different expect statements to test the the existance of the summary value.
//3. [ COMPLETED ]  The episode component displays a default value ('./stranger_things.png') when a image url is not provided. Create a new piece of test data with the image property set to null. Test that the alt tag of the image displayed is set to './stranger_things.png'.