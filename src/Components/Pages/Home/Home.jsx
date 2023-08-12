import { useEffect, useRef } from "react";
import { FetchResults, formatViews } from "../../../api/FetchApi";
import { setHomeResults } from "../../../../redux/Slice";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { homeResults, category } = useSelector((data) => data.youtubeReducer);
  const searchCompRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    FetchResults(`search/?q=${category}`).then(({ data: { contents } }) =>
      dispatch(setHomeResults(contents))
    );
  }, [category]);

  return (
    <div className="search--component" ref={searchCompRef}>
      {homeResults && homeResults.length > 1 ? (
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
        <div>Loading...</div>
      )}
    </div>
  );
}
