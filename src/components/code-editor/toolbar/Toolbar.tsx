import { ContentCopy, GetApp, Share } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const Toolbar = ({ handleClickCopyContent, handleClickCopyLink, handleClickDownloadFile }) => {
  return (
    <div className="flex flex-row justify-start items-center gap-3">
      <Tooltip title="Copy Content">
        <IconButton onClick={handleClickCopyContent}>
          <ContentCopy />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share">
        <IconButton onClick={handleClickCopyLink}>
          <Share />
        </IconButton>
      </Tooltip>
      <Tooltip title="Download File">
        <IconButton onClick={handleClickDownloadFile}>
          <GetApp />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
