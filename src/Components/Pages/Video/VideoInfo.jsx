import { BiLike } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { formatNumbers, formatViews } from "../../../api/FetchApi";

export default function VideoInfo({ info }) {
  let { author, title, videoId, description } = info;
  let { avatar, stats } = author;
  return (
    <div className="video--info">
      <div className="video--text">
        <h1 style={{ fontSize: "clamp(1.1rem, 2vw, 1.7rem)" }}>{title}</h1>
        <p style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}>
          {description.substring(0, 130)}...
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="avatar">
          <img
            style={{ width: "45px", height: "45px" }}
            src={avatar[0]?.url}
            alt={title}
          />
          <span>{stats.subscribersText}</span>
        </div>
        <div className="video--stats">
          <div className="stat like">
            <BiLike />
            <span>{formatNumbers(info?.stats?.likes)}</span>
          </div>
          <div className="stat like">
            <BsEyeFill />
            <span>{formatViews(info?.stats?.views)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
