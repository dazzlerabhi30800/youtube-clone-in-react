import { useEffect, useRef } from "react";
import { FetchResults, formatViews } from "../../../api/FetchApi";
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
                className="search--card"
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
