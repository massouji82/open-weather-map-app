# OpenWeatherMap App

In the project directory, you can run:

### `yarn`

to install the packages followed by:

### `yarn start`

to start the local server.

This was a fun challenge! It was a bit more time consuming than I expected but as as long as I learn
something new it is always worth it :D

I wasted some time in the begining because I started to create routes with `react-router-dom` but it
never felt right and it was certainly overengineering so I'm glad I did it in a much more simpler
way in the end.

I wanted to create much fuller tests but unfortunately didn't have the time in the end.

There seems to be a bug where sometimes the api never responds when sending a request using the
users location. It rarely happens and a a refresh usually solves it. Nevertheless, the bug bugs me (
pun intented) and is something I definately would look more into with more time. I suspect it might
have something to do with the
`Violation] Only request geolocation information in response to a user gesture.` error I get in the
console. I didn't get time to pursue it more [SO](https://stackoverflow.com/questions/47581575/only-request-geolocation-information-in-response-to-a-user-gesture).
