import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axiosInstance from "../../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const AssignCandidatePopUp = ({ data, setClose, modelType, open }) => {
  const { batchId } = useLocation().state || {};
  const navigate = useNavigate();

  const handleAsignCandidates = async () => {
    //  navigate("/assesmentResult");
    const user = JSON.parse(localStorage.getItem("token"));
    axiosInstance
      .post(`/saveClientAssessmentBatch?&clientId=${user?.userId}`, data)
      .then((response) => {
        navigate("/assessmentsList");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Dialog
      open={open}
      onClose={setClose}
      PaperProps={{ sx: { minWidth: "55%" } }}
    >
      <DialogTitle sx={{ color: "#141414", fontWeight: 500 }}>
        Batch Details
      </DialogTitle>
      <IconButton
        onClick={setClose}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        <IoIosCloseCircleOutline />
      </IconButton>
      <Divider />
      <DialogContent>
        <div>
          <div className="flex justify-between items-start">
            <div>
              <p style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 500 }}>
                Batch Name :
              </p>
              <p style={{ color: "#505050", fontSize: 16, fontWeight: 500 }}>
                {data?.batchName}
              </p>
            </div>
            <Button style={{ color: "#5FAEDA", textTransform: "none" }}>
              Edit
            </Button>
          </div>
          <div className="py-3">
            <div className="flex justify-between items-center">
              <p style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 500 }}>
                Assignment selected for this batch
              </p>{" "}
              <Button style={{ color: "#5FAEDA", textTransform: "none" }}>
                Edit
              </Button>
            </div>
            <div className="grid grid-flow-row gap-1">
              {data?.selectedAssignment?.map((row, index) => {
                return (
                  <p
                    key={index}
                    style={{ color: "#505050", fontSize: 16, fontWeight: 500 }}
                  >
                    {row?.name}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="py-3">
            <div className="flex justify-between items-center">
              <p style={{ color: "#1A1A1A", fontSize: 18, fontWeight: 500 }}>
                Candidates assigned to this batch
              </p>
              <Button style={{ color: "#5FAEDA", textTransform: "none" }}>
                Edit
              </Button>
            </div>
            <Box sx={{ width: "100%" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}
                        >
                          Candidate Names
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}
                        >
                          Email Id
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}
                        >
                          Mobile Number
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.assignCandidate?.map((row, index) => {
                        return (
                          <TableRow
                            key={index}
                            hover
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell
                              sx={{
                                color: "#475467",
                                border: 1,
                                borderColor: "#D0D5DD50",
                              }}
                            >
                              {row.name}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#475467",
                                border: 1,
                                borderColor: "#D0D5DD50",
                              }}
                            >
                              {row.emailId}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#475467",
                                border: 1,
                                borderColor: "#D0D5DD50",
                              }}
                            >
                              {row.mobileNo}
                            </TableCell>
                            <TableCell sx={{ color: "#58A20F" }}>
                              {modelType === "save" ? "" : row.status}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </div>
          <div className="flex justify-end py-5 gap-5">
            <Button
              onClick={() => {
                navigate(0);
              }}
              variant="outlined"
              style={{ borderColor: "#D0D5DD", color: "#475467" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAsignCandidates}
              variant="contained"
              style={{ backgroundColor: "#008080", color: "#ffffff" }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
