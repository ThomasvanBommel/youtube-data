/**
 * YouTube API middleware for Express
 * @author Thomas vanBommel
 * @since 12-18-2020
 */
const {google} = require("googleapis");

class YouTubeData {
  /**
   * Create a new YouTubeData object, which grabs the last 50 videos from
   * the provided channel_id every hour and places their information inside the
   * youtube_videos object.
   * @param {string} api_key - YouTube Data API v3 key
   * @param {string} channel_id - YouTube channel id
   * @param {integer} [interval=3600000] - Update interval (default 1h)
   */
  constructor(api_key, channel_id, interval=3600000){
    this.youtube = google.youtube({
      version: "v3",
      auth: api_key
    });

    this.channel_id = channel_id;
    this.videos = [];

    this.updateVideos();
    setInterval(this.updateVideos, interval);
  }

  /** Update videos stored in the youtube_videos array */
  updateVideos = () => {
    let options = {
      part: "snippet",
      order: "date",
      type: "video",
      maxResults: 50,
      channelId: this.channel_id
    };

    this.youtube.search.list(options, (err, res) => {
      if(err) return console.error(err);
      this.videos = res.data.items;

      console.log(`${new Date().toISOString()} Updated YouTubeData`);
    });
  };

  /** Express middleware to include the data in the req.youtube_videos list */
  middleware = (req, res, next) => {
    req.youtube_videos = this.videos;
    next();
  };
}

/**
 * Create a new YouTubeData object, which grabs the last 50 videos from
 * the provided channel_id every hour and places their information inside the
 * youtube_videos object.
 * @param {string} api_key - YouTube Data API v3 key
 * @param {string} channel_id - YouTube channel id
 * @param {integer} [interval=3600000] - Update interval (default 1h)
 */
module.exports = (api_key, channel_id, interval=3600000) => {
  return new YouTubeData(api_key, channel_id, interval=3600000).middleware;
};
