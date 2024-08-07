import React, { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { Button, Card, Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { BsPerson, BsThreeDotsVertical } from "react-icons/bs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SlLink } from "react-icons/sl";
import { GoPlus } from "react-icons/go";
import { TbEdit } from "react-icons/tb";
import { MdOutlineRemoveRedEye, MdStarBorder } from "react-icons/md";
import logo from "../../../../assets/images/logo.png";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import { AssesmentSvg } from "../../../../assets/icon/assesmentsvg";
import { BiPeoplesvg } from "../../../../assets/icon/biPeoplesvg";
import { Scoresvgreposvg } from "../../../../assets/icon/scoresvgreposvg";
import {
  interviewFeedBackData,
  jobAssessmentsResultsData,
  jobOverviewData,
  jobScreeningQuestionData,
} from "../../../dummy/Data";
import { InterviewFeedBackPopupAdd } from "./interviewFeedBackPopupAdd";
import { InterviewFeedBackPopupEdit } from "./interviewFeedBackPopupEdit";
import { InterviewFeedBackPopupView } from "./interviewFeedBackPopupView";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Spinner from "../../../utils/spinner";
import logoNew from "../../../../assets/images/xenrecruit.png";
import { useLocation } from "react-router-dom";


export const JobCandidateCombination = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  const [overview, setOverview] = useState(jobOverviewData);
  const [screeningQuestion, setScreeningQuestion] = useState(
    jobScreeningQuestionData
  );
  const [assessmentsResults, setAssessmentsResults] = useState(
    jobAssessmentsResultsData
  );

  const [interviewPopupAdd, setInterviewPopupAdd] = useState(false);
  const [interviewPopupEdit, setInterviewPopupEdit] = useState(false);
  const [interviewPopupData, setInterviewPopupData] = useState(
    interviewFeedBackData
  );
  const [interviewPopupView, setInterviewPopupView] = useState(false);

  const [anchorAction, setAnchorAction] = useState();
  const actionOpen = Boolean(anchorAction);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSetActionAnchor = (event) => {
    setAnchorAction(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorAction(null);
  };

  const handleClosePopUp = () => {
    setInterviewPopupAdd(false);
    setInterviewPopupEdit(false);
    setInterviewPopupView(false);
    // setInterviewPopupData();
    handleCloseAnchor();
  };

  useEffect(() => {
    console.log(location.state);
    if(location?.state === "screening") {
      setValue(1);
    }
    if(location?.state === "assessment"){
      setValue(2);
    }
  }, [location.state])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
      axiosInstance
        .get(`/getCandidateScreeningQuestions?candidateId=1&jobId=1`)
        .then((response) => {
          console.log(response.data);
          setScreeningQuestion(response.data)
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
      axiosInstance
        .get(
          `/getJobCandidateInfo?clientId=${user.userId}&jobId=1&candidateId=1`
        )
        .then((response) => {
          console.log(response);
          setOverview(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
  }, []);

  const ScreeningQuestions = () => {
    return (
      <div className="p-4">
        <div className="flex justify-end">
          <p style={{ color: "#008080", fontSize: 14 }}>
            Date Taken: {screeningQuestion?.date}
          </p>
        </div>
        <Card
          sx={{
            borderRadius: 4,
            py: 1,
            mt: 1,
            boxShadow: 0,
            border: 1,
            borderColor: "#E6E6E650",
          }}>
          {screeningQuestion?.map((row, index) => {
            return (
              <div key={index} className="flex py-3 px-5 gap-5">
                <p
                  style={{
                    color: "#3C3C4360",
                    fontSize: 25,
                    fontWeight: 600,
                  }}>
                  {index + 1}
                </p>
                <div>
                  <p
                    style={{
                      color: "#101828",
                      fontSize: 18,
                      fontWeight: 500,
                    }}>
                    {row?.question}
                  </p>
                  <p
                    style={{
                      color: "#9D9DA0",
                      fontSize: 18,
                      marginTop: 5,
                    }}>
                    Response
                  </p>
                  <p
                    style={{
                      color: "#475467",
                      fontSize: 18,
                    }}>
                    {row?.response}
                  </p>
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    );
  };

  const AssessmentsResults = () => {
    return (
      <div className="flex flex-col gap-4 mt-3">
        {assessmentsResults?.map((row, index) => {
          return (
            <Card
              key={index}
              sx={{
                boxShadow: 0,
                borderRadius: 4,
                py: 2,
                px: 3,
                display: "grid",
                rowGap: 2,
                backgroundColor: "#FAFAFB30",
                border: 1,
                borderColor: "#E6E6E650",
              }}>
              <p style={{ color: "#475467", fontSize: 14 }}>
                Date Taken: {row?.date}
              </p>
              <p style={{ color: "#101828", fontSize: 18, fontWeight: 600 }}>
                Assessment Title:{" "}
                <span style={{ color: "#475467" }}> {row?.title}</span>
              </p>
              <p
                style={{
                  color: row?.score < 30 ? "#E05880" : "#28A745",
                  fontSize: 16,
                }}>
                Score/Result: {row?.score}%
              </p>
              <p style={{ color: "#101828", fontSize: 16 }}>
                Evaluator Comments:{" "}
                <span style={{ color: "#475467" }}> {row?.comment}</span>
              </p>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* top nav */}
      <div className="flex w-full">
        <div className="p-2 pl-5 flex gap-2">
        <img
            src={logoNew}
            alt="logo"
            style={{ width: 100}}
          />
        </div>
        </div>
        <div className="w-full min-h-screen">
        <TopNav />
          {loading === true ? (
                <Spinner />
              ) : (
              <div className="p-8 min-h-screen">
                <div className="flex gap-6 items-center">
                  <div className="w-28 h-28">
                    <img
                      src="https://picsum.photos/id/25/5000/3333"
                      alt="user"
                      style={{
                        borderRadius: "100%",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ color: "#101828", fontSize: 20, fontWeight: 600 }}>
                      ANNA MATHEW
                    </p>
                    <p style={{ color: "#475467", fontSize: 16 }}>
                      Senior Backend Developer
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[350px] p-1 flex flex-col gap-5 items-center mt-5 h-screen bg-[#FBFCFE] sticky top-2">
                    <div className="flex flex-col items-center py-4">
                      <p style={{ color: "#101828", fontSize: 16, fontWeight: 500 }}>
                        Job matchFit Score
                      </p>
                      <div className="w-24 h-24">
                        <Gauge
                          value={80}
                          startAngle={90}
                          endAngle={450}
                          innerRadius="80%"
                          outerRadius="100%"
                          cornerRadius="50%"
                          sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                              fontSize: 20,
                              color: "#101828",
                              fontWeight: 500,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                              fill: "#F8E268",

                              color: "#F5F5F5",
                            },
                          })}
                          text={({ value }) => `${value}%`}
                        />
                      </div>
                    </div>
                    <div className="w-60 grid grid-cols-2 gap-0">
                      <div
                        className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border text-center"
                        style={{
                          backgroundColor: "#00808015",
                          borderColor: "#EDEFF2",
                        }}>
                        <BsPerson
                          style={{ color: "#008080", fontSize: 24, fontWeight: 500 }}
                        />
                        <p style={{ color: "#008080", fontSize: 12, fontWeight: 600 }}>
                          Candidate <br /> Evaluation form
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border border-[#EDEFF2] text-center">
                        <Scoresvgreposvg COLOR={"#ADB8CC"} />
                        <p style={{ color: "#ADB8CC", fontSize: 12, fontWeight: 600 }}>
                          Overall Scoring
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border border-[#EDEFF2] text-center">
                        <BiPeoplesvg COLOR={"#ADB8CC"} />
                        <p style={{ color: "#ADB8CC", fontSize: 12, fontWeight: 600 }}>
                          Interview
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border border-[#EDEFF2] text-center">
                        <MdStarBorder
                          style={{ color: "#ADB8CC", fontSize: 24, fontWeight: 500 }}
                        />
                        <p style={{ color: "#ADB8CC", fontSize: 12, fontWeight: 600 }}>
                          Rating and <br />
                          Reviews
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border border-[#EDEFF2] text-center">
                        <AssesmentSvg COLOR={"#ADB8CC"} />
                        <p style={{ color: "#ADB8CC", fontSize: 12, fontWeight: 600 }}>
                          Notes
                        </p>
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2 h-[120px] w-[120px] border border-[#EDEFF2] text-center">
                        <SlLink
                          style={{ color: "#ADB8CC", fontSize: 24, fontWeight: 500 }}
                        />
                        <p style={{ color: "#ADB8CC", fontSize: 12, fontWeight: 600 }}>
                          Attachments
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <Box sx={{ width: "100%", py: 2 }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          sx={{
                            "& .MuiTab-root.Mui-selected": {
                              color: "#101828",
                            },
                            "& .MuiTabs-indicator": {
                              backgroundColor: "#101828",
                              height: 3,
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                            },
                          }}>
                          <Tab
                            label="Overview"
                            id="1"
                            sx={{
                              color: "#475467",
                              textTransform: "none",
                              fontWeight: 500,
                              fontSize: 16,
                            }}
                          />
                          <Tab
                            label="Screening Questions Responses"
                            id="2"
                            sx={{
                              color: "#475467",
                              textTransform: "none",
                              fontWeight: 500,
                              fontSize: 16,
                            }}
                          />
                          <Tab
                            label="Assessments Results"
                            id="3"
                            sx={{
                              color: "#475467",
                              textTransform: "none",
                              fontWeight: 500,
                              fontSize: 16,
                            }}
                          />
                        </Tabs>
                      </Box>
                      {value === 0 && (
                        <div className="flex flex-col gap-4 mt-4">
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6]">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Basic Job Details
                              </p>
                            </div>
                            <div className="px-4 py-2 bg-[#FBFCFE40]">
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Title
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.title}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Family
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.family}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Code
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.code}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Status
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.status}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Department
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.department}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Posting Date
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.date}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Job Location
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.jobDetails?.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6]">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Candidate Details
                              </p>
                            </div>
                            <div className="px-4 py-2 bg-[#FBFCFE40]">
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Candidate Name
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.name}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Current Location
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.location}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Candidate ID
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.id}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Years of Experience
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.experiance}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Mobile No.
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.no}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Education
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.education}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Email
                                  </p>
                                  <p style={{ color: "#1E90FF", fontSize: 14 }}>
                                    {overview?.candidateDetails?.email}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Skills
                                  </p>
                                  <div className="flex gap-1">
                                    {overview?.candidateDetails?.skills.map(
                                      (row, index) => (
                                        <p
                                          key={index}
                                          style={{ color: "#101828", fontSize: 14 }}>
                                          {row},
                                        </p>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6 border-b py-2 border-[#DCDCDC50]">
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Candidate Status
                                  </p>
                                  <p style={{ color: "#FFA500", fontSize: 14 }}>
                                    {overview?.candidateDetails?.status}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p
                                    style={{
                                      color: "#10182875",
                                      fontSize: 14,
                                      fontWeight: 600,
                                      width: 180,
                                    }}>
                                    Application Date
                                  </p>
                                  <p style={{ color: "#101828", fontSize: 14 }}>
                                    {overview?.candidateDetails?.date}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6] flex justify-between items-center">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Interview Feedback
                              </p>
                              <Button
                                size="small"
                                style={{ color: "#008080", textTransform: "none" }}
                                startIcon={<GoPlus />}
                                onClick={() => {
                                  setInterviewPopupAdd(true);
                                }}>
                                Add New
                              </Button>
                            </div>
                            <Box sx={{ width: "100%" }}>
                              <Paper sx={{ width: "100%" }}>
                                <TableContainer>
                                  <Table
                                    stickyHeader
                                    size="small"
                                    sx={{ backgroundColor: "#FBFCFE50" }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Created By
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Created Date
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Rating
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Actions
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {overview?.interviewFeedback?.map((row, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.createdBy}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.createdDate}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.overallRating}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}
                                              align="center">
                                              <IconButton
                                                onClick={(e) => {
                                                  handleSetActionAnchor(e);
                                                  setInterviewPopupData(row);
                                                }}>
                                                <BsThreeDotsVertical
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
                          </Card>
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6]">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Overall Ratings and Reviews
                              </p>
                            </div>
                            {overview?.overallReview?.length > 0 ? (
                              <Box sx={{ width: "100%" }}>
                                <Paper sx={{ width: "100%" }}>
                                  <TableContainer>
                                    <Table
                                      stickyHeader
                                      size="small"
                                      sx={{ backgroundColor: "#FBFCFE50" }}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Created By
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Created Date
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Rating
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Actions
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {overview?.interview?.map((row, index) => {
                                          return (
                                            <TableRow key={index}>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.createdBy}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.date}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.rating}
                                              </TableCell>
                                              <TableCell
                                                padding="none"
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}
                                                align="center">
                                                <IconButton>
                                                  <BsThreeDotsVertical
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
                            ) : (
                              <div className="py-2 px-4 bg-[#FBFCFE50]">
                                <p style={{ color: "#475467", fontSize: 14 }}>
                                  No ratings (out of 5) or reviews added
                                </p>
                              </div>
                            )}
                          </Card>
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6] flex justify-between items-center">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Notes
                              </p>
                              <Button
                                size="small"
                                style={{ color: "#008080", textTransform: "none" }}
                                startIcon={<GoPlus />}>
                                Add New
                              </Button>
                            </div>
                            {overview?.notes?.length > 0 ? (
                              <Box sx={{ width: "100%" }}>
                                <Paper sx={{ width: "100%" }}>
                                  <TableContainer>
                                    <Table
                                      stickyHeader
                                      size="small"
                                      sx={{ backgroundColor: "#FBFCFE50" }}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Created By
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Created Date
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Rating
                                          </TableCell>
                                          <TableCell
                                            align="center"
                                            sx={{
                                              color: "#101828",
                                              backgroundColor: "#FBFCFE50",
                                              border: 1,
                                              borderColor: "#D0D5DD50",
                                            }}>
                                            Actions
                                          </TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {overview?.interview?.map((row, index) => {
                                          return (
                                            <TableRow key={index}>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.createdBy}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.date}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}>
                                                {row?.rating}
                                              </TableCell>
                                              <TableCell
                                                padding="none"
                                                sx={{
                                                  color: "#475467",
                                                  border: 1,
                                                  borderColor: "#D0D5DD50",
                                                }}
                                                align="center">
                                                <IconButton>
                                                  <BsThreeDotsVertical
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
                            ) : (
                              <div className="py-2 px-4 bg-[#FBFCFE50]">
                                <p style={{ color: "#475467", fontSize: 14 }}>
                                  Add notes to user
                                </p>
                              </div>
                            )}
                          </Card>
                          <Card
                            sx={{
                              boxShadow: 0,
                              border: 1,
                              borderColor: "#E6E6E650",
                              borderRadius: 2,
                            }}>
                            <div className="py-2 px-4 bg-[#F7FBFB] w-full border-b border-[#E6E6E6] flex justify-between items-center">
                              <p
                                style={{
                                  color: "#008080",
                                  fontSize: 16,
                                  fontWeight: 500,
                                }}>
                                Attachments
                              </p>
                              <Button
                                size="small"
                                style={{ color: "#008080", textTransform: "none" }}
                                startIcon={<GoPlus />}>
                                Add New
                              </Button>
                            </div>
                            <Box sx={{ width: "100%" }}>
                              <Paper sx={{ width: "100%" }}>
                                <TableContainer>
                                  <Table
                                    stickyHeader
                                    size="small"
                                    sx={{ backgroundColor: "#FBFCFE50" }}>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          File Name
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          File Type
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Date Uploaded
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Uploaded By
                                        </TableCell>
                                        <TableCell
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Description
                                        </TableCell>
                                        <TableCell
                                          align="center"
                                          sx={{
                                            color: "#101828",
                                            backgroundColor: "#FBFCFE50",
                                            border: 1,
                                            borderColor: "#D0D5DD50",
                                          }}>
                                          Actions
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {overview?.attechments?.map((row, index) => {
                                        return (
                                          <TableRow key={index}>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.name}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.fileType}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.date}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.uploadBy}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}>
                                              {row?.description}
                                            </TableCell>
                                            <TableCell
                                              padding="none"
                                              sx={{
                                                color: "#475467",
                                                border: 1,
                                                borderColor: "#D0D5DD50",
                                              }}
                                              align="center">
                                              <IconButton
                                                onClick={(e) => {
                                                  handleSetActionAnchor(e);
                                                  // setInterviewPopupData(row);
                                                }}>
                                                <BsThreeDotsVertical
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
                          </Card>
                        </div>
                      )}
                      {value === 1 && <ScreeningQuestions />}
                      {value === 2 && <AssessmentsResults />}
                    </Box>
                  </div>
                </div>
                {/*Actions menu */}
                <Menu
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorAction}
                  open={actionOpen}
                  onClose={handleCloseAnchor}
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
                      setInterviewPopupEdit(true);
                    }}>
                    <div className="flex gap-1 items-center">
                      <TbEdit style={{ color: "#5FAEDA", fontSize: 16 }} />
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

                  <MenuItem
                    onClick={() => {
                      setInterviewPopupView(true);
                    }}>
                    <div className="flex gap-1 items-center">
                      <MdOutlineRemoveRedEye
                        style={{ color: "#58A20F", fontSize: 16 }}
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

                <InterviewFeedBackPopupAdd
                  open={interviewPopupAdd}
                  setClose={handleClosePopUp}
                />
                <InterviewFeedBackPopupEdit
                  open={interviewPopupEdit}
                  setClose={handleClosePopUp}
                  data={interviewPopupData}
                />
                <InterviewFeedBackPopupView
                  open={interviewPopupView}
                  setClose={handleClosePopUp}
                  data={interviewPopupData}
                />
              </div>
            )}
        </div>
      <Footer />
    </div>
  );
};
