import React, { useEffect, useState } from "react";
import { deleteSnippetById, getMySnippets } from "../../Redux/App/app.actions";
import { AxiosError, AxiosResponse } from "axios";
import {
  Button,
  CircularProgress, // Import CircularProgress component from Material-UI
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const MySnippets = () => {
  const [loading, setLoading] = useState(false);
  const [mySnippets, setMySnippets] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [snippetToDelete, setSnippetToDelete] = useState(null);
  const [openConfirmationDialogue, setOpenConfirmationDialogue] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // New state for delete loading
  const handleCloseDialogue = () => setOpenConfirmationDialogue(false);
  const handleOpenDialogue = () => setOpenConfirmationDialogue(true);

  const handleClickDeleteSnippet = (snippetToBeDeleted) => {
    setSnippetToDelete(snippetToBeDeleted);
    handleOpenDialogue();
  };

  const handleClickCancelDelete = () => {
    setSnippetToDelete(null);
    handleCloseDialogue();
  };

  const handleClickConfirmDelete = () => {
    setDeleteLoading(true); // Set loading state when deleting starts
    deleteSnippetById(snippetToDelete._id)
      .then((res) => {
        console.log({ res });
        // If deletion is successful, update the UI accordingly
        setMySnippets(mySnippets.filter((snippet) => snippet._id !== snippetToDelete._id));
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setDeleteLoading(false); // Reset loading state after delete operation completes
        setSnippetToDelete(null);
        handleCloseDialogue();
      });
  };

  useEffect(() => {
    setLoading(true);
    getMySnippets()
      .then((res: AxiosResponse) => {
        setMySnippets(res.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        setError(err);
        setSuccess(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-10 flex justify-center items-center">
        <p>Getting your snippets...</p>
      </div>
    );
  }

  if (success && mySnippets?.length == 0) {
    return (
      <div className="w-full mt-10 flex flex-col justify-center items-center gap-2">
        <p>You don't have any snippets, click below button to create</p>
        <Button>
          <Link to="/">Home</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="mx-auto mt-5 w-[95%]">
      <Dialog
        open={openConfirmationDialogue}
        onClose={handleCloseDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="bg-dark-1">
          {"Are you sure want to delete the snippet?"}
        </DialogTitle>
        <DialogContent className="bg-dark-1">
          <DialogContentText id="alert-dialog-description">
            You cannot recover a deleted snippet.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="bg-dark-1">
          <Button disabled={deleteLoading} color="error" onClick={handleClickCancelDelete}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleClickConfirmDelete}
            autoFocus
            disabled={deleteLoading} // Disable button while delete operation is in progress
          >
            {deleteLoading ? <CircularProgress size={24} /> : "Confirm"}
            {/* Show loading indicator when delete is in progress */}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ maxHeight: "80vh", overFlowY: "auto" }}>
        <Table size="small" aria-label="a dense table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Last Updated At</TableCell>
              <TableCell>Last Updated By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mySnippets?.map((row) => (
              <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <div className="flex flex-row justify-left items-center">
                    <IconButton onClick={() => handleClickDeleteSnippet(row)}>
                      <DeleteOutline sx={{ color: "red" }} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <Link to={`/snippet/${row?._id}`} className="underline text-blue-300">
                    {row._id}
                  </Link>
                </TableCell>
                <TableCell>{row?.metaData?.createdAt}</TableCell>
                <TableCell>{row?.metaData?.lastUpdatedAt}</TableCell>
                <TableCell>{row?.metaData?.lastUpdatedBy?.firstName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MySnippets;
