import React, { useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  styled,
} from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { FaArrowRight } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillCameraFill } from "react-icons/bs";
import { SideNav } from "../../../widgets/sidenav";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import { DigitalTalentProfileData } from "../../../dummy/Data";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../utils/spinner";
import { PieChart } from "@mui/x-charts";
import { convertCompetencies } from "../../../utils/function";

export const DigitalTalentProfile = () => {
  const [userData, setUserData] = useState(DigitalTalentProfileData);

  const userName = JSON.parse(localStorage.getItem("token"))?.username
    ? JSON.parse(localStorage.getItem("token"))?.username
    : userData.name;

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
        100 - userData?.profileCompletd ? userData?.profileCompletd : 0
      }%, #008080 100%)`,
    },
  }));
  const navigate = useNavigate();
  const [disableDTP, setDisableDTP] = useState(true);
  const [assessment, setAssessment] = useState(false);
  const [valueAssessment, setValueAssessment] = useState(false);
  const [prefereness, setPreferences] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("token"));
  //   setLoading(true);
  //   axiosInstance
  //     .get(`/getCandidateDTPInfo?candidateId=${user.userId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setUserData(response.data);
  //       console.log(response.data.assessment === true);
  //       if (
  //         response.data.assessment &&
  //         response.data.valueAssessment &&
  //         response.data.preferenes &&
  //         response.data.personalInfo
  //       ) {
  //         console.log("dtp = ", disableDTP);
  //         setDisableDTP(false);
  //       }
  //       setLoading(false);
  //       // setAssessment(response.data.assessment);
  //       // setValueAssessment(response.data.valueAssessment);
  //       // setPreferences(response.data.preferenes);
  //       // setPersonalInfo(response.data.personalInfo);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }, []);

  const downloadResume = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    await axiosInstance
      .get(`/downloadResume?candidateId=${user.userId}`, {
        headers: {
          "Content-Type": "application/pdf",
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.blob());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showAssessmentResult = () => {
    if (userData.assessment === true) {
      navigate("/digitalTalentProfile/talentanalysisresult", {
        state: { version: userData?.assessmentVersionId },
      });
    } else {
      navigate("/digitalTalentProfile/analysisassessmentform");
    }
  };

  const showValueAssessmentResult = () => {
    if (userData.assessment === true) {
      navigate("/digitalTalentProfile/valueassessmentresult", {
        state: { version: userData?.valuesVersionId },
      });
    } else {
      navigate("/digitalTalentProfile/valueassessmentform");
    }
  };

  const handlePreferences = () => {
    if (userData.assessment === true) {
      navigate("/digitalTalentProfile/preferenceform", {
        state: userData?.preferencesVersionId,
      });
    } else {
      navigate("/digitalTalentProfile/preferenceform");
    }
  };

  const changeUserData = () => {
    if (userData.profileCompletd > 40) {
      setUserData({
        name: "Johnny Mathews",
        email: "Info@mathewjohhny.com.au",
        profileCompletd: 28,
      });
    } else {
      setUserData(DigitalTalentProfileData);
    }
  };

  const profileCompetition = convertCompetencies(
    userData?.prifileCompititionData[0]
  );

  return (
    <div>
      <div className="flex">
        <SideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          {loading === true ? (
            <Spinner />
          ) : (
            <div className="p-8">
              <div>
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Talent Profile Summary
                </p>
                // <p style={{ color: "#475467", fontSize: 16 }}>
                //   Craft your personalized talent profile now and let your skills
                //   shine globally.
                // </p>
                <Card
                  sx={{
                    boxShadow: 0,
                    border: 1,
                    borderColor: "#D3DFE7",
                    borderRadius: 2,
                    padding: 2,
                    backgroundColor: "#FBFCFE",
                    my: 2,
                  }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          fontWeight: 500,
                        }}>
                        Candidate Summary
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
                              style={{
                                padding: 6,
                                backgroundColor: "#66B2B2",
                              }}>
                              <BsFillCameraFill
                                style={{ color: "#ffffff", fontSize: 22 }}
                              />
                            </IconButton>
                          </div>
                        </div>
                        <div>
                          <p
                            style={{
                              color: "#101828",
                              fontWeight: 600,
                              fontSize: 24,
                            }}>
                            {userName}
                          </p>
                          <div className="flex gap-2 items-center">
                            <MdMailOutline
                              style={{
                                color: "#475467",
                                fontSize: 24,
                              }}
                            />
                            <p
                              style={{
                                color: "#475467",
                                fontSize: 16,
                              }}>
                              {JSON.parse(localStorage.getItem("token"))
                                ?.email || userData?.email}
                            </p>
                          </div>
                          <div className="flex gap-3 mt-2">
                            {userData?.resume && (
                              <Button
                                size="small"
                                variant="text"
                                onClick={() => downloadResume()}
                                style={{
                                  color: "#6941C6",
                                  textTransform: "none",
                                  backgroundColor: "#F9F5FF",
                                  borderRadius: 16,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                }}
                                startIcon={<HiOutlineDownload />}>
                                Resume
                              </Button>
                            )}
                            {userData?.linkedin && (
                              <Button
                                size="small"
                                variant="text"
                                onClick={() =>
                                  window.open(userData.linkedIn, "_blank")
                                }
                                style={{
                                  color: "#3538CD",
                                  textTransform: "none",
                                  backgroundColor: "#EEF4FF",
                                  borderRadius: 16,
                                  paddingLeft: 10,
                                  paddingRight: 10,
                                }}
                                startIcon={<MdOutlineArrowOutward />}>
                                Linkedin
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-full">
                        <p style={{ color: "#101828", fontSize: 14 }}>
                          Profile Completion
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
                              value={userData?.personalInfo}
                            />
                          </Box>

                          <Box
                            sx={{
                              minWidth: 35,
                              position: "absolute",
                              left: `${Math.round(
                                userData?.personalInfo - 3
                              )}%`,
                              mt: 2,
                            }}>
                            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xl border border-[#D0D5DD]">
                              <p
                                style={{
                                  color: "#101828",
                                  fontSize: 11,
                                  fontWeight: 600,
                                }}>{`${Math.round(
                                userData?.personalInfo
                              )}%`}</p>
                            </div>
                          </Box>
                        </Box>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          fontWeight: 500,
                        }}>
                        Profile Competition
                      </p>
                      <div className="flex py-2 items-center">
                        <div className="flex justify-end">
                          <PieChart
                            series={profileCompetition}
                            width={300}
                            height={200}
                            slotProps={{
                              legend: {
                                hidden: true,
                              },
                            }}
                          />
                        </div>
                        <div className="-ml-20 w-full">
                          <div className="flex justify-between w-full border-b-2 border-[#D4D4D4]">
                            <p
                              style={{
                                color: "#475467",
                                fontSize: 14,
                                fontWeight: 500,
                              }}>
                              Status
                            </p>
                            <p
                              style={{
                                color: "#475467",
                                fontSize: 14,
                                fontWeight: 500,
                              }}>
                              Percentage
                            </p>
                          </div>
                          {profileCompetition?.map((row, index) => {
                            return (
                              <div
                                className="flex w-full justify-between items-center py-2"
                                key={index}>
                                <div className="flex gap-2 items-center">
                                  <div
                                    style={{
                                      backgroundColor: row?.data[0]?.color,
                                      width: 12,
                                      height: 12,
                                      borderRadius: 100,
                                    }}
                                  />
                                  <p
                                    style={{
                                      color: "#101828",
                                      fontSize: 14,
                                    }}>
                                    {row?.data[0]?.label}
                                  </p>
                                </div>
                                <p
                                  style={{
                                    color: "#101828",
                                    fontSize: 14,
                                    fontWeight: 500,
                                  }}>
                                  {row?.data[0]?.value}%
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-end gap-4">
                    <Button
                      size="small"
                      variant="text"
                      style={{
                        color: "#5FAEDA",
                        textTransform: "none",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        navigate("/candidate");
                      }}>
                      Update Digital Talent Profile (DTP)
                    </Button>

                    <Button
                      size="small"
                      variant="text"
                      style={{
                        color: "#008080",
                        textTransform: "none",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        navigate("/OutputofDigitalTalentProfile");
                      }}>
                      Access Digital Talent Profile(DTP)
                    </Button>
                  </div>
                </Card>
              </div>
              {/* card */}
              {/* <div className="py-10">
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Complete all forms and assessments to begin
                </p>
                <p style={{ color: "#475467", fontSize: 16 }}>
                  Please fill out all the necessary forms and complete the
                  required assessments to get started
                </p>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.personalInfo ? 100 : 0}
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
                              color: userData?.personalInfo
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
                              Candidate Form
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the first step in creating your DTP.
                              <br /> After completing this, you can proceed with
                              the other forms.
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
                          color: userData?.personalInfo ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() =>
                          navigate("/digitalTalentProfile/personalinfromation")
                        }>
                        {userData?.personalInfo ? "Edit" : "Not taken"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.preferences ? 100 : 0}
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
                              color: userData?.preferences
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
                              Preference Form
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the first step in creating your DTP.
                              <br /> After completing this, you can proceed with
                              the other forms.
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
                          color: userData?.preferences ? "#1E90FF" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() =>
                          handlePreferences()
                        }>
                        {userData?.preferences ? "Edit" : "Not taken"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.valueAssessment ? 100 : 0}
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
                              color: userData?.valueAssessment
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
                              Value Assessment
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the first step in creating your DTP.
                              <br /> After completing this, you can proceed with
                              the other forms.
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
                          color: userData?.valueAssessment
                            ? "#FFA500"
                            : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => showValueAssessmentResult()}>
                        {userData?.valueAssessment ? "view results" : "Not taken"}
                      </Button>
                    </CardActions>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <Gauge
                            height={100}
                            value={userData?.assessment ? 100 : 0}
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
                              color: userData?.assessment ? "#58A20F" : "#101828",
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
                              Talent Spectrum Analysis
                            </p>
                            <p style={{ color: "#475467", fontSize: 16 }}>
                              This is the first step in creating your DTP.
                              <br /> After completing this, you can proceed with
                              the other forms.
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
                          color: userData?.assessment ? "#FFA500" : "#E05880",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                        endIcon={<FaArrowRight />}
                        onClick={() => showAssessmentResult()}>
                        {userData?.assessment ? "view results" : "Not taken"}
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
