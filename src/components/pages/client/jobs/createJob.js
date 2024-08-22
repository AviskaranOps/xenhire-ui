import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControlLabel,
  Switch,
  IconButton,
  styled,
  TextField,
  ButtonGroup,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { HiDotsVertical } from "react-icons/hi";
import { FaLink } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { CiEdit, CiSearch } from "react-icons/ci";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoBagRemoveOutline, IoMenu, IoPeopleOutline } from "react-icons/io5";
import { useNavigate, useLocation, useFetcher } from "react-router-dom";
import { BsThreeDots, BsFillCameraFill } from "react-icons/bs";
import { TiFolderOpen } from "react-icons/ti";
import { IoIosCalendar, IoIosCloseCircleOutline } from "react-icons/io";
import { BiBell } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import {
  HiOutlineSquares2X2,
  HiSquares2X2,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";
import {
  MdOutlineWatchLater,
  MdOutlineRemoveRedEye,
  MdOutlinePersonOutline,
} from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { FaArrowRight } from "react-icons/fa6";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import {
  candidateDetailsData,
  candistaeDetailsDataNew,
  createJobData,
  kanvanTaskData,
} from "../../../dummy/Data";
import NoDataFound from "../../../../assets/images/noData Found.png";
import Spinner from "../../../utils/spinner";
import { PiUserFocus } from "react-icons/pi";
import { CreateJobDataTokanBan } from "../../../utils/function";

export const CreateJob = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(createJobData);
  const [state, setState] = useState(location.state);
  const userName = JSON.parse(localStorage.getItem("token"))?.username
    ? JSON.parse(localStorage.getItem("token"))?.username
    : userData.name;
  const [jobId, setJobId] = useState(0);
  const [accessDescription, setAccessDescription] = useState(true);
  const [title, setTitle] = useState(userName);
  const [showRecomandation, setShowRecomandation] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(
    state?.selected || candistaeDetailsDataNew
  );
  const [loading, setLoading] = useState(false);
  const [anchorjd, setAnchorjd] = useState();
  const jdOpen = Boolean(anchorjd);
  const [anchorLd, setAnchorLd] = useState();
  const ldOpen = Boolean(anchorLd);
  const [anchorkb, setAnchorkb] = useState();
  const kbOpen = Boolean(anchorkb);
  const [jobCompletion, setJobCompletion] = useState(0);
  const [tableWidth, setTableWidth] = useState(1200);
  const [search, setSearch] = useState("");
  const [currentView, setCurrentView] = useState("Card");

  // radio profile
  const [publishFeature, setPublishFeature] = useState(false);
  const [screeningQuestions, setScreeningQuestions] = useState(false);
  const [assessments, setAssessments] = useState(false);
  const [sourcing, setSourcing] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const [serviceStaffing, setServiceStaffing] = useState(false);
  const [jobIdentity, setJobIdentity] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [fsspopup, setFsspopup] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [tasks, setTasks] = useState(
    CreateJobDataTokanBan(candistaeDetailsDataNew)
  );

  useEffect(() => {
    const jobId = localStorage.getItem("jobId");
    if (jobId !== 0) {
      setJobIdentity(jobId);
    } else {
      setJobIdentity(0);
    }
  }, [jobIdentity]);

  useEffect(() => {
    if (state?.showPopup) {
      setShowPopup(true);
    }
  }, [state]);

  const handleJd = (event) => {
    setAnchorjd(event.currentTarget);
  };

  const handleKd = (event) => {
    setAnchorkb(event.currentTarget);
  };

  const handleLd = (event) => {
    setAnchorLd(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorjd(null);
    setAnchorLd(null);
    setAnchorkb(null);
  };

  const saveJobTitle = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const clientId = user.userId;
    setLoading(true);
    axiosInstance
      .post(`/saveJobTitle`, { clientId, jobTitle })
      .then((response) => {
        console.log(response);
        setUserData(response.data);
        setState({ new: false, showPopup: false });
        localStorage.setItem("jobId", response.data.id);
        setLoading(false);
        // setPage(data?.pageNo || 1);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    closePopup();
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: `linear-gradient(90deg, #66B2B2 ${
        100 - userData?.jobCompletd ? userData?.jobCompletd : 0
      }%, #008080 100%)`,
    },
  }));

  const BorderLinearProgresskan = styled(LinearProgress)(({ theme }) => ({
    height: 4.9,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: "#58A20F",
    },
  }));
  const navigate = useNavigate();

  const changeUserData = () => {
    if (userData.jobCompletd > 40) {
      setUserData({
        name: "Adobe",
        jobCompletd: 28,
      });
    } else {
      setUserData(createJobData);
    }
  };

  // useEffect(() => {
  //   if (state) {
  //     console.log(state);
  //     setJobId(state);
  //   }
  // }, [state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    let jobId = localStorage.getItem("jobId");
    console.log(jobId);
    if ((state?.new || state === null) && jobId === 0) {
    } else {
      if (state) {
        jobId = state;
      }
      setLoading(true);
      axiosInstance
        .get(
          `/getAllJobCandidates?clientId=${user.userId}&jobId=${jobId}&pageNo=1&pageSize=10`
        )
        .then((response) => {
          console.log(response);
          setCandidateDetails(response.data);
          setTasks(CreateJobDataTokanBan(response.data));
          setLoading(false);
          // setPage(data?.pageNo || 1);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   let jobId = localStorage.getItem("jobId");
  //   console.log(jobId);
  //   if ((state?.new || state === null) && jobId === 0) {
  //   } else {
  //     if (state) {
  //       jobId = state;
  //     }
  //     setLoading(true);
  //     axiosInstance
  //       .get(
  //         `/getAllJobCandidates?clientId=${user.userId}&jobId=${jobId}&pageNo=1&pageSize=10`
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         setCandidateDetails(response.data);
  //         setLoading(false);
  //         // setPage(data?.pageNo || 1);
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //         console.log(e);
  //       });
  //   }
  // }, []);

  const handleDtpAccess = (row) => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (row.dtpStatus === "Request Sent") {
      console.log("request already sent");
    } else {
      axiosInstance
        .get(
          `/requestDtpAccess?clientId=${row.clientId}&candidateId=${row.candidateId}`
        )
        .then((response) => {
          console.log(response);
          setCandidateDetails((prevItems) =>
            prevItems.map((item) =>
              item.id === row.id ? { ...item, notify: "Request Sent" } : item
            )
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleSwitch = (value, switchType) => {
    if (switchType === "screening") setScreeningQuestions(value);
    if (switchType === "assessment") setAssessments(value);
    if (switchType === "sourcing" && serviceStaffing === false) setSourcing(value);
    if (switchType === "onboarding" && serviceStaffing == false) setOnboarding(value);
    if (switchType === "serviceStaffing" && value === true) {
      setServiceStaffing(value);
      setSourcing(false);
      setOnboarding(false);
    }
    if (switchType === "publishFeature") setPublishFeature(value);
    if(switchType === "serviceStaffing" && value == false) {
      
    }
    else if((switchType === "sourcing" && serviceStaffing === true) || (switchType === "onboarding" && serviceStaffing === true)){

    }
    else{
      axiosInstance
        .get(
          `/updateSwitch?clientId=${userData.clientId}&jobId=${userData.id}&value=${value}&switchType=${switchType}`
        )
        .then((response) => {
          console.log(response);
          setFsspopup(false);
        })
        .catch((e) => {
          console.log(e);
          setFsspopup(false);
        });
    }
  };

  // const handleAssessment = (value) => {
  //   setAssessments(value);
  //   axiosInstance
  //     .get(
  //       `/updateAssessment?clientId=${userData.clientId}&jobId=${userData.id}&assessment=${value}`
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(state);
    let jobId = localStorage.getItem("jobId");
    console.log(jobId);
    if ((state?.new || state === null) && jobId === 0) {
    } else {
      if (state) {
        jobId = state;
      }
      axiosInstance
        .get(`/getJobDetails?clientId=${user.userId}&jobId=${jobId}`)
        .then((data) => {
          console.log(data);
          setUserData(data?.data);
          setScreeningQuestions(data?.data.screening);
          setAssessments(data?.data?.assessment);
          setSourcing(data?.data?.sourcingHelp);
          setOnboarding(data?.data?.onboardingHelp);
          setServiceStaffing(data?.data?.fullServiceStaffingHelp);
          setPublishFeature(data?.data?.publishFeature);
          if (
            data.data?.jobDetail &&
            data.data?.workValues &&
            data.data?.team &&
            data.data?.icp
          ) {
            setAccessDescription(false);
          }
          if (data.data?.jobDetail) {
            setJobCompletion(25);
            setTitle(data.data?.title);
          }
          if (data.data?.jobDetail && data.data?.workValues) {
            setJobCompletion(50);
          }
          if (
            data.data?.jobDetail &&
            data.data?.workValues &&
            data.data?.team
          ) {
            setJobCompletion(75);
          }
          if (
            data.data?.jobDetail &&
            data.data?.workValues &&
            data.data?.team &&
            data.data?.icp
          ) {
            setJobCompletion(100);
          }
          localStorage.setItem("jobId", data.data.id);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   console.log(state);
  //   let jobId = localStorage.getItem("jobId");
  //   console.log(jobId);
  //   if ((state?.new || state === null) && jobId === 0) {
  //   } else {
  //     if (state) {
  //       jobId = state;
  //     }
  //     axiosInstance
  //       .get(`/getJobDetails?clientId=${user.userId}&jobId=${jobId}`)
  //       .then((data) => {
  //         console.log(data);
  //         setUserData(data?.data);
  //         setScreeningQuestions(data?.data.screening);
  //         setAssessments(data?.data?.assessment);
  //         if (
  //           data.data?.jobDetail &&
  //           data.data?.workValues &&
  //           data.data?.team &&
  //           data.data?.icp
  //         ) {
  //           setAccessDescription(false);
  //         }
  //         if (data.data?.jobDetail) {
  //           setJobCompletion(25);
  //           setTitle(data.data?.title);
  //         }
  //         if (data.data?.jobDetail && data.data?.workValues) {
  //           setJobCompletion(50);
  //         }
  //         if (
  //           data.data?.jobDetail &&
  //           data.data?.workValues &&
  //           data.data?.team
  //         ) {
  //           setJobCompletion(75);
  //         }
  //         if (
  //           data.data?.jobDetail &&
  //           data.data?.workValues &&
  //           data.data?.team &&
  //           data.data?.icp
  //         ) {
  //           setJobCompletion(100);
  //         }
  //         localStorage.setItem("jobId", data.data.id);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // console.log(source, destination);
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId].items);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      const updatedTasks = {
        ...tasks,
        [source.droppableId]: {
          ...tasks[source.droppableId],
          items,
        },
      };

      // setTasks((prev) => ({
      //   ...prev,
      //   [source.droppableId]: {
      //     ...prev[source.droppableId],
      //     items,
      //   },
      // }));
      setTasks(updatedTasks);
      // onTaskChange(source.droppableId, destination.droppableId, movedItem);
    } else {
      const sourceItems = Array.from(tasks[source.droppableId].items);
      const [movedItem] = sourceItems.splice(source.index, 1);
      const destinationItems = Array.from(tasks[destination.droppableId].items);
      destinationItems.splice(destination.index, 0, movedItem);

      const updatedTasks = {
        ...tasks,
        [source.droppableId]: {
          ...tasks[source.droppableId],
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...tasks[destination.droppableId],
          items: destinationItems,
        },
      };

      // setTasks((prev) => ({
      //   ...prev,
      //   [source.droppableId]: {
      //     ...prev[source.droppableId],
      //     items: sourceItems,
      //   },
      //   [destination.droppableId]: {
      //     ...prev[destination.droppableId],
      //     items: destinationItems,
      //   },
      // }));
      setTasks(updatedTasks);
      onTaskChange(source.droppableId, destination.droppableId, movedItem);
    }
  };

  const onTaskChange = (source, destination, data) => {
    console.log(source, destination, data);
    const user = JSON.parse(localStorage.getItem("token"));
    const status = destination;
    const jobId = data.id;
    axiosInstance
      .post(`/updateCandidateStatus?clientId=${user.userId}`, { jobId, status })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const DtpStatus = (status) => {
    let color = "#ffffff";
    let bg = "#ffffff";

    if (status === "Initiated") {
      color = "#FFA500";
      bg = "#FFF2DB";
    }
    if (status === "In Progress") {
      color = "#5FAEDA";
      bg = "#E9F4FA";
    }
    if (status === "Approved") {
      color = "#58A20F";
      bg = "#58A20F20";
    }
    if (status === "Rejected") {
      color = "#E05880";
      bg = "#E0588020";
    }

    return (
      <div
        style={{
          padding: "4px 8px",
          borderWidth: 1,
          borderColor: color,
          borderRadius: 20,
          backgroundColor: bg,
        }}>
        <p style={{ color: color, fontSize: 8, fontWeight: 600 }}>
          Dtp Status: {status?.toUpperCase()}
        </p>
      </div>
    );
  };
  const handleJobDetails = (jobData) => {
    console.log(userData);
    if (userData === null) {
      setShowPopup(true);
    } else {
      if (jobData?.jobDetail === true) {
        navigate("/job/jobDetailEdit", { state: { jobData: jobData } });
      } else {
        navigate("/job/jobDetailCreate");
      }
    }
  };

  const handleWorkValues = (jobData) => {
    console.log(userData);
    if (userData === null) {
      setShowPopup(true);
    } else {
      if (jobData?.workValues === true) {
        navigate("/job/valuesEdit", { state: { jobData: jobData } });
      } else {
        navigate("/job/workValueTemplate");
      }
    }
  };

  const handleJobScreening = () => {
    navigate("/jobCandidateCombination", { state : "screening"});
  }

  const handleAssessment = () => {
    navigate("/jobCandidateCombination", { state : "assessment"});
  }

  const handleNotify = () => {

  }

  const closePopup = () => {
    setShowPopup(false);
    setFsspopup(false);
    setJobTitle("");
  };

  const handleJobPreferences = (jobData) => {
    if (userData === null) {
      setShowPopup(true);
    } else {
      if (jobData?.preference === true) {
        navigate("/job/preferenceEdit", { state: { jobData: jobData } });
      } else {
        navigate("/job/preferenceCreate");
      }
    }
  };

  const handleTeam = (jobData) => {
    if (userData === null) {
      setShowPopup(true);
    } else {
      if (jobData?.team === true) {
        navigate("/job/teamEdit", { state: { jobData: jobData } });
      } else {
        navigate("/job/teamCreate");
      }
    }
  };

  const handleIcp = (jobData) => {
    if (userData === null) {
      setShowPopup(true);
    } else {
      if (jobData?.icp === true) {
        navigate("/job/icpResult", { state: { jobData: jobData } });
      } else {
        navigate("/job/icpTemplate");
      }
    }
  };

  const handleStandard = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: state, jdAccess: true },
      });
    }
  };

  const handleJobDescription = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: state, teamAccess: true },
      });
    }
  };

  const handleIdentification = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: state, fullAccess: true },
      });
    }
  };

  const checkStatus = (status) => {
    let color = "";
    if (status === "Completed") {
      color = "#5FAEDA";
    }
    if (status === "Approved") {
      color = "#58A20F";
    } else if (status === "In Progress") {
      color = "#5FAEDA";
    } else if (status === "Initiated") {
      color = "#FFA500";
    } else if (status === "Rejected") {
      color = "#E05880";
    } else if (status === "Not Recommended") {
      color = "#E05880";
    } else if (status === "Under Review") {
      color = "#FFA500";
    } else if (status === "Recommended") {
      color = "#58A20F";
    }

    return <p style={{ color: color, fontSize: 14 }}>{status}</p>;
  };

  const openFssConfirmation = (value) => {
    console.log(value);
    if(value === true) {
      setFsspopup(true);
    }
  }

  const checkStatusRound = (status) => {
    let color = "";
    let backGround = "";

    if (status === "Completed") {
      color = "#58A20F";
      backGround = "#58A20F20";
    } else if (status === "Hired") {
      color = "#5FAEDA";
      backGround = "#5FAEDA20";
    } else if (status === "In Progress") {
      color = "#FFA500";
      backGround = "#FFA50020";
    } else if (status === "Rejected") {
      color = "#E05880";
      backGround = "#E0588020";
    }
    return (
      <p
        style={{
          color: color,
          fontSize: 14,
          backgroundColor: backGround,
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 20,
        }}>
        {status}
      </p>
    );
  };

  const topCandidates = candidateDetails;
  //   .filter((candidate) => candidate?.matchingScore)
  //   .sort((a, b) => b?.matchingScore - a?.matchingScore)
  //   .slice(0, 3);

  return (
    <div>
      <div className="flex">
        <ClientSideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          {loading === true ? (
            <Spinner />
          ) : (
            <div className="p-8">
              <div>
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Dashboard
                </p>
                // <p style={{ color: "#475467", fontSize: 16 }}>
                //   Complete all the steps to generate a job offer for the
                //   candidate.
                // </p>
                <Card
                  sx={{ borderRadius: 4, padding: 2 }}
                  className="grid grid-cols-2 gap-8 border border-[#D3DFE7] mt-5 bg-[#FBFCFE]">
                  <div>
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        fontWeight: 500,
                      }}>
                      Job Title:{" "}
                      <span style={{ color: "#101828" }}>
                        {" "}
                        {userData?.jobTitle}
                      </span>
                    </p>
                    <div className="w-full py-4">
                      <p style={{ color: "#475467", fontSize: 16 }}>
                        Job Creation Completed
                      </p>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                          width: "70%",
                        }}>
                        <Box sx={{ width: "100%", mr: 1, mt: 2 }}>
                          <BorderLinearProgress
                            variant="determinate"
                            value={100}
                          />
                        </Box>
                        <Box
                          sx={{
                            minWidth: 35,
                            position: "absolute",
                            left: `${Math.round(jobCompletion - 3)}%`,
                            mt: 2,
                          }}>
                          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xl border border-[#D0D5DD]">
                            <p
                              style={{
                                color: "#101828",
                                fontSize: 11,
                                fontWeight: 600,
                              }}>{`${Math.round(jobCompletion)}%`}</p>
                          </div>
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#101828",
                          fontSize: 20,
                          fontWeight: 500,
                        }}>
                        Status
                      </p>
                      <div className="flex gap-12">
                        <p style={{ color: "#475467", fontSize: 16 }}>
                          Job Status
                        </p>
                        <p
                          style={{
                            color: "#58A20F",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          {userData?.jobStatus}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <p style={{ color: "#475467", fontSize: 16 }}>
                          Job Sub-status
                        </p>
                        <p style={{ color: "#EDCC57", fontSize: 16 }}>
                          {userData?.jobSubStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <FormControlLabel
                      control={
                        <Switch
                          sx={{
                            "& .Mui-checked": {
                              "& + .MuiSwitch-track": {
                                backgroundColor: "#475467",
                              },
                              "& .MuiSwitch-thumb": {
                                color: "#475467",
                              },
                            },
                          }}
                          checked={publishFeature}
                        />
                      }
                      value={publishFeature}
                      onChange={(e) =>
                        handleSwitch(e.target.checked, "publishFeature")
                      }
                      label={
                        <p style={{ color: "#475467", fontSize: 16 }}>
                          Publish Feature
                        </p>
                      }
                    />
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 18,
                            fontWeight: 500,
                          }}>
                          Optional Features
                        </p>
                        <FormControlLabel
                          control={
                            <Switch
                              sx={{
                                "& .Mui-checked": {
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "#3B25A9",
                                  },
                                  "& .MuiSwitch-thumb": {
                                    color: "#3B25A9",
                                  },
                                },
                              }}
                              checked={screeningQuestions}
                            />
                          }
                          value={screeningQuestions}
                          onChange={(e) =>
                            handleSwitch(e.target.checked, "screening")
                          }
                          label={
                            <p style={{ color: "#3B25A9", fontSize: 16 }}>
                              Screening Questions
                            </p>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              sx={{
                                "& .Mui-checked": {
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "#A92525",
                                  },
                                  "& .MuiSwitch-thumb": {
                                    color: "#A92525",
                                  },
                                },
                              }}
                              checked={assessments}
                            />
                          }
                          value={assessments}
                          onChange={(e) =>
                            handleSwitch(e.target.checked, "assessment")
                          }
                          label={
                            <p style={{ color: "#A92525", fontSize: 16 }}>
                              Assessments
                            </p>
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 18,
                            fontWeight: 500,
                          }}>
                          External Support
                        </p>
                        <FormControlLabel
                          control={
                            <Switch
                              sx={{
                                "& .Mui-checked": {
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "#D9B020",
                                  },
                                  "& .MuiSwitch-thumb": {
                                    color: "#D9B020",
                                  },
                                },
                              }}
                              checked={sourcing}
                            />
                          }
                          value={sourcing}
                          onChange={(e) =>
                            handleSwitch(e.target.checked, "sourcing")
                          }
                          label={
                            <p style={{ color: "#D9B020", fontSize: 16 }}>
                              Sourcing 
                            </p>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              sx={{
                                "& .Mui-checked": {
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "#9BC53D",
                                  },
                                  "& .MuiSwitch-thumb": {
                                    color: "#9BC53D",
                                  },
                                },
                              }}
                              checked={onboarding}
                            />
                          }
                          value={onboarding}
                          onChange={(e) =>
                            handleSwitch(e.target.checked, "onboarding")
                          }
                          label={
                            <p style={{ color: "#9BC53D", fontSize: 16 }}>
                              Onboarding 
                            </p>
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              sx={{
                                "& .Mui-checked": {
                                  "& + .MuiSwitch-track": {
                                    backgroundColor: "#2C7DA0",
                                  },
                                  "& .MuiSwitch-thumb": {
                                    color: "#2C7DA0",
                                  },
                                },
                              }}
                              checked={serviceStaffing}
                            />
                          }
                          value={serviceStaffing}
                          onChange={(e) =>
                            openFssConfirmation(e.target.checked)
                          }
                          label={
                            <p style={{ color: "#2C7DA0", fontSize: 16 }}>
                              Full-Service Staffing 
                            </p>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="py-10">
                <div className="flex justify-between">
                  <div>
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 20,
                      }}>
                      Summary
                    </p>
                    // <p
                    //   style={{
                    //     color: "#475467",
                    //     fontSize: 16,
                    //     fontWeight: 500,
                    //   }}>
                    //   Please fill out all the necessary forms and complete the
                    //   required assessments to get started
                    // </p>
                  </div>
                  <div>
                    <p
                      variant="text"
                      style={{
                        color: "#5E8EBD",
                        textTransform: "none",
                        disabled: { accessDescription },
                      }}
                      // onClick={() =>
                      //   navigate("/job/outputofJobDescription", {
                      //     state: state,
                      //   })
                      // }
                    >
                      Access Job Description
                      <IconButton
                        onClick={(e) => {
                          handleJd(e);
                        }}>
                        <HiDotsVertical style={{ color: "#D9D9D9" }} />
                      </IconButton>
                    </p>
                  </div>
                </div>
                {/* all forms */}
                <div className="flex gap-10 mt-3 justify-between">
                  <div className="w-36">
                    <Gauge
                      value={userData?.jobDetail ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      Job Details
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 1
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      style={{
                        color: userData?.jobDetail ? "#1E90FF" : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                      }}
                      endIcon={
                        userData?.jobDetail ? <CiEdit /> : <FaArrowRight />
                      }
                      onClick={() => {
                        handleJobDetails(userData);
                      }}>
                      {userData?.jobDetail ? "Edit" : "Start"}
                    </Button>
                  </div>
                  <div className="w-36">
                    <Gauge
                      value={userData?.workValues ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      Work Values
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 2
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      style={{
                        color: userData?.workValues ? "#1E90FF" : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                      }}
                      endIcon={
                        userData?.workValues ? <CiEdit /> : <FaArrowRight />
                      }
                      onClick={() => {
                        handleWorkValues(userData);
                      }}>
                      {userData?.workValues ? "Edit" : "Start"}
                    </Button>
                  </div>
                  <div className="w-36">
                    <Gauge
                      value={userData?.team ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      Team Preference
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 3
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      style={{
                        color: userData?.team ? "#1E90FF" : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                      }}
                      endIcon={userData?.team ? <CiEdit /> : <FaArrowRight />}
                      onClick={() => {
                        handleTeam(userData);
                      }}>
                      {userData?.team ? "Edit" : "Start"}
                    </Button>
                  </div>
                  <div className="w-36">
                    <Gauge
                      value={userData?.icp ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      ICP Analysis
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 4
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      style={{
                        color: userData?.icp ? "#1E90FF" : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                      }}
                      endIcon={userData?.icp ? <CiEdit /> : <FaArrowRight />}
                      onClick={() => {
                        handleIcp(userData);
                      }}>
                      {userData?.icp ? "Edit" : "Start"}
                    </Button>
                  </div>

                  <div className="w-36">
                    <Gauge
                      value={userData?.screeningQuestions ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      Screening
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 5
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      disabled={!screeningQuestions}
                      style={{
                        color: userData?.screeningQuestions
                          ? "#1E90FF"
                          : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                        opacity: screeningQuestions ? 1.0 : 0.6,
                      }}
                      endIcon={
                        userData?.screeningQuestions ? (
                          <CiEdit />
                        ) : (
                          <FaArrowRight />
                        )
                      }
                      onClick={() => {
                        navigate("/job/screeningQuestions");
                      }}>
                      {userData?.screeningQuestions ? "Edit" : "Start"}
                    </Button>
                  </div>

                  <div className="w-36">
                    <Gauge
                      value={userData?.assessmentAssigned ? 100 : 0}
                      startAngle={0}
                      endAngle={360}
                      innerRadius="80%"
                      outerRadius="100%"
                      height={80}
                      width={80}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 10,
                          color: "#525252",
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: "#70CF97",
                        },
                      })}
                      text={({ value }) => `${value}%`}
                    />
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 18,
                      }}>
                      Assessments
                    </p>
                    <div className="flex justify-between">
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        Step 6
                      </p>
                      <p
                        style={{
                          color: "#808191",
                          fontSize: 16,
                          fontWeight: 500,
                        }}>
                        5-10 mins
                      </p>
                    </div>
                    <Button
                      size="small"
                      disabled={!assessments}
                      style={{
                        color: userData?.assessmentAssigned ? "#1E90FF" : "#FF9900",
                        fontSize: 12,
                        textTransform: "none",
                        opacity: assessments ? 1.0 : 0.6,
                      }}
                      endIcon={
                        userData?.assessment ? <CiEdit /> : <FaArrowRight />
                      }
                      onClick={() => navigate("/assessmentsList")}>
                      {userData?.assessmentAssigned ? "Edit" : "Start"}
                    </Button>
                  </div>
                </div>
                {/* card */}
                {/* <div className="grid grid-cols-2 gap-5 mt-5">
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.jobDetail ? 100 : 0}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: "translate(0px, 0px)",
                                color: "#101828",
                                fontWeight: 600,
                              },
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: "#58A20F",
                              },
                            }}
                            text={({ value }) => `${value} %`}
                          />
                          <p
                            style={{
                              textAlign: "center",
                              color: userData?.jobDetails
                                ? "#58A20F"
                                : "#101828",
                              fontWeight: 600,
                            }}>
                            Completed
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <p style={{ color: "#777980", fontSize: 14 }}>
                              Step 1
                            </p>
                            <div className="flex gap-2 items-center">
                              <MdOutlineWatchLater
                                style={{ color: "#777980", fontSize: 16 }}
                              />
                              <p style={{ color: "#777980", fontSize: 14 }}>
                                5-10 mins
                              </p>
                            </div>
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#101828",
                                fontWeight: 600,
                                fontSize: 20,
                              }}>
                              Job Details
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the first step in creating a job . Start
                              by choosing a template and filling in the relevant
                              job details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        style={{
                          color: userData?.jobDetail ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => {
                          handleJobDetails(userData);
                        }}>
                        {userData?.jobDetail ? "Edit" : "Start"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.workValues ? 100 : 0}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: "translate(0px, 0px)",
                                color: "#101828",
                                fontWeight: 600,
                              },
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: "#58A20F",
                              },
                            }}
                            text={({ value }) => `${value} %`}
                          />
                          <p
                            style={{
                              textAlign: "center",
                              color: userData?.workValues
                                ? "#58A20F"
                                : "#101828",
                              fontWeight: 600,
                            }}>
                            Completed
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <p style={{ color: "#777980", fontSize: 14 }}>
                              Step 2
                            </p>
                            <div className="flex gap-2 items-center">
                              <MdOutlineWatchLater
                                style={{ color: "#777980", fontSize: 16 }}
                              />
                              <p style={{ color: "#777980", fontSize: 14 }}>
                                5-10 mins
                              </p>
                            </div>
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#101828",
                                fontWeight: 600,
                                fontSize: 20,
                              }}>
                              Work Values
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the second step in creating a job.
                              <br /> Choose a template and fill in the job
                              details to create your ICP.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        style={{
                          color: userData?.workValues ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => {
                          handleWorkValues(userData);
                        }}>
                        {userData?.workValues ? "Edit" : "Start"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.team ? 100 : 0}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: "translate(0px, 0px)",
                                color: "#101828",
                                fontWeight: 600,
                              },
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: "#58A20F",
                              },
                            }}
                            text={({ value }) => `${value} %`}
                          />
                          <p
                            style={{
                              textAlign: "center",
                              color: userData?.team ? "#58A20F" : "#101828",
                              fontWeight: 600,
                            }}>
                            Completed
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <p style={{ color: "#777980", fontSize: 14 }}>
                              Step 3
                            </p>
                            <div className="flex gap-2 items-center">
                              <MdOutlineWatchLater
                                style={{ color: "#777980", fontSize: 16 }}
                              />
                              <p style={{ color: "#777980", fontSize: 14 }}>
                                5-10 mins
                              </p>
                            </div>
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#101828",
                                fontWeight: 600,
                                fontSize: 20,
                              }}>
                              Team Preference
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the third step in creating a job . Start
                              by choosing a template and filling in the relevant
                              job details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        style={{
                          color: userData?.team ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => {
                          handleTeam(userData);
                        }}>
                        {userData?.team ? "Edit" : "Start"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.icp ? 100 : 0}
                            startAngle={-110}
                            endAngle={110}
                            sx={{
                              [`& .${gaugeClasses.valueText}`]: {
                                fontSize: 20,
                                transform: "translate(0px, 0px)",
                                color: "#101828",
                                fontWeight: 600,
                              },
                              [`& .${gaugeClasses.valueArc}`]: {
                                fill: "#58A20F",
                              },
                            }}
                            text={({ value }) => `${value} %`}
                          />
                          <p
                            style={{
                              textAlign: "center",
                              color: userData?.icp ? "#58A20F" : "#101828",
                              fontWeight: 600,
                            }}>
                            Completed
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <p style={{ color: "#777980", fontSize: 14 }}>
                              Step 5
                            </p>
                            <div className="flex gap-2 items-center">
                              <MdOutlineWatchLater
                                style={{ color: "#777980", fontSize: 16 }}
                              />
                              <p style={{ color: "#777980", fontSize: 14 }}>
                                5-10 mins
                              </p>
                            </div>
                          </div>
                          <div>
                            <p
                              style={{
                                color: "#101828",
                                fontWeight: 600,
                                fontSize: 20,
                              }}>
                              ICP Template
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the fifth step in creating a job . Start
                              by choosing a template and filling in the relevant
                              job details.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions style={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        style={{
                          color: userData?.icp ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => {
                          handleIcp(userData);
                        }}>
                        {userData?.icp ? "Edit" : "Start"}
                      </Button>
                    </CardActions>
                  </Card>
                </div> */}
              </div>
              {userData?.jobDetail &&
                userData?.workValues &&
                userData?.team &&
                // userData?.preference &&
                userData?.icp && (
                  <div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p
                          style={{
                            color: "#101828",
                            fontSize: 22,
                            fontWeight: 700,
                          }}>
                          Candidate Details
                        </p>

                        // <p
                        //   style={{
                        //     color: "#475467",
                        //     fontSize: 14,
                        //     fontWeight: 400,
                        //   }}>
                        //   Below are the details for the candidates
                        // </p>
                      </div>
                      <Button
                        size="small"
                        style={{
                          color: "#008080",
                          fontSize: 14,
                          textTransform: "none",
                        }}
                        onClick={() => {
                          navigate("/job/assignCandidates");
                        }}>
                        Add or Assign Candidates
                      </Button>
                    </div>
                    {candidateDetails?.length < 1 ? (
                      <div className="flex justify-center items-center text-center h-full">
                        <div>
                          <img src={NoDataFound} alt="No Data Found" />
                          <p
                            style={{
                              color: "#101828",
                              fontSize: 20,
                              fontWeight: 500,
                              marginTop: 25,
                            }}>
                            No Candidate Details
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-scroll w-[1210px]">
                        <div className="py-5 flex justify-between">
                          <div className="flex gap-8">
                            <Button
                              size="small"
                              variant="outlined"
                              style={{
                                color: "#008080",
                                fontSize: 14,
                                textTransform: "none",
                                backgroundColor: "#F8F9FA",
                                borderColor: "#D0D5DD50",
                              }}
                              startIcon={<IoPeopleOutline />}
                              onClick={() => {
                                setShowRecomandation(true);
                              }}>
                              Run Recommendation
                            </Button>

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
                          </div>
                          <ButtonGroup
                            style={{ color: "#008080" }}
                            aria-label="Medium-sized button group">
                            <Button
                              style={{
                                backgroundColor:
                                  currentView === "Card"
                                    ? "#E6E9ED"
                                    : "#F6F8F9",
                                color:
                                  currentView === "Card"
                                    ? "#008080"
                                    : "#47546770",
                                borderColor: "#EAECF0",
                              }}
                              startIcon={
                                currentView === "Card" ? (
                                  <HiSquares2X2 />
                                ) : (
                                  <HiOutlineSquares2X2 />
                                )
                              }
                              onClick={() => setCurrentView("Card")}
                            />

                            <Button
                              style={{
                                backgroundColor:
                                  currentView === "List"
                                    ? "#E6E9ED"
                                    : "#F6F8F9",
                                color:
                                  currentView === "List"
                                    ? "#008080"
                                    : "#47546770",
                                borderColor: "#EAECF0",
                              }}
                              endIcon={<IoMenu />}
                              onClick={() => setCurrentView("List")}
                            />
                          </ButtonGroup>
                        </div>

                        {currentView === "Card" && (
                          <div>
                            <DragDropContext onDragEnd={onDragEnd}>
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}>
                                {Object.entries(tasks).map(([key, column]) => (
                                  <Droppable droppableId={key} key={key}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{
                                          margin: "0 8px",
                                          padding: "8px",
                                          minWidth: "280px",
                                          maxWidth: "380px",
                                          backgroundColor:
                                            snapshot.isDraggingOver
                                              ? "lightblue"
                                              : "white",
                                        }}>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            borderBottomWidth: 2,
                                            paddingBottom: 2,
                                            borderColor: "#00808070",
                                          }}>
                                          <div className="flex gap-2">
                                            <p
                                              style={{
                                                color: "#1E293B",
                                                fontSize: 14,
                                                fontWeight: 500,
                                              }}>
                                              {column?.name}
                                            </p>
                                            <div className="flex items-center justify-center h-6 w-8 border border-[#E2E8F0] bg-[#FFB58020]">
                                              <p
                                                style={{
                                                  color: "#94A3B8",
                                                  fontSize: 14,
                                                  fontWeight: 500,
                                                }}>
                                                {column?.items?.length}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center">
                                            <IconButton>
                                              <GoPlus
                                                style={{
                                                  color: "#94A3B8",
                                                  fontSize: 16,
                                                }}
                                              />
                                            </IconButton>
                                            <IconButton>
                                              <BsThreeDots
                                                style={{
                                                  color: "#94A3B8",
                                                  fontSize: 16,
                                                }}
                                              />
                                            </IconButton>
                                          </div>
                                        </div>
                                        {column.items.map((item, index) => (
                                          <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                // style={{
                                                //   userSelect: "none",
                                                //   padding: "16px",
                                                //   margin: "4px 0",
                                                //   minHeight: "50px",
                                                //   backgroundColor: snapshot.isDragging
                                                //     ? "#263B4A"
                                                //     : "#456C86",
                                                //   color: "white",
                                                //   ...provided.draggableProps.style,
                                                // }}
                                                style={{
                                                  borderWidth: 1,
                                                  borderColor: "#E2E8F0",
                                                  backgroundColor:
                                                    snapshot.isDragging
                                                      ? "#CFC8C980"
                                                      : "#ffffff",
                                                  borderRadius: 8,
                                                  marginTop: 10,
                                                  ...provided.draggableProps
                                                    .style,
                                                }}>
                                                <div className="flex justify-between items-center p-2">
                                                  {DtpStatus(column?.name)}
                                                  <p
                                                    style={{
                                                      color: "#7E8795",
                                                      fontWeight: 500,
                                                      fontSize: 10,
                                                    }}>
                                                    Job Id : {userData.id}
                                                  </p>
                                                </div>
                                                <div className="flex justify-between items-center p-2">
                                                  <div className="flex gap-2 items-center">
                                                    <img
                                                      src="https://picsum.photos/200"
                                                      alt="person"
                                                      style={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: "100%",
                                                      }}
                                                    />
                                                    <div>
                                                      <p
                                                        style={{
                                                          color: "#1E293B",
                                                          fontSize: 16,
                                                          fontWeight: 600,
                                                        }}>
                                                        {item?.username}
                                                      </p>
                                                      <p
                                                        style={{
                                                          color: "#252C32",
                                                          fontSize: 10,
                                                        }}>
                                                        {item?.role}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="w-6 h-6 flex justify-center items-center border border-[#DDDDDD] rounded-md">
                                                    <IconButton
                                                      onClick={handleKd}>
                                                      <BsThreeDots
                                                        style={{
                                                          color: "#6F6F6F",
                                                          fontSize: 16,
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </div>
                                                </div>
                                                <div className="w-10 h-4 rounded-r-full bg-[#E20008] flex justify-center items-center">
                                                  <p
                                                    style={{
                                                      color: "#ffffff",
                                                      fontSize: 10,
                                                    }}>
                                                    {item.matchingScore}
                                                  </p>
                                                </div>
                                                <div className="p-2 ">
                                                  <p
                                                    style={{
                                                      color: "#787486",
                                                      fontSize: 10,
                                                    }}>
                                                    Created Timestamp:{" "}
                                                    {item?.createdTime}
                                                  </p>
                                                  <p
                                                    style={{
                                                      color: "#787486",
                                                      fontSize: 10,
                                                    }}>
                                                    Application Sub-status:{" "}
                                                    {item?.applicationSubStatus}
                                                  </p>
                                                </div>
                                                <div className="mx-2 border-b border-[#E2E8F0]" />
                                                <div className="p-2 flex gap-2">
                                                  <div className="flex gap-1">
                                                    <TiFolderOpen
                                                      style={{
                                                        color: "#5FAEDA",
                                                      }}
                                                    />
                                                    <p
                                                      style={{
                                                        color: "#5FAEDA",
                                                        fontSize: 10,
                                                      }}>
                                                      {item.applicationSource}
                                                      {/* {item?.application_source} */}
                                                    </p>
                                                  </div>
                                                  <div className="flex gap-1">
                                                    <IoIosCalendar
                                                      style={{
                                                        color: "#800080",
                                                      }}
                                                    />
                                                    <p
                                                      style={{
                                                        color: "#800080",
                                                        fontSize: 10,
                                                      }}>
                                                      {item?.alignmentDate}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="w-full px-2 py-[2px]">
                                                  <p
                                                    style={{
                                                      color: "#7E8795",
                                                      fontSize: 8,
                                                    }}>
                                                    Application Status
                                                  </p>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                    }}>
                                                    <BorderLinearProgresskan
                                                      variant="determinate"
                                                      value={
                                                        item.applicationStatus ||
                                                        0
                                                      }
                                                      style={{ width: "100%" }}
                                                    />
                                                  </Box>
                                                </div>
                                              </div>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                ))}
                              </div>
                            </DragDropContext>
                          </div>
                        )}
                        {currentView === "List" && (
                          <Box sx={{ width: tableWidth }}>
                            <Paper sx={{ width: "100%", my: 2 }}>
                              <TableContainer
                                sx={{
                                  maxHeight: 500,
                                }}>
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
                                        Applicant Name
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Applied job Title
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Created Timestamp
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Job Screening response
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Application Status
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Application Sub-status
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Resume
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Assessments
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        DTP Status
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Notify
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Alignment Score
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Latest Alignment Date
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Recommendation Rank
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Recommendation Status
                                      </TableCell>
                                      <TableCell
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Application Source
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Job Id
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        sx={{
                                          bgcolor: "#F8F9FA",
                                          color: "#101828",
                                          border: 1,
                                          borderColor: "#D0D5DD50",
                                        }}>
                                        Action
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {candidateDetails?.map((row, index) => {
                                      return (
                                        <TableRow key={index}>
                                          <TableCell
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.username}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {userData.jobTitle}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.createdTime}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            padding="none"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            <Button
                                              size="small"
                                              variant="text"
                                              style={{
                                                color: "#28A745",
                                                textTransform: "none",
                                              }}
                                              onClick={handleJobScreening}>
                                              View
                                            </Button>
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {checkStatusRound(row.applicationStatus)}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.applicationSubStatus}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            <Button
                                              size="small"
                                              variant="text"
                                              style={{
                                                color: "#5FAEDA",
                                                textTransform: "none",
                                              }}
                                              onClick={() => {}}>
                                              {row.resume}
                                            </Button>
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            padding="none"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            <Button
                                              size="small"
                                              variant="text"
                                              style={{
                                                color: "#28A745",
                                                textTransform: "none",
                                              }}
                                              onClick={handleAssessment}>
                                              View
                                            </Button>
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {checkStatus(row.dtpStatus)}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            padding="none"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.dtpStatus?.includes(
                                              "Approved"
                                            ) ||
                                            row.dtpStatus?.includes(
                                              "Reject"
                                            ) ? (
                                              <Button
                                                size="small"
                                                variant="text"
                                                style={{
                                                  color: "#848382",
                                                  backgroundColor: "#84838220",
                                                  textTransform: "none",
                                                }}
                                                disabled>
                                                Notify
                                              </Button>
                                            ) : (
                                              <Button
                                                size="small"
                                                variant="text"
                                                style={{
                                                  color: "#66B2B2",
                                                  backgroundColor: "#66B2B220",
                                                  textTransform: "none",
                                                }}
                                                onClick={() => {}}>
                                                Notify
                                              </Button>
                                            )}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.matchingScore}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.alignmentDate}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.recommendationRank}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {checkStatus(row.recommendationStatus)}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {row.applicationSource}
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#475467",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            {userData.id}
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
                                                handleLd(e);
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
                        )}
                        {showRecomandation && (
                          <div>
                            <div>
                              <p
                                style={{
                                  color: "#101828",
                                  fontSize: 22,
                                  fontWeight: 700,
                                }}>
                                Recommended Candidates
                              </p>

                              <p
                                style={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 400,
                                }}>
                                Top 3 candidates
                              </p>
                            </div>
                            <Box sx={{ width: "60%" }}>
                              <Paper sx={{ width: "100%", my: 2 }}>
                                <TableContainer>
                                  <Table stickyHeader size="small">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{
                                            bgcolor: "#F8F9FA",
                                            color: "#101828",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Candidate Name
                                        </TableCell>

                                        <TableCell
                                          sx={{
                                            bgcolor: "#F8F9FA",
                                            color: "#101828",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Alignment Score
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {topCandidates?.map((row, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row.name}
                                            </TableCell>

                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row.score}%
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
                      </div>
                    )}
                  </div>
                )}
            </div>
          )}
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
                <PiUserFocus style={{ color: "#FF6347", fontSize: 22 }} />
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

          {/* list menu */}
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorLd}
            open={ldOpen}
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
            <MenuItem onClick={() => {navigate("/jobcandidateCombination")}}>
              <div className="flex gap-2 items-center">
                <FiEdit style={{ color: "#5FAEDA", fontSize: 14 }} />
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
            <MenuItem onClick={() => {}}>
              <div className="flex gap-2 items-center">
                <MdOutlineRemoveRedEye
                  style={{ color: "#58A20F", fontSize: 14 }}
                />
                <p
                  style={{
                    color: "#58A20F",
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  View
                </p>
              </div>
            </MenuItem>
          </Menu>

          {/* kanban */}
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorkb}
            open={kbOpen}
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
            <MenuItem onClick={handleJobScreening}>
              <div className="flex gap-2 items-center">
                <FiEdit style={{ color: "#FF7F50", fontSize: 14 }} />
                <p
                  style={{
                    color: "#FF7F50",
                    fontSize: 8,
                    fontWeight: 500,
                  }}>
                  Job Screening
                </p>
              </div>
            </MenuItem>
            <MenuItem onClick={handleAssessment}>
              <div className="flex gap-2 items-center">
                <HiOutlineDocumentDuplicate
                  style={{ color: "#E05880", fontSize: 14 }}
                />
                <p
                  style={{
                    color: "#E05880",
                    fontSize: 8,
                    fontWeight: 500,
                  }}>
                  Assessment
                </p>
              </div>
            </MenuItem>
            <MenuItem onClick={handleNotify}>
              <div className="flex gap-2 items-center">
                <BiBell style={{ color: "#66B2B2", fontSize: 14 }} />
                <p
                  style={{
                    color: "#66B2B2",
                    fontSize: 8,
                    fontWeight: 500,
                  }}>
                  Notify
                </p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => navigate("/jobCandidateCombination")}>
              <div className="flex gap-2 items-center">
                <FiEdit style={{ color: "#5FAEDA", fontSize: 14 }} />
                <p
                  style={{
                    color: "#5FAEDA",
                    fontSize: 8,
                    fontWeight: 500,
                  }}>
                  Edit
                </p>
              </div>
            </MenuItem>
            <MenuItem onClick={() => navigate("/jobCandidateCombination")}>
              <div className="flex gap-2 items-center">
                <IoEyeOutline style={{ color: "#58A20F", fontSize: 14 }} />
                <p
                  style={{
                    color: "#58A20F",
                    fontSize: 8,
                    fontWeight: 500,
                  }}>
                  View
                </p>
              </div>
            </MenuItem>
          </Menu>
          
          {/* full-staffing confirmation popup */}
          
          <Dialog open={fsspopup} onClose={closePopup}>
            <DialogTitle>Confirm</DialogTitle>
            <IconButton
              onClick={closePopup}
              style={{ position: "absolute", top: 10, right: 10 }}>
              <IoIosCloseCircleOutline />
            </IconButton>
            <Divider />
            <DialogContent sx={{ minWidth: 450 }}>
              <div className="grid grid-flow-row gap-2">
                <p
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                   "Do you want to switch to Full Staffing Service"
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
                onClick={() => handleSwitch(true, "serviceStaffing")}
                variant="contained"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#008080",
                }}>
                SAVE
              </Button>
            </DialogActions> 
          </Dialog>

          {/* popup */}
          <Dialog open={showPopup} onClose={closePopup}>
            <DialogTitle>Job Title</DialogTitle>
            <IconButton
              onClick={closePopup}
              style={{ position: "absolute", top: 10, right: 10 }}>
              <IoIosCloseCircleOutline />
            </IconButton>
            <Divider />
            <DialogContent sx={{ minWidth: 450 }}>
              <div className="grid grid-flow-row gap-2">
                <p
                  style={{
                    color: "#344054",
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                  Job Title
                </p>
                <TextField
                  size="small"
                  disablePortal
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="type"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={saveJobTitle}
                variant="contained"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#008080",
                }}>
                SAVE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};
