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
  IconButton,
  styled,
} from "@mui/material";
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

import { IoPeopleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineWatchLater, MdOutlineRemoveRedEye } from "react-icons/md";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { FaArrowRight } from "react-icons/fa6";
import { BsFillCameraFill } from "react-icons/bs";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import {
  candidateDetailsData,
  candistaeDetailsDataNew,
  createJobData,
} from "../../../dummy/Data";
import NoDataFound from "../../../../assets/images/noData Found.png";
import Spinner from "../../../utils/spinner";
import { FiEdit } from "react-icons/fi";

export const CreateJob = () => {
  const [userData, setUserData] = useState(createJobData);
  const userName = JSON.parse(localStorage.getItem("token"))?.username
    ? JSON.parse(localStorage.getItem("token"))?.username
    : userData.name;
  const [jobId, setJobId] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [accessDescription, setAccessDescription] = useState(true);
  const [title, setTitle] = useState(userName);
  const [showRecomandation, setShowRecomandation] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(
    location.state?.selected || candistaeDetailsDataNew
  );
  const [loading, setLoading] = useState(false);
  const [anchorjd, setAnchorjd] = useState();
  const jdOpen = Boolean(anchorjd);
  const [anchorLd, setAnchorLd] = useState();
  const ldOpen = Boolean(anchorLd);
  const [jobCompletion, setJobCompletion] = useState(60);
  //const [anchorData, setAnchorData] = useState();

  const handleJd = (event) => {
    setAnchorjd(event.currentTarget);
  };

  const handleLd = (event) => {
    setAnchorLd(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorjd(null);
    setAnchorLd(null);
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
  //   if (location.state) {
  //     console.log(location.state);
  //     setJobId(location.state);
  //   }
  // }, [location.state]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(location.state);
    if (location.state?.new) {
    } else {
      let jobId = 0;
      if (location.state) {
        localStorage.setItem("jobId", location.state);
        jobId = location.state;
      } else {
        jobId = localStorage.getItem("jobId");
      }
      setLoading(true);
      axiosInstance
        .get(
          `/getAllJobCandidates?clientId=${user.userId}&jobId=${jobId}&pageNo=1&pageSize=10`
        )
        .then((response) => {
          console.log(response);
          setCandidateDetails(response.data);
          setLoading(false);
          // setPage(data?.pageNo || 1);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, []);

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    console.log(state);
    if (location.state?.new) {
      localStorage.setItem("jobId", 0);
    } else {
      let jobId = 0;
      if (location.state) {
        localStorage.setItem("jobId", location.state);
        jobId = location.state;
      } else {
        jobId = localStorage.getItem("jobId");
      }
      axiosInstance
        .get(`/getJobDetails?clientId=${user.userId}&jobId=${jobId}`)
        .then((data) => {
          console.log(data);
          setUserData(data?.data);
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

  const handleJobDetails = (jobData) => {
    if (jobData?.jobDetail === true) {
      navigate("/job/jobDetailEdit", { state: { jobData: jobData } });
    } else {
      navigate("/job/jobDetailCreate");
    }
  };

  const handleWorkValues = (jobData) => {
    if (jobData?.workValues === true) {
      navigate("/job/valuesEdit", { state: { jobData: jobData } });
    } else {
      navigate("/job/workValueTemplate");
    }
  };

  const handleJobPreferences = (jobData) => {
    if (jobData?.preference === true) {
      navigate("/job/preferenceEdit", { state: { jobData: jobData } });
    } else {
      navigate("/job/preferenceCreate");
    }
  };

  const handleTeam = (jobData) => {
    if (jobData?.team === true) {
      navigate("/job/teamEdit", { state: { jobData: jobData } });
    } else {
      navigate("/job/teamCreate");
    }
  };

  const handleIcp = (jobData) => {
    if (jobData?.icp === true) {
      navigate("/job/icpResult", { state: { jobData: jobData } });
    } else {
      navigate("/job/icpTemplate");
    }
  };

  const handleStandard = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: location.state, fullAccess: true },
      });
    }
  };

  const handleJobDescription = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: location.state, teamAccess: true },
      });
    }
  };

  const handleIdentification = () => {
    if (jobCompletion === 100) {
      navigate("/job/outputofJobDescription", {
        state: { jobId: location.state, jdAccess: true },
      });
    }
  };

  const checkStatus = (status) => {
    let color = "";

    if (status === "Approved") {
      color = "#58A20F";
    } else if (status === "In Progress") {
      color = "#5FAEDA";
    } else if (status === "Initiated") {
      color = "#FFA500";
    } else if (status === "Reject") {
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
                  Complete all steps to create a job
                </p>
                <p style={{ color: "#475467", fontSize: 16 }}>
                  Complete all the steps to generate a job offer for the
                  candidate.
                </p>
                <div className="py-4 flex gap-6">
                  <div
                    className="w-28 h-28 rounded-full "
                    style={{ borderWidth: 2, borderColor: "#66B2B2" }}>
                    <img
                      src={
                        userData.image ||
                        `https://eu.ui-avatars.com/api/?name=${userName}&size=250`
                      }
                      alt="person"
                      className="rounded-full"
                    />
                    <div
                      className="relative -mt-8 justify-end flex h-9"
                      style={{ backgroundColor: "#" }}>
                      <IconButton
                        style={{ padding: 6, backgroundColor: "#66B2B2" }}>
                        <BsFillCameraFill
                          style={{ color: "#ffffff", fontSize: 22 }}
                        />
                      </IconButton>
                    </div>
                  </div>
                  <div className="mt-9">
                    <p
                      style={{
                        color: "#101828",
                        fontWeight: 600,
                        fontSize: 24,
                      }}>
                      {title}
                    </p>
                  </div>
                </div>
                <div className="flex w-full py-2">
                  <div className="w-full">
                    <p style={{ color: "#101828", fontSize: 14 }}>
                      Job Creation Completed
                    </p>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "50%", mr: 1 }}>
                        <BorderLinearProgress
                          variant="determinate"
                          value={jobCompletion}
                        />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary">{`${Math.round(
                          jobCompletion
                        )}%`}</Typography>
                      </Box>
                    </Box>
                  </div>
                  <div className="w-64">
                    <Button
                      variant="text"
                      style={{
                        color: "#5E8EBD",
                        textTransform: "none",
                        disabled: { accessDescription },
                      }}
                      // onClick={() =>
                      //   navigate("/job/outputofJobDescription", {
                      //     state: location.state,
                      //   })
                      // }
                    >
                      Access Job Description
                    </Button>
                    <IconButton
                      onClick={(e) => {
                        handleJd(e);
                      }}>
                      <HiDotsVertical style={{ color: "#D9D9D9" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="py-10">
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Complete all forms and assessments to begin
                </p>
                <p style={{ color: "#475467", fontSize: 16 }}>
                  Please fill out all the necessary forms and complete the
                  required assessments to get started
                </p>
                {/* card */}
                <div className="grid grid-cols-2 gap-5 mt-5">
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
                  {/* <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.preference ? 100 : 0}
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
                              color: userData?.preference ? "#58A20F" : "#101828",
                              fontWeight: 600,
                            }}>
                            Completed
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <p style={{ color: "#777980", fontSize: 14 }}>
                              Step 4
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
                              Job Preference
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the forth step in creating a job . Start by
                              choosing a template and filling in the relevant job
                              details.
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
                          color: userData?.preference ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => {
                          handleJobPreferences(userData);
                        }}>
                        {userData?.preference ? "Edit" : "Start"}
                      </Button>
                    </CardActions>
                  </Card> */}
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
                </div>
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

                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                            fontWeight: 400,
                          }}>
                          Below are the details for the candidates
                        </p>
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
                      <div>
                        <div className="py-5">
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
                        </div>

                        <Box sx={{ width: 980 }}>
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
                                          {row.name}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.title}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.timeStemp}
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
                                            onClick={() => {}}>
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
                                          {checkStatusRound(
                                            row.application_status
                                          )}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.application_sub_status}
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
                                            Resume.pdf
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
                                            onClick={() => {}}>
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
                                          {checkStatus(row.dtp_status)}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          padding="none"
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.dtp_status.includes(
                                            "Approved"
                                          ) ||
                                          row.dtp_status.includes("Reject") ? (
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
                                          {row.score}%
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
                                          {row.rank}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {checkStatus(row.recommended_status)}
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.application_source}
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            color: "#475467",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          {row.jobId}
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
            <MenuItem onClick={handleJobDescription}>
              <div className="flex gap-1 items-center">
                <FaLink style={{ color: "#E05880", fontSize: 14 }} />
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
            <MenuItem onClick={() => {}}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};
