import { Code, HourglassEmpty } from "@mui/icons-material";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCreateCodeSnippet } from "../Redux/App/app.actions";
import { CREATE_SNIPPET_SUCCESS } from "../Redux/App/app.actionTypes";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const createSnippetLoading = useSelector((state) => state.app.createSnippet.isLoading);

  const handleClickShareCodeNow = () => {
    if (!isAuth) {
      navigate("/auth/signin");
      return;
    }
    dispatch(handleCreateCodeSnippet()).then((res) => {
      console.log({ res });
      if (res.type === CREATE_SNIPPET_SUCCESS) {
        navigate(`/snippet/${res.payload._id}`);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <p className="text-5xl mt-10 text-center">Share Code in Real-time with Developers</p>
      <p className="text-xl text-center">
        An online code editor for interviews, troubleshooting, teaching & more…
      </p>
      <Button
        color="warning"
        size="large"
        startIcon={createSnippetLoading ? <HourglassEmpty /> : <Code />}
        disabled={createSnippetLoading}
        variant="outlined"
        onClick={handleClickShareCodeNow}
        sx={{ boxShadow: "rgba(250, 12, 46, 0.3) 0px 48px 100px 0px;" }}
      >
        Share code now
      </Button>
      <div className="flex flex-row w-3/4 justify-center items-center mt-5 gap-2">
        <ReactPlayer
          className="react-player bg-dark-2"
          url="trailer.mp4"
          width="100%"
          height="400px"
          controls={false}
          playing={true}
          volume={0}
          muted={true}
          loop={true}
        />

        <ReactPlayer
          className="react-player bg-dark-2"
          url="trailer.mp4"
          width="100%"
          height="400px"
          controls={false}
          playing={true}
          volume={0}
          muted={true}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Landing;
