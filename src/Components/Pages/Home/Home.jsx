import { useEffect, useRef } from "react";
import { FetchResults } from "../../../api/FetchApi";
import { setHomeResults, setLoading } from "../../../../redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../utils/Loader";
import SearchCard from "./SearchCard";
import SearchChannel from "./SearchChannel";

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
      {homeResults.length > 1 && !loading ? (
        homeResults
          .filter(
            (item, index, arr) =>
              item?.type !== "playlist" &&
              arr.findIndex(
                (elem) => elem?.video?.videoId === item?.video?.videoId
              ) === index
          )
          .map((item, index) => {
            let { channel, video, type } = item;
            if (type === "video") {
              return <SearchCard thumbnail={0} video={video} />;
            } else {
              return <SearchChannel channel={channel} />;
            }
          })
      ) : (
        <Loader />
      )}
    </div>
  );
}
