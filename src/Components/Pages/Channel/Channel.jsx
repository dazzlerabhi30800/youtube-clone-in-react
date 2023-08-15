import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchResults } from "../../../api/FetchApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelData,
  setChannelVideo,
  setLoading,
} from "../../../../redux/Slice";
import SearchCard from "../Home/SearchCard";
import { Loader } from "../../utils/Loader";

export default function Channel() {
  const { channelData, channelVideo, loading } = useSelector(
    (data) => data.youtubeReducer
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    dispatch(setLoading(true));
    FetchResults(`channel/details/?id=${id}`).then(({ data }) =>
      dispatch(setChannelData(data))
    );
    FetchResults(`channel/videos/?id=${id}`).then(({ data: { contents } }) => {
      dispatch(setChannelVideo(contents));
      dispatch(setLoading(false));
    });
  }, []);

  if (loading)
    return (
      <section className="loading--section">
        <Loader />
      </section>
    );
  return (
    <section className="channel--section">
      <div
        style={{
          backgroundImage: `url(${channelData?.banner?.desktop[3]?.url})`,
        }}
        className="banner"
      ></div>
      <div className="channel--info">
        <img src={channelData?.avatar[1]?.url} alt={channelData?.title} />
        <div className="channel--text">
          <h1>{channelData?.title}</h1>
          <p>{channelData?.stats?.subscribersText}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span> {channelData?.username}</span>
            <span>{channelData?.country}</span>
          </div>
        </div>
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{channelData?.description}</p>
      </div>
      <div className="channel--video">
        {channelVideo &&
          channelVideo.map((item, index) => {
            let { video } = item;
            return <SearchCard thumbnail={3} video={video} />;
          })}
      </div>
    </section>
  );
}
