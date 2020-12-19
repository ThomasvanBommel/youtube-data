/**
 * YouTube API middleware for Express
 * @author Thomas vanBommel
 * @since 12-18-2020
 */
const {google} = require("googleapis");

class YouTubeVideos {
  /**
   * Create a new YouTubeVideos object, which grabs the last 50 videos from
   * the provided channel_id every hour and places their information inside the
   * youtube_videos object.
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
  constructor(options){
    // check for channel id
    if(!options.channel_id)
      throw "Missing 'channel_id' from YouTubeVideos options";

    // check for api key
    if(!options.api_key)
      throw "Missing 'api_key' from YouTubeVideos options";

    // create youtube object from googleapis
    this.youtube = google.youtube({
      version: "v3",
      auth: options.api_key
    });

    // setup options for updates, and videos for express
    this.options = options;
    this.videos = [];

    // update now, and every *interval*ms
    this.updateVideos();
    setInterval(
      this.updateVideos, options.interval ? options.interval : 3600000
    );
  }

  /**
   * Update videos stored in the videos array from the api
   */
  updateVideos = () => {
    // api options
    let options = {
      maxResults: this.options.max_results ? this.options.max_results : 50,
      order: this.options.order ? this.options.order : "date",
      channelId: this.options.channel_id,
      part: "snippet",
      type: "video"
    };

    // query youtubes api
    this.youtube.search.list(options, (err, res) => {
      // log errors
      if(err) return console.error(err);

      // get video statistics for each video
      this.youtube.videos.list({
        part: "statistics",
        // combine all video ids into a single csv string
        id: res.data.items.map(video => { return video.id.videoId }).join()
      }, (err, stats) => {
        // log errors
        if(err) return console.error(err);

        // combine search results and statistics into a new object
        let videos = res.data.items.map((search, i) => {
          return { ...stats.data.items[i], ...search };
        });

        // set the old video object to the new one
        this.videos = videos;

        // log action to the terminal
        console.log(`${new Date().toISOString()} Updated YouTubeData`);
      });
    });
  };

  /** Express middleware to include the data in the req.youtube_videos list */
  middleware = (req, res, next) => {
    // add videos to the req object
    req.youtube_videos = this.videos;

    // call the next middleware
    next();
  };
}

/**
 * Create a new YouTubeVideos object, which grabs the last 50 videos from
 * the provided channel_id every hour and places their information inside the
 * youtube_videos object.
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
module.exports = (options) => {
  return new YouTubeVideos(options).middleware;
};
