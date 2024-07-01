import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  InputAdornment,
  Pagination,
  Radio,
  TextField,
} from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import {
  JobTemplateListViewData,
  assignmentBatchesData,
} from "../../../dummy/Data";
import { JobTemplateViewPopup } from "./jobTemplateViewPopup";

export const JobTemplateList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(assignmentBatchesData);
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState();
  const [viewData, setViewData] = useState(JobTemplateListViewData);
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
    // setViewData(null);
  };

  const pageChangeHandle = (pageNO) => {
    axios
      .get(
        `http://localhost:8080/xen/getAllJobTemplate?clientId=1&pageNo=${pageNO}&pageSize=5`
      )
      .then((data) => {
        console.log(data);
        setData(data.data);
        // setPage(data?.pageNo || 0);
      })
      .catch((e) => {
        console.log(e);
      });
    setPage(pageNO);
  };

  const PAGECOUNT =
    data?.totalCount > 0 ? Math.ceil(data?.totalCount / data?.pageSize) : 1;

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/xen/getAllJobTemplate?clientId=1&pageNo=1&pageSize=5"
      )
      .then((data) => {
        console.log(data);
        setData(data.data);
        setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div>
      <div className="flex">
        <ClientSideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          <div className="p-8">
            <div>
              <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                Choose Job Templates
              </p>
              <p style={{ color: "#475467", fontSize: 14, fontWeight: 400 }}>
                Please choose a job template from the available options.
              </p>
              <div className="py-5 flex justify-between items-center">
                <TextField
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  sx={{ minWidth: 320 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoSearchOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            padding="none"
                            sx={{ bgcolor: "#F8F9FA" }}
                          />
                          <TableCell
                            align="center"
                            sx={{ bgcolor: "#F8F9FA", color: "#101828" }}>
                            Serial Number
                          </TableCell>
                          <TableCell
                            sx={{ bgcolor: "#F8F9FA", color: "#101828" }}>
                            Template Name
                          </TableCell>
                          <TableCell
                            sx={{ bgcolor: "#F8F9FA", color: "#101828" }}>
                            Created By
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ bgcolor: "#F8F9FA", color: "#101828" }}>
                            Result
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.data?.map((row, index) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                              sx={{ cursor: "pointer" }}>
                              <TableCell padding="checkbox">
                                <Radio
                                  checked={selected?.id === row?.id}
                                  value={selected?.id === row?.id}
                                  onClick={() => setSelected(row)}
                                  sx={{
                                    color: "#D0D5DD",
                                    " &.Mui-checked": {
                                      color: "#66B2B2",
                                    },
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">{row.id}</TableCell>
                              <TableCell sx={{ color: "#475467" }}>
                                {row.batchName}
                              </TableCell>
                              <TableCell sx={{ color: "#475467" }}>
                                {row.createdBy}
                              </TableCell>
                              <TableCell padding="none" align="center">
                                <Button
                                  size="small"
                                  variant="text"
                                  style={{
                                    color: "#28A745",
                                    textTransform: "none",
                                  }}
                                  onClick={() => {
                                    //   viewData(row);
                                    setShowPopup(true);
                                  }}>
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <div className="flex justify-between items-center">
                  <p style={{ color: "#475467", fontSize: 14 }}>
                    Showing {data?.totalCount || 0} results found
                  </p>
                  <Pagination
                    count={PAGECOUNT}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, newvalue) => {
                      pageChangeHandle(newvalue);
                    }}
                  />
                </div>
              </Box>
            </div>
            <div className="py-8 gap-8 flex justify-end">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
                style={{ color: "#475467", borderColor: "#D0D5DD" }}>
                back
              </Button>
              <Button
                onClick={() => {
                  navigate("/job/jobDetailCreate", {
                    state: { selected: selected },
                  });
                }}
                variant="contained"
                style={{ color: "#ffffff", backgroundColor: "#008080" }}>
                Choose Template
              </Button>
            </div>

            <JobTemplateViewPopup
              open={showPopup}
              data={viewData}
              setClose={handleClose}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
