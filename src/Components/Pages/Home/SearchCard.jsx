import { BsCheckCircleFill } from "react-icons/bs";
import { formatSeconds, formatViews } from "../../../api/FetchApi";
import { Link } from "react-router-dom";

export default function SearchCard({ video, index }) {
  const handleMouseEnter = (id, thumbnail) => {
    if (!thumbnail) return;
    const targetElement = document.getElementById(`${id}`);
    targetElement.style.backgroundImage = `url(${thumbnail})`;
  };

  const handleMouseLeave = (id, thumbnail) => {
    if (!thumbnail) return;
    const targetElement = document.getElementById(`${id}`);
    targetElement.style.backgroundImage = `url(${thumbnail})`;
  };
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div
        style={{
          backgroundImage: `url(${video?.thumbnails[0]?.url})`,
        }}
        onMouseEnter={() =>
          handleMouseEnter(
            video?.videoId,
            video.movingThumbnails && video?.movingThumbnails[0]?.url
          )
        }
        onMouseLeave={() =>
          handleMouseLeave(video?.videoId, video?.thumbnails[0]?.url)
        }
        className="search--card"
        id={video?.videoId}
      >
        <div className="search--card--div">
          <h1 className="title">{video?.title}</h1>
          <div className="avatar">
            <img src={video?.author?.avatar[0]?.url} alt="title" />
            <p>{video?.author?.title || "No title Available"}</p>
            {video?.author?.badges[0]?.text === "Verified" && (
              <span>
                <BsCheckCircleFill />
              </span>
            )}
          </div>
          <div className="stats">
            <span>
              {formatViews(video?.stats?.views || video?.stats?.viewers)}
            </span>
            <span>{video?.publishedTimeText}</span>
            <span>{formatSeconds(video.lengthSeconds)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
