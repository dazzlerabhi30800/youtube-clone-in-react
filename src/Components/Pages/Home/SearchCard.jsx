import { BsCheckCircleFill } from "react-icons/bs";
import { formatSeconds, formatViews } from "../../../api/FetchApi";
import { Link } from "react-router-dom";

export default function SearchCard({ video, thumbnail }) {
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
    <Link className="searchLink" to={`/video/${video?.videoId}`}>
      <div
        style={{
          backgroundImage: `url(${video?.thumbnails[thumbnail]?.url})`,
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
            {video?.author?.avatar[0]?.url && (
              <img src={video?.author?.avatar[0]?.url} alt="title" />
            )}
            {video?.author?.title && (
              <p>{video?.author?.title || "No title Available"}</p>
            )}
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
