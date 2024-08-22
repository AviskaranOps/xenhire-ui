import React, { useState } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts";
import { Button, Card, CardContent, IconButton, styled } from "@mui/material";
import { FaArrowRight } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineArrowOutward } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFillCameraFill } from "react-icons/bs";
import { SideNav } from "../../../widgets/sidenav";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import { DashBoardData } from "../../../dummy/Data";
import { AssesmentSvg } from "../../../../assets/icon/assesmentsvg";
import { AuthorizedSvg } from "../../../../assets/icon/authorizedsvg";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../utils/spinner";
import { RejectBagsvg } from "../../../../assets/icon/rejectBagsvg";
import { PersonBagsvg } from "../../../../assets/icon/personBagsvg";
import { BagWithPesonsvg } from "../../../../assets/icon/bagWithPesonsvg";
import { convertCompetencies } from "../../../utils/function";

export const HomePage = () => {
  const [userData, setUserData] = useState(DashBoardData);
  const [authorizedCount, setAuthorizedCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [selfCount, setselfCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [linkedIn, setLinkedIn] = useState("");

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get("/getCandidateDTPInfo?candidateId=" + user.userId)
      .then((response) => {
        console.log(response.data);
        setLinkedIn(response.data?.linkedIn);
        // setUserData(response.data);
        
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    setLoading(true);
    axiosInstance
      .get(`/getCandidateAssessmentCount?candidateId=${user.userId}`)
      .then((response) => {
        // setAuthorizedCount(response.data.authorizedCount);
        // setClientCount(response.data.clientCount);
        // setselfCount(response.data.selfCount);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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
                  Dashboard
                </p>
                // <p style={{ color: "#475467", fontSize: 16 }}>
                //   Complete all the steps to generate a job offer for the
                //   candidate.
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
                            {linkedIn && (
                              <Button
                                size="small"
                                variant="text"
                                onClick={() =>
                                  window.open(linkedIn, "_blank")
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
                      Update Digital Talent Profile(DTP)
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

              {/* Actions need to be taken */}
              <div className="py-5">
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Actions need to be taken
                </p>
                <p style={{ color: "#475467", fontSize: 16 }}>
                  Please review and complete the following actions that are
                  currently pending
                </p>
                <div className="grid grid-cols-3 gap-5 mt-5">
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#FEF5F0",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <AuthorizedSvg COLOR={"#F78F54"} />
                        </div>
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Add Authorised Clients
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {authorizedCount}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Client request that are pending
                        </p>
                        <Button onClick={() => navigate("/authorisedclients")}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#E8F2EC",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <AssesmentSvg COLOR={"#A1CBB3"} />
                        </div>
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Client Assessments
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {clientCount}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Client Assessments needs to be taken
                        </p>
                        <Button onClick={() => navigate("/assesmentform", { state : 3})}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#F1EFF7",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <AssesmentSvg COLOR={"#6A0DAD"} />
                        </div>
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Self- Assessments
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {selfCount}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Assessments needs to be taken
                        </p>
                        <Button onClick={() => navigate("/assesmentform", { state : 2 })}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Actions need to be taken */}
              <div className="py-5">
                <p style={{ color: "#101828", fontWeight: 600, fontSize: 20 }}>
                  Jobs Summary
                </p>
                // <p style={{ color: "#475467", fontSize: 16 }}>
                //   Please review and complete the following actions that are
                //   currently pending
                // </p>
                <div className="grid grid-cols-3 gap-5 mt-5">
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#007BFF15",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <PersonBagsvg COLOR={"#007BFF"} />
                        </div>
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Jobs Applied
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {userData?.jobApllied || 0}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Total no. of job you have applied for
                        </p>
                        <Button onClick={() => navigate("/job/jobportal")}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#F9CFCF",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <RejectBagsvg COLOR={"#B22234"} />
                        </div>
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Jobs Rejected
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {userData?.jobRejected || 0}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Total no. of job rejected
                        </p>
                        <Button onClick={() => navigate("/job/jobportal")}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card sx={{ borderRadius: 5 }}>
                    <CardContent>
                      <div className="flex gap-3 items-center pb-5">
                        <div
                          style={{
                            backgroundColor: "#28A74515",
                            borderRadius: 200,
                            width: 37,
                            height: 37,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <BagWithPesonsvg COLOR={"#28A745"} />
                        </div>

                        <p
                          style={{
                            color: "#475467",
                            fontSize: 16,
                            fontWeight: 600,
                          }}>
                          Jobs Interview
                        </p>
                      </div>
                      <p
                        style={{
                          color: "#1D1F2C",
                          fontWeight: 600,
                          fontSize: 30,
                        }}>
                        {userData?.jobInterview || 0}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p
                          style={{
                            color: "#475467",
                            fontSize: 14,
                          }}>
                          Total no. of job interview
                        </p>
                        <Button onClick={() => navigate("/job/jobportal")}>
                        <IconButton>
                          <FaArrowRight
                            style={{ color: "#008080", fontSize: 18 }}
                          />
                        </IconButton>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
