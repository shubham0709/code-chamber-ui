import React, { useEffect, useState } from "react";
import { getMySnippets } from "../../Redux/App/app.actions";
import { AxiosError, AxiosResponse } from "axios";
import {
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
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMySnippets()
      .then((res: AxiosResponse) => {
        setMySnippets(res.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return (
    <div className="mx-auto mt-5 w-[95%]">
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
                    <IconButton>
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
