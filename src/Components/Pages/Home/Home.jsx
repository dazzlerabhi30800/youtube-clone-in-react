import { useEffect, useRef } from "react";
import {
  FetchResults,
  formatSeconds,
  formatViews,
} from "../../../api/FetchApi";
import { setHomeResults, setLoading } from "../../../../redux/Slice";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";

export default function Home() {
  const { homeResults, category, loading } = useSelector(
    (data) => data.youtubeReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    FetchResults(`search/?q=${category}`).then(({ data: { contents } }) => {
      dispatch(setHomeResults(contents));
      dispatch(setLoading(false));
    });
  }, [category]);
  console.log(homeResults);

  const handleMouseEnter = (video, id, thumbnail) => {
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
    <div className={`search--component ${loading ? "centered" : ""}`}>
      {homeResults && homeResults.length > 1 && !loading ? (
        homeResults
          .filter((item) => item?.type === "video")
          .map((item, index) => {
            let { video, type } = item;
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${video?.thumbnails[0]?.url})`,
                }}
                onMouseEnter={() =>
                  handleMouseEnter(
                    video,
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
                      {formatViews(
                        video?.stats?.views || video?.stats?.viewers
                      )}
                    </span>
                    <span>{video?.publishedTimeText}</span>
                    <span>{formatSeconds(video.lengthSeconds)}</span>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <Loader />
      )}
    </div>
  );
}
