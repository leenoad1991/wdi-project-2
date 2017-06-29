# wdi-project-2

The goal of this project was to build an app using EJS that used an external API.

I wanted to use three API's to make this work, firstly Google maps with markers. Secondly I got permission from Spitcast (http://www.spitcast.com/) to use their API for surf reports along the Californian coast. The third API I used was Flikr's, so that users could check out recent pictures from the surrounding area before paying somewhere a visit.

The idea behind the app was the a user would be able to go online and check out the live temperature of the water in various spots along the West Coast of America.

# I was happiest with:
The landing page. I used a video of a surfer wearing a helmet-mounted GoPro getting barrelled. The colour scheme and layout of the page was designed around the barrelling wave. Initially I embedded a video from Youtube and found some code that got rid of the controls, started the video from a certain point and looped through it continuously. Annoyingly, I wasn't able to lose the black border surrounding the video. The solution was instead to convert the video to mp4.

# The biggest challenge I faced was:
With the Spitcast API because I could only make a certain number of requests at a time. I overcame this by using Insomnia for testing the API rather than changing my code and constantly refreshing the browser to check if it had worked.

# If I had more time I would have:
Used Magic Seaweed's API (biggest surf forecaster in the world) so that I could have more information regarding swell, surf height etc. I would then have implemented graphs to display the data (I probably would have used Angular for this, I know them to be simple to implement and easy on the eye!). I'd have spent more time on the Flikr feature. This was a last minute addition and currently the pictures look very messy when displayed.
