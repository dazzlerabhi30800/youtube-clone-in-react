import { Link } from "react-router-dom";
import { formatSeconds, formatViews } from "../../../api/FetchApi";
import { BsDot } from "react-icons/bs";

export default function RelatedVideo({ info: { video } }) {
  return (
    <Link style={{ height: "auto" }} to={`/video/${video?.videoId}`}>
      <div className="related--video">
        <div
          style={{ backgroundImage: `url(${video?.thumbnails[0]?.url})` }}
          className="thumbnail"
        >
          <span className="duration">
            {formatSeconds(video?.lengthSeconds)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            flexBasis: "50%",
          }}
        >
          <div className="related--info">
            <h2>{video?.title}</h2>
            <p>{video?.author?.title}</p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="related--stats"
          >
            {formatViews(video?.stats?.views)} <BsDot />{" "}
            {video?.publishedTimeText}
          </div>
        </div>
      </div>
    </Link>
  );
}
