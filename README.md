# youtube-videos

Express middleware that gets videos from a YouTube channel, by it's channel id, on a timed interval (default 1 hour).

## Requirements

 - NodeJS
 - Express module: `npm install express`
 - GoogleApis module: `npm install googleapis`
 - YouTube Data API v3 key
 - YouTube channel id

## Options
```js
/**
 * @param {Object} options - YouTubeVideos Options
 * @param {string} options.api_key - YouTube Data API v3 key
 * @param {string} options.channel_id - YouTube channel id
 * @param {integer} [options.interval=3600000] - Update interval (default 1h)
 * @param {integer} [options.max_results=50] - Maximum result response count,
 *  Min/Max = 1/50
 * @param {string} [options.order="date"] - Order of the video results,
 *  One of ("date", "rating", "relevance", "title", "videoCount", "viewCount")
 * @throws Missing 'channel_id' from YouTubeVideos options
 * @throws Missing 'api_key' from YouTubeVideos options
 */
```

## Usage

```js
const YT = require("youtube-videos");
const express = require("express");

let app = express();

app.use(YT({
  api_key: "ApI-K3y-h3Re",
  channel_id: "ChanNe1-1D_h3re"
}));

app.get("*", (req, res) => {
  console.log(req.youtube);
});
```

### Output Example

```js
{
  profile: {
    kind: 'youtube#channel',
    etag: 'qlbGdUE3miOchUAkhkUB95O6PMc',
    id: 'UCbVqDf-obg_ylZZjNp1hK7Q',
    snippet: {
      title: 'Thomas vanBommel',
      description: '',
      publishedAt: '2011-05-02T19:05:40Z',
      thumbnails: [Object],
      localized: [Object]
    },
    statistics: {
      viewCount: '12388',
      subscriberCount: '18',
      hiddenSubscriberCount: false,
      videoCount: '43'
    }
  },
  videos: [
    {
      kind: 'youtube#searchResult',
      etag: 'QYyzOoQg5SMNPbaV6NcO0ePxWg4',
      id: [Object],
      statistics: [Object],
      snippet: [Object]
    },
    {
      kind: 'youtube#searchResult',
      etag: 'wEk3DJmRMTbLbMEeZCfmOAkSses',
      id: [Object],
      statistics: [Object],
      snippet: [Object]
    },
    /* ... */
  ]
}
```
