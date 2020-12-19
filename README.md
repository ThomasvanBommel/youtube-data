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
  console.log(req.youtube_videos);
});
```

### Output Example

```js
[
  {
    kind: 'youtube#searchResult',
    etag: 'kgbqpKXwhOw1oUfkpgVI1gqjVmg',
    id: { kind: 'youtube#video', videoId: 'xFOonneYxWQ' },
    statistics: {
      viewCount: '4',
      likeCount: '0',
      dislikeCount: '0',
      favoriteCount: '0',
      commentCount: '1'
    },
    snippet: {
      publishedAt: '2020-11-21T20:26:45Z',
      channelId: 'UCbVqDf-obg_ylZZjNp1hK7Q',
      title: 'Lobbier Project Update (week 1)',
      description: 'https://github.com/BillMyres/Lobbier.',
      thumbnails: [Object],
      channelTitle: 'Thomas vanBommel',
      liveBroadcastContent: 'none',
      publishTime: '2020-11-21T20:26:45Z'
    }
  },
  {
    kind: 'youtube#searchResult',
    etag: '3e-lsY0z_lP42BjbGO_EtFITcJ0',
    id: { kind: 'youtube#video', videoId: 'WceNj_73A3o' },
    statistics: {
      viewCount: '9',
      likeCount: '0',
      dislikeCount: '0',
      favoriteCount: '0',
      commentCount: '0'
    },
    snippet: {
      publishedAt: '2020-10-26T01:45:27Z',
      channelId: 'UCbVqDf-obg_ylZZjNp1hK7Q',
      title: 'PROG2200 M03 Weapons Interface',
      description: 'Implementing simulated vehicle weapons with java interfaces.',
      thumbnails: [Object],
      channelTitle: 'Thomas vanBommel',
      liveBroadcastContent: 'none',
      publishTime: '2020-10-26T01:45:27Z'
    }
  }
]

```

### Example HTML using EJS
```html
<% if(locals.youtube_videos) { %>
  <div id="youtube_videos" class="">
    <h2>YouTube</h2>

    <% for(let video of youtube_videos.slice(0, 10)) { %>
      <div class="video">
        <img src="<%= video.snippet.thumbnails.high.url %>" alt="video thumbnail">

        <b><%= video.snippet.title %></b>

        <div class="">
          <small><%= video.snippet.channelTitle %></small>
        </div>

        <div class="">
          <small><%= video.statistics.viewCount %> views</small>
          <small> * <%= new Date(video.snippet.publishedAt).toDateString() %></small>
        </div>
      </div>
    <% } %>
  </div>
<% } %>
```
