import React, { useEffect, useState } from "react";
import { Button, TableSortLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import {
  Box,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { PiUserFocus } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import {
  IoTimeOutline,
  IoMenu,
  IoFilter,
  IoBagRemoveOutline,
} from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineArrowOutward, MdOutlinePersonOutline } from "react-icons/md";
import { HiDotsVertical, HiOutlineDocumentDuplicate } from "react-icons/hi";
import { LuFiles } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AllJobsData, allJobsKanBanData } from "../../../dummy/Data";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import Spinner from "../../../utils/spinner";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import { SideNav } from "../../../widgets/sidenav";

export const JobPortal = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("Card");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(AllJobsData);
  const [filterData, setFilterData] = useState(AllJobsData);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const [anchorData, setAnchorData] = useState();
  const [loading, setLoading] = useState(true);
  const [showClonePopup, setShowClonePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [anchorjd, setAnchorjd] = useState();
  const jdOpen = Boolean(anchorjd);

  const [anchorFilter, setAnchorFilter] = React.useState(null);
  const openFilter = Boolean(anchorFilter);

  const handleClickFilter = (event) => {
    setAnchorFilter(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorFilter(null);
  };

  const handleJd = (event) => {
    setAnchorjd(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorjd(null);
    setAnchorData(null);
  };

  const closePopup = () => {
    setShowClonePopup(false);
    setShowDeletePopup(false);
  };

  const handleJobEdit = () => {
    console.log(anchorData);
    navigate("/job/createJob", { state: anchorData.id });
  };

  useEffect(() => {
    if (search === "") {
      setFilterData(data);
    } else {
      onSearchChange(search);
    }
  }, [search]);

  const onSearchChange = (name) => {
    let newArray = data?.filter((data) =>
      data?.jobName?.toLowerCase().includes(name?.toLowerCase())
    );
    setFilterData(newArray.length === 0 ? data : newArray);
  };

  const handleJobClone = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(`/cloneJob?clientId=${user.userId}&jobId=${anchorData.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response?.data.data);
        setLoading(false);
        setShowClonePopup(false);
        //setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        setShowClonePopup(false);
        console.log(e);
      });
  };

  const handleJobDelete = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(`/deleteJob?clientId=${user.userId}&jobId=${anchorData.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response?.data.data);
        setLoading(false);
        setShowDeletePopup(false);
        //setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        setShowDeletePopup(false);
        console.log(e);
      });
  };

  const handleStandard = () => {
    navigate("/job/outputofJobDescription", {
      state: { jobId: anchorData.id, jdAccess: true },
    });
  };

  const handleJobDescription = () => {
    navigate("/job/outputofJobDescription", {
      state: { jobId: anchorData.id, teamAccess: true },
    });
  };

  const handleIdentification = () => {
    navigate("/job/outputofJobDescription", {
      state: { jobId: anchorData.id, fullAccess: true },
    });
  };

  const handleFilter = (value) => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(value);
    setLoading(true);
    axiosInstance
      .get(`/getFilterJobs?clientId=${user.userId}&filterValue=${value}`)
      .then((response) => {
        console.log(response.data);
        setData(response?.data.data);
        setFilterData(response?.data.data);
        setLoading(false);
        //setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    handleCloseFilter();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(`/getAllJobs?clientId=${user.userId}&pageNo=1&pageSize=5`)
      .then((response) => {
        console.log(response.data);
        setData(response?.data.data);
        setFilterData(response?.data.data);
        setLoading(false);
        //setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const sortComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  };

  const jobStatusColor = (status) => {
    let color = "#ffffff";
    let bg = "#ffffff";

    if (status === "Interviewing") {
      color = "#FFA500";
      bg = "#FFA50020";
    }
    if (status === "Screening & Evaluation") {
      color = "#F3CA36";
      bg = "#F3CA3620";
    }
    if (status === "New Requirement") {
      color = "#5FAEDA";
      bg = "#5FAEDA20";
    }
    if (status === "Hiring Manager Review") {
      color = "#C89EC8";
      bg = "#C89EC820";
    }
    if (status === "Closed - Successful") {
      color = "#58A20F";
      bg = "#58A20F20";
    }
    if (status === "Offer Processing") {
      color = "#FE8D9E";
      bg = "#FE8D9E20";
    }

    return (
      <div
        style={{
          padding: "4px 8px",
          borderRadius: 20,
          backgroundColor: bg,
        }}>
        <p style={{ color: color, fontSize: 14 }}>{status}</p>
      </div>
    );
  };

  const sortedRows = filterData.sort((a, b) => sortComparator(a, b, orderBy));

  return (
    <div>
      <div className="flex">
        <SideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          {loading === true ? (
            <Spinner />
          ) : (
            <div>
              <div className="p-8 h-full w-full">
                <div>
                  <p
                    style={{
                      color: "#101828",
                      fontSize: 22,
                      fontWeight: 700,
                    }}>
                    Jobs Summary
                  </p>
                </div>
                <div className="py-5 grid grid-flow-col gap-8 justify-between items-center">
                  <div className="flex gap-5">
                    <ButtonGroup
                      style={{ color: "#008080" }}
                      aria-label="Medium-sized button group">
                      <Button
                        style={{
                          backgroundColor: "#F8F9FA",
                          color:
                            currentView === "Card" ? "#008080" : "#47546770",
                          borderColor: "#D0D5DD",
                          textTransform: "none",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        startIcon={<HiOutlineSquares2X2 />}
                        onClick={() => setCurrentView("Card")}>
                        Board View
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#F8F9FA",
                          color:
                            currentView === "List" ? "#008080" : "#47546770",
                          borderColor: "#D0D5DD",
                          textTransform: "none",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        startIcon={<IoMenu />}
                        onClick={() => setCurrentView("List")}>
                        List View
                      </Button>
                    </ButtonGroup>
                    <div>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CiSearch />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ minWidth: 412 }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {/* <FormControl fullWidth sx={{ minWidth: 130 }}>
                        <InputLabel id="dropdown-label">Filter Jobs</InputLabel>
                        <Select
                          size="small"
                          label="dropdown-label"
                          value={filterValue}
                          onChange={handleFilter}>
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Closed">Closed</MenuItem>
                          <MenuItem value="90Days">Past 90 Days</MenuItem>
                          <MenuItem value="365Days">Past 365 Days</MenuItem>
                          <MenuItem value="All">All</MenuItem>
                        </Select>
                      </FormControl> */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={handleClickFilter}
                      style={{
                        color: "#252525",
                        borderColor: "#D0D5DD",
                        textTransform: "none",
                        fontSize: 14,
                        fontWeight: 500,
                        borderRadius: 8,
                        width: 94,
                        height: 38,
                      }}
                      startIcon={<IoFilter style={{ color: "#252525" }} />}>
                      Filter
                    </Button>
                  </div>
                </div>
                <div className="pb-5">
                  <p
                    style={{
                      color: "#475467",
                      fontSize: 20,
                      fontWeight: 600,
                    }}>
                    All Jobs
                  </p>

                  {currentView === "Card" && (
                    <div className="grid grid-cols-3 gap-5 py-3">
                      {AllJobsData?.map((row, index) => {
                        return (
                          <div key={index}>
                            <Card sx={{ borderRadius: 3, px: 1 }}>
                              <CardContent>
                                <div className="py-2">
                                  <div className="flex gap-2 justify-between items-center">
                                    <p
                                      style={{
                                        color: "#101828",
                                        fontSize: 16,
                                        fontWeight: 500,
                                      }}>
                                      {row?.jobName}
                                    </p>
                                    {row?.newPost ? (
                                      <p
                                        style={{
                                          color: "#7D5AE2",
                                          backgroundColor: "#7D5AE215",
                                          fontSize: 12,
                                          fontWeight: 500,
                                          borderRadius: 3,
                                          paddingLeft: 8,
                                          paddingRight: 8,
                                          paddingBottom: 4,
                                        }}>
                                        New post
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <p
                                    style={{
                                      color: "#474D6A",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}>
                                    {row?.companyName}
                                  </p>
                                </div>

                                <div className="flex gap-3 items-center">
                                  <div className="flex gap-1 items-center">
                                    <GrLocation
                                      style={{ color: "#47546780" }}
                                    />
                                    <p
                                      style={{
                                        color: "#47546770",
                                        fontSize: 14,
                                      }}>
                                      {row?.location}
                                    </p>
                                  </div>
                                  <div className="flex gap-1 items-center">
                                    <IoTimeOutline
                                      style={{ color: "#47546780" }}
                                    />
                                    {row?.typeOfHire.map((data, index) => {
                                      return (
                                        <p
                                          key={index}
                                          style={{
                                            color: "#47546770",
                                            fontSize: 14,
                                            paddingRight: 5,
                                            borderRightWidth:
                                              index + 1 ===
                                              row?.typeOfHire?.length
                                                ? 0
                                                : 2,
                                          }}>
                                          {data}
                                        </p>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="grid grid-flow-row gap-1 mt-4">
                                  <p
                                    style={{
                                      color: "#47546770",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}>
                                    Client :{" "}
                                    <span style={{ color: "#101828" }}>
                                      {row?.hiringManager}
                                    </span>
                                  </p>
                                  <p
                                    style={{
                                      color: "#47546770",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}>
                                    Created Date :{" "}
                                    <span style={{ color: "#101828" }}>
                                      {row?.created}
                                    </span>
                                  </p>
                                </div>
                              </CardContent>
                              <Divider />
                              <CardActions>
                                <div className="w-full flex justify-between">
                                  {row?.jobStatus ? (
                                    <p
                                      style={{
                                        color: "#58A20F",
                                        fontSize: 14,
                                      }}>
                                      {row?.jobStatus}
                                    </p>
                                  ) : (
                                    <></>
                                  )}

                                  <div className="flex justify-end w-full">
                                    <Button
                                      size="small"
                                      onClick={() => {}}
                                      style={{
                                        color: "#008080",
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        textDecoration: "underline",
                                        padding: 0,
                                      }}
                                      endIcon={<MdOutlineArrowOutward />}>
                                      More Details
                                    </Button>
                                  </div>
                                </div>
                              </CardActions>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentView === "List" && (
                    <div className="py-3">
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
                                    }}>
                                    <TableSortLabel>Job Name</TableSortLabel>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Company
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Location
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Applied
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Client
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Job Type
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Job Status
                                  </TableCell>

                                  <TableCell
                                    sx={{
                                      bgcolor: "#F8F9FA",
                                      color: "#101828",
                                      border: 1,
                                      borderColor: "#D0D5DD50",
                                    }}>
                                    Job Description
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {AllJobsData?.map((row, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {row?.jobName}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {row?.companyName}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {row?.location}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",

                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {row.created}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",

                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {row.hiringManager}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                          display: "flex",
                                          gap: 2,
                                        }}>
                                        {row?.typeOfHire?.map((time) => {
                                          return (
                                            <p
                                              style={{
                                                color:
                                                  time === "Part Time"
                                                    ? "#0862CE"
                                                    : "#8314C7",
                                                fontSize: 14,
                                                fontWeight: 500,
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                paddingTop: 5,
                                                borderRadius: 100,
                                                paddingBottom: 5,
                                                backgroundColor:
                                                  time === "Part Time"
                                                    ? "#F1F7FF"
                                                    : "#FBF1FF",
                                              }}
                                              key={time}>
                                              {time}
                                            </p>
                                          );
                                        })}
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        {jobStatusColor(row?.jobStatus)}
                                      </TableCell>

                                      <TableCell
                                        align="center"
                                        padding="none"
                                        sx={{
                                          color: "#475467",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        <IconButton
                                          onClick={(e) => {
                                            handleJd(e);
                                            setAnchorData(row);
                                          }}>
                                          <HiDotsVertical
                                            style={{ color: "#D9D9D9" }}
                                          />
                                        </IconButton>
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
                  )}

                  {/*Actions menu */}
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    TransitionComponent={Fade}>
                    <MenuItem onClick={handleJobEdit}>
                      <div className="flex gap-1 items-center">
                        <TbEdit style={{ color: "#5FAEDA", fontSize: 14 }} />
                        <p
                          style={{
                            color: "#5FAEDA",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Edit
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => setShowDeletePopup(true)}>
                      <div className="flex gap-1 items-center">
                        <RiDeleteBin6Line
                          style={{ color: "#E05880", fontSize: 14 }}
                        />
                        <p
                          style={{
                            color: "#E05880",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Delete
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => setShowClonePopup(true)}>
                      <div className="flex gap-1 items-center">
                        <LuFiles style={{ color: "#58A20F", fontSize: 14 }} />
                        <p
                          style={{
                            color: "#58A20F",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Clone
                        </p>
                      </div>
                    </MenuItem>
                  </Menu>

                  {/*Filter menu */}
                  <Menu
                    id="filter-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorFilter}
                    open={openFilter}
                    onClose={handleCloseFilter}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    TransitionComponent={Fade}>
                    <MenuItem
                      onClick={() => {
                        handleFilter("Active");
                      }}>
                      <p
                        style={{
                          color: "#171717",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        Active
                      </p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFilter("Closed");
                      }}>
                      <p
                        style={{
                          color: "#171717",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        Closed
                      </p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFilter("90Days");
                      }}>
                      <p
                        style={{
                          color: "#171717",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        90Days
                      </p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFilter("365Days");
                      }}>
                      <p
                        style={{
                          color: "#171717",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        365Days
                      </p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleFilter("All");
                      }}>
                      <p
                        style={{
                          color: "#171717",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        All
                      </p>
                    </MenuItem>
                  </Menu>

                  {/* job description menu */}
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorjd}
                    open={jdOpen}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    TransitionComponent={Fade}>
                    <MenuItem onClick={handleStandard}>
                      <div className="flex gap-1 items-center">
                        <IoBagRemoveOutline
                          style={{ color: "#5FAEDA", fontSize: 22 }}
                        />
                        <p
                          style={{
                            color: "#5FAEDA",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Job Description (Standard)
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleJobDescription}>
                      <div className="flex gap-1 items-center">
                        <MdOutlinePersonOutline
                          style={{ color: "#58A20F", fontSize: 22 }}
                        />
                        <p
                          style={{
                            color: "#58A20F",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Job Description (Recruiter)
                        </p>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleIdentification}>
                      <div className="flex gap-1 items-center">
                        <PiUserFocus
                          style={{ color: "#FF6347", fontSize: 22 }}
                        />
                        <p
                          style={{
                            color: "#FF6347",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Job Identification
                        </p>
                      </div>
                    </MenuItem>
                  </Menu>

                  {/* Job Clone popup */}
                  <Dialog open={showClonePopup} onClose={closePopup}>
                    <DialogTitle>Confirm Clone</DialogTitle>
                    <IconButton
                      onClick={closePopup}
                      style={{ position: "absolute", top: 10, right: 10 }}>
                      <IoIosCloseCircleOutline />
                    </IconButton>
                    <Divider />
                    <DialogContent>
                      <div className="grid grid-flow-row gap-2">
                        <p
                          style={{
                            color: "#344054",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Do you want to clone the Job `{anchorData?.jobName}`
                        </p>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={closePopup}
                        variant="outlined"
                        style={{ color: "#475467", borderColor: "#D0D5DD" }}>
                        cancel
                      </Button>
                      <Button
                        onClick={handleJobClone}
                        variant="contained"
                        style={{
                          color: "#ffffff",
                          backgroundColor: "#008080",
                        }}>
                        clone
                      </Button>
                    </DialogActions>
                  </Dialog>

                  {/* delete job popup */}
                  <Dialog open={showDeletePopup} onClose={closePopup}>
                    <DialogTitle>Confirm Clone</DialogTitle>
                    <IconButton
                      onClick={closePopup}
                      style={{ position: "absolute", top: 10, right: 10 }}>
                      <IoIosCloseCircleOutline />
                    </IconButton>
                    <Divider />
                    <DialogContent>
                      <div className="grid grid-flow-row gap-2">
                        <p
                          style={{
                            color: "#344054",
                            fontSize: 14,
                            fontWeight: 500,
                          }}>
                          Do you want to clone the Job `{anchorData?.jobName}`
                        </p>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={closePopup}
                        variant="outlined"
                        style={{ color: "#475467", borderColor: "#D0D5DD" }}>
                        cancel
                      </Button>
                      <Button
                        onClick={handleJobDelete}
                        variant="contained"
                        style={{ color: "#ffffff", backgroundColor: "red" }}>
                        delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
