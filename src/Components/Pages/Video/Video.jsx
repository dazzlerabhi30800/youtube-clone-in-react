import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FetchResults } from "../../../api/FetchApi";
import { useDispatch, useSelector } from "react-redux";
import { setVideoInfo } from "../../../../redux/Slice";
import ReactPlayer from "react-player";

export default function Video() {
  const { id } = useParams();
  const { videoInfo } = useSelector((data) => data.youtubeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!id) return;
    FetchResults(`video/details/?id=${id}`).then(({ data }) =>
      dispatch(setVideoInfo(data))
    );
  }, []);
  console.log(videoInfo);

  return (
    <div className="search--component">
      Video
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${id}`}
        width="100%"
        height="500px"
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
        controls
        playing={true}
        style={{ backgroundColor: "#000" }}
      />
    </div>
  );
}
