import { Link } from "react-router-dom";
export default function SearchChannel({
  channel: { title, avatar, stats, channelId },
  index,
}) {
  return (
    <Link to={`/channel/${channelId}`}>
      <div
        key={index}
        style={{ justifyContent: "center", alignItems: "center", gap: "1rem" }}
        className="search--card channel"
      >
        <img src={avatar[0]?.url} alt={title} />
        <h1 className="title">{title}</h1>
        <p>{stats?.subscribersText}</p>
      </div>
    </Link>
  );
}
