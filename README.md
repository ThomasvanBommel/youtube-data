# youtube-data

Express middleware that gets the latest 50 videos from a YouTube channel, by it's channel id, on a timed interval (default 1 hour).

## Requirements

 - NodeJS
 - Express module: `npm install express`
 - GoogleApis module: `npm install googleapis`
 - YouTube Data API v3 key
 - YouTube channel id

## Usage

```js
const YouTubeData = require("./modules/youtube-data/youtube-data");
const express = require("express");

let app = express();

app.use(YouTubeData("ApI-K3y-h3Re", "ChanNe1-1D_h3re"));

app.get("*", (req, res) => {
  console.log(req.youtube_videos);
});
```

### Output Example

```
[
  {
    kind: 'youtube#searchResult',
    etag: '_x80VldOia-cdxSgOi6QxE_cgJI',
    id: { kind: 'youtube#video', videoId: 'TpczZvlNJUc' },
    snippet: {
      publishedAt: '2016-12-17T18:35:43Z',
      channelId: 'UCbVqDf-obg_ylZZjNp1hK7Q',
      title: 'UnityTerrain - TimeLapse',
      description: 'Unity Terrain project I did for a school portfolio.',
      thumbnails: [Object],
      channelTitle: 'Thomas vanBommel',
      liveBroadcastContent: 'none',
      publishTime: '2016-12-17T18:35:43Z'
    }
  },
  {
    kind: 'youtube#searchResult',
    etag: 'gqP5kKcAEiL-faKXFNvHTy27qLs',
    id: { kind: 'youtube#video', videoId: 'mjbRPfr1Vok' },
    snippet: {
      publishedAt: '2017-01-21T05:14:23Z',
      channelId: 'UCbVqDf-obg_ylZZjNp1hK7Q',
      title: 'Blender Skin Modifier - Character Base ( Time Lapse )',
      description: 'Messing around with the skin modifier seems to have paid off, this will absolutely help speed things up in the future!',
      thumbnails: [Object],
      channelTitle: 'Thomas vanBommel',
      liveBroadcastContent: 'none',
      publishTime: '2017-01-21T05:14:23Z'
    }
  }
]

```
