import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import NoDataFound from "../../../../assets/images/noData Found.png";
import { useState } from "react";
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
  LinearProgress,
  TextField,
  linearProgressClasses,
  styled,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoFilterSharp, IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { IoTimeOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineArrowOutward } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { LuFiles } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AllJobsData } from "../../../dummy/Data";
import { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import Spinner from "../../../utils/spinner";
import {
  IoIosCloseCircleOutline,
  IoMdRemoveCircleOutline,
} from "react-icons/io";
import { FaLink } from "react-icons/fa";

export const AllJobs = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("Card");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const [anchorData, setAnchorData] = useState();
  const [loading, setLoading] = useState(true);
  const [showClonePopup, setShowClonePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [anchorjd, setAnchorjd] = useState();
  const jdOpen = Boolean(anchorjd);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleJd = (event) => {
    setAnchorjd(event.currentTarget);
  }

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
    navigate("/job/createJob", { state : anchorData.id})
  }

  const handleJobClone = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(
        `/cloneJob?clientId=${user.userId}&jobId=${anchorData.id}`,
      )
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
  }

  const handleJobDelete = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(
        `/deleteJob?clientId=${user.userId}&jobId=${anchorData.id}`,
      )
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
  }


  const handleStandard = () => {
    navigate("/job/outputofJobDescription", {state: { jobId : anchorData.id, fullAccess : true} })
  }

  const handleJobDesc = () => {
    navigate("/job/outputofJobDescription", {state: { jobId : anchorData.id, teamAccess : true} })
  }

  const handleIdentification = () => {
    navigate("/job/outputofJobDescription", {state: { jobId : anchorData.id, jdAccess : true} })
  }



  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true)
    axiosInstance
      .get(
        `/getAllJobs?clientId=${user.userId}&pageNo=1&pageSize=5`,
      )
      .then((response) => {
        console.log(response.data);
        setData(response?.data.data);
        setLoading(false);
        //setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5.5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#ebf6f1",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: `#46BD84`,
    },
  }));

  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <div className="flex">
        <ClientSideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          { loading === true ? 
          (
            <Spinner/>
          )
          :
          (
            <div>
            { data.length === 0 ? (
            <div className="p-8 h-full">
              <div>
                <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                  All Jobs
                </p>
                <Button
                  size="small"
                  style={{
                    color: "#008080",
                    fontSize: 18,
                    textTransform: "none",
                  }}
                  onClick={() => {
                    navigate("/job/createJob", { state : { new : true}});
                  }}>
                  Add the first job to initiate the list
                </Button>
                <p style={{ color: "#475467", fontSize: 14, fontWeight: 400 }}>
                  Start the process by selecting an option: use an existing job
                  template or create a new one job template.
                </p>
              </div>
              <div className="flex justify-center items-center text-center h-full">
                <div className="-mt-20">
                  <img src={NoDataFound} alt="No Data Found" />
                  <p
                    style={{
                      color: "#101828",
                      fontSize: 20,
                      fontWeight: 500,
                      marginTop: 25,
                    }}>
                    Jobs Summary
                  </p>
                  <Button
                    size="small"
                    style={{
                      color: "#008080",
                      fontSize: 18,
                      textTransform: "none",
                    }}
                    onClick={() => {
                      navigate("/job/createJob", { state : { new : true}});
                    }}>
                    Add the first job to initiate the list
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 h-full">
              <div>
                <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                  Jobs Summary
                </p>
              </div>
              <div className="py-5 grid grid-flow-col gap-8 justify-between items-center">
                <ButtonGroup
                  style={{ color: "#008080" }}
                  aria-label="Medium-sized button group">
                  <Button
                    style={{
                      backgroundColor: "#F8F9FA",
                      color: currentView === "Card" ? "#008080" : "#47546770",
                      borderColor: "#D0D5DD",
                      textTransform: "none",
                    }}
                    startIcon={<HiOutlineSquares2X2 />}
                    onClick={() => setCurrentView("Card")}>
                    Board View
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#F8F9FA",
                      color: currentView === "List" ? "#008080" : "#47546770",
                      borderColor: "#D0D5DD",
                      textTransform: "none",
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
                    sx={{ minWidth: 350 }}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="outlined"
                    style={{
                      borderColor: "#D0D5DD",
                      color: "#252525",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 8,
                    }}
                    startIcon={<IoFilterSharp />}>
                    Filter
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/job/createJob", { state: { new: true } })
                    }
                    style={{
                      color: "#008080",
                      background: "#EAF4F5",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 8,
                    }}>
                    Add Job
                  </Button>
                </div>
              </div>
              <div className="pb-5">
                <p style={{ color: "#475467", fontSize: 20, fontWeight: 600 }}>
                  All Jobs
                </p>

                {currentView === "Card" && 
                (
                  <div className="grid grid-cols-3 gap-5 py-3">
                    {data?.map((row, index) => {
                      return (
                        <div key={index}>
                          <Card sx={{ borderRadius: 3, px: 1 }}>
                            <CardContent>
                              <div className="flex justify-between gap-2">
                                <div className="flex gap-2">
                                  <p
                                    style={{
                                      color: "#101828",
                                      fontSize: 16,
                                      fontWeight: 500,
                                    }}>
                                    {row?.jobName}
                                  </p>
                                  {row?.new ? (
                                    <p
                                      style={{
                                        color: "#7D5AE2",
                                        backgroundColor: "#7D5AE210",
                                        fontSize: 16,
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
                                <div>
                                  <IconButton
                                    onClick={(e) => {
                                      handleClick(e);
                                      setAnchorData(row);
                                    }}>
                                    <HiDotsVertical
                                      style={{ color: "#D9D9D9" }}
                                    />
                                  </IconButton>
                                </div>
                              </div>
                              <div className="flex gap-3 items-center">
                                <div className="flex gap-1 items-center">
                                  <GrLocation style={{ color: "#47546780" }} />
                                  <p
                                    style={{
                                      color: "#47546770",
                                      fontSize: 14,
                                    }}>
                                    {row?.location}
                                  </p>
                                </div>
                                <div className="flex gap-1 items-center">
                                  <IoTimeOutline style={{ color: "#47546780" }} />
                                  {/* {row?.typeOfHire.map((data, index) => {
                                    return ( */}
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
                                        {row.compensation}
                                      </p>
                                    {/* );
                                  })} */}
                                </div>
                              </div>
                              <div className="pt-3 flex gap-3 rounded-lg">
                                <div className="w-12 h-12">
                                  <img
                                    src={row?.image}
                                    alt="company logo"
                                    style={{ borderRadius: 8 }}
                                  />
                                </div>
                                <div className="grid grid-flow-row gap-1">
                                  <p style={{ color: "#475467", fontSize: 14 }}>
                                    {row?.companyName}
                                  </p>
                                  <p
                                    style={{
                                      color: "#47546770",
                                      fontSize: 12,
                                      fontWeight: 500,
                                    }}>
                                    Hiring Manger :{" "}
                                    <span style={{ color: "#101828" }}>
                                      {row?.hiringManager}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                            <Divider />
                            <CardActions>
                              {row?.jobProgress < 100 ? (
                                <div className="w-full ">
                                  <div className="flex justify-between pb-1">
                                    <p
                                      style={{
                                        color: "#121212",
                                        fontSize: 12,
                                        fontWeight: 500,
                                      }}>
                                      Job Progress
                                    </p>
                                    <p
                                      style={{
                                        color: "#121212",
                                        fontSize: 12,
                                        fontWeight: 500,
                                      }}>
                                      {row?.jobProgress} %
                                    </p>
                                  </div>
                                  <Box sx={{ width: "70%" }}>
                                    <BorderLinearProgress
                                      variant="determinate"
                                      value={row?.jobProgress || 0}
                                    />
                                  </Box>
                                  <div className="flex justify-end w-full">
                                    <Button
                                      size="small"
                                      onClick={() => navigate("/job/createJob", { state : row.id })}
                                      style={{
                                        color: "#008080",
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        textDecoration: "underline",
                                        padding: 0,
                                      }}
                                      endIcon={<MdOutlineArrowOutward />}>
                                      Complete Job
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full ">
                                  <div className="flex justify-between pb-1">
                                    <p
                                      style={{
                                        color: "#121212",
                                        fontSize: 12,
                                        fontWeight: 500,
                                      }}>
                                      Job Progress
                                    </p>
                                    <p
                                      style={{
                                        color: "#121212",
                                        fontSize: 12,
                                        fontWeight: 500,
                                      }}>
                                      {row?.jobProgress} %
                                    </p>
                                  </div>
                                  <Box sx={{ width: "70%" }}>
                                    <BorderLinearProgress
                                      variant="determinate"
                                      value={row?.jobProgress || 100}
                                    />
                                  </Box>
                                  <div className="flex justify-end w-full">
                                    <Button
                                      size="small"
                                      onClick={() => navigate("/job/createJob", { state : row.id})}
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
                              )}
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
                                  Job Name
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
                                  posted on
                                </TableCell>
                                <TableCell
                                  sx={{
                                    bgcolor: "#F8F9FA",
                                    color: "#101828",
                                    border: 1,
                                    borderColor: "#D0D5DD50",
                                  }}>
                                  Hiring Manger
                                </TableCell>
                                <TableCell
                                  sx={{
                                    bgcolor: "#F8F9FA",
                                    color: "#101828",
                                    border: 1,
                                    borderColor: "#D0D5DD50",
                                  }}>
                                  Access Job Description
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    bgcolor: "#F8F9FA",
                                    color: "#101828",
                                    border: 1,
                                    borderColor: "#D0D5DD50",
                                  }}>
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data?.map((row, index) => {
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
                                      {row?.location}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#475467",
                                        padding: 0,
                                        border: 1,
                                        borderColor: "#D0D5DD50",
                                      }}>
                                       {row.postedTime}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        color: "#475467",
                                        border: 1,
                                        borderColor: "#D0D5DD50",
                                      }}>
                                      {row?.hiringManager}
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
                                          handleClick(e);
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
                      <FaLink style={{ color: "#5FAEDA", fontSize: 14 }} />
                      <p
                        style={{
                          color: "#5FAEDA",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        Retrieve Standard Job Description
                      </p>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleJobDesc}>
                    <div className="flex gap-1 items-center">
                      <FaLink
                        style={{ color: "#E05880", fontSize: 14 }}
                      />
                      <p
                        style={{
                          color: "#E05880",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        Retrieve Job Description
                      </p>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleIdentification}>
                    <div className="flex gap-1 items-center">
                      <FaLink style={{ color: "#58A20F", fontSize: 14 }} />
                      <p
                        style={{
                          color: "#58A20F",
                          fontSize: 14,
                          fontWeight: 500,
                        }}>
                        Retrieve Job Identification
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
                      style={{ color: "#ffffff", backgroundColor: "#008080" }}>
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
          )}
          </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
