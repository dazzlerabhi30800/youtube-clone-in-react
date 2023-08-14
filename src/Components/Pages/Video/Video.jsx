import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchResults } from "../../../api/FetchApi";
import { useDispatch, useSelector } from "react-redux";
import { setRelatedVideo, setVideoInfo } from "../../../../redux/Slice";
import ReactPlayer from "react-player";
import VideoInfo from "./VideoInfo";
import RelatedVideo from "./RelatedVideo";
import Resize from "../../specialUtils/Resize";

export default function Video() {
  const { id } = useParams();
  const { videoInfo, relatedVideo } = useSelector(
    (data) => data.youtubeReducer
  );
  const { width } = Resize();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    FetchResults(`video/details/?id=${id}`).then(({ data }) =>
      dispatch(setVideoInfo(data))
    );

    FetchResults(`video/related-contents/?id=${id}`).then(
      ({ data: { contents } }) => dispatch(setRelatedVideo(contents))
    );
  }, [id]);

  return (
    <section className="video--component">
      <div className="video--player">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className="videoPlayer"
          width="100%"
          height={width >= 700 ? (width >= 1200 ? "650px" : "550px") : "400px"}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          controls={true}
          playing={false}
          style={{ backgroundColor: "#000", width: "100%" }}
        />
        {videoInfo && <VideoInfo info={videoInfo} />}
      </div>
      <div className="related--video--container">
        {relatedVideo &&
          relatedVideo
            .filter((item) => item.type === "video")
            .map((info, index) => <RelatedVideo key={index} info={info} />)}
      </div>
    </section>
  );
}
