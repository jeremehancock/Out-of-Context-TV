<img src="https://raw.githubusercontent.com/jeremehancock/Out-of-Context-TV/master/content/images/outofcontext-updated.png"/>

# OutOfContextTV

<i>Inspired by [Neave TV](https://neave.tv) and the unauthorized port found [here](https://github.com/Fortyseven/ChannelSurf).</i>

I wanted to take this concept one step further and make it community driven. The idea is to have anyone submit clips to this project so it can grow organically. See Submission details below.

[Check out OutOfContextTV!](https://outofcontext.dumbprojects.com)

Click anywhere to 'change channels' or just wait and let the wierdness wash over you.

## URL Parameters

OutOfContextTV supports URL parameters to customize your viewing experience:

### Hide UI Elements

Hide all buttons, banners, and controls for a clean viewing experience:

- `?hideUI=true` - Hides the GitHub corner, social badge, and unmute button
- `?controls=false` - Alternative syntax for hiding UI elements

**Example:** `https://outofcontext.dumbprojects.com?hideUI=true`

### Volume Control

Control the initial volume state:

- `?muted=false` - Start with volume ON
- `?volume=on` - Alternative syntax for volume ON
- By default, videos start muted (no parameter needed)

**Example:** `https://outofcontext.dumbprojects.com?muted=false`

### Combining Parameters

You can combine multiple parameters using `&`:

**Example:** `https://outofcontext.dumbprojects.com?hideUI=true&muted=false`

This is perfect for embedding OutOfContextTV in iframes or creating a distraction-free viewing experience!

## Submission Details

It is easy to submit your own clips into OutOfContextTV.

1. Fork this project.

2. Add your clip(s) to the "content/video/clips" directory. (https://github.com/jeremehancock/Out-of-Context-TV/tree/master/content/video/clips)

3. Add your clip(s) into the "content/clips.json" file (https://github.com/jeremehancock/Out-of-Context-TV/blob/master/content/clips.json)

4. Put in a pull request to this repo.

### Note:

Clips should be less than 1 minute 30 seconds. Please no <i>inappropriate</i> clips.

## License

[MIT License](LICENSE)

## AI Assistance Disclosure

This tool was developed with assistance from AI language models.

## Disclaimer

This project doesn't own any of the clips. All clips have come from various websites online. If you own the rights to content used in this project and would like it removed please put in a request by submitting an issue to this repo.
