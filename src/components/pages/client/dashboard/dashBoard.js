import React, { useState } from "react";
import { IconButton, Card, Button } from "@mui/material";
import { IoCamera } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import { AssesmentSvg } from "../../../../assets/icon/assesmentsvg";
import { AuthorizedSvg } from "../../../../assets/icon/authorizedsvg";
import { JobSvg } from "../../../../assets/icon/jobsvg";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    companyName: "Xenspire",
    candidatesCount: 7,
    assessmentCount: 20,
    jobCount: 10,
  });


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
      //setLoading(true);
      axiosInstance
        .get(`/getClientDashboardData?clientId=${user.userId}`)
        .then((response) => {
          console.log(response.data);
          setuserData(response.data);
        })
        .catch((e) => {
          console.log(e);
          //setLoading(false);
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
              <p style={{ color: "#101828", fontSize: 20, fontWeight: 600 }}>
                Home
              </p>
              // <p style={{ color: "#475467", fontSize: 16 }}>
              //   Connecting Talent with Opportunities for Growth and
              //   Succes101828s
              // </p>
            </div>
            <div className="flex gap-6 items-center py-5">
              <div className="w-28 h-28 border border-[#66B2B2] rounded-full">
                <img
                  src="https://picsum.photos/id/25/5000/3333"
                  alt="user"
                  style={{
                    borderRadius: "100%",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <div className="relative -mt-8 justify-end flex h-8">
                  <IconButton
                    style={{ padding: 5, backgroundColor: "#66B2B2" }}>
                    <IoCamera style={{ color: "#ffffff", fontSize: 22 }} />
                  </IconButton>
                </div>
              </div>
              <div className="">
                <p style={{ color: "#101828", fontSize: 24, fontWeight: 600 }}>
                  {userData?.companyName}
                </p>
              </div>
            </div>
            <div className="py-4 mt-10">
              <p style={{ color: "#101828", fontSize: 20, fontWeight: 600 }}>
                Summary
              </p>
              // <p style={{ color: "#475467", fontSize: 16 }}>
              //   Please review and complete the following actions that are
              //   currently pending
              // </p>
              <div className="flex justify-between gap-10 py-4">
                <Card
                  sx={{
                    borderRadius: 4,
                    padding: 1,

                    minWidth: "350px",
                  }}>
                  <div className="p-4 gap-2 flex items-center">
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
                      <AuthorizedSvg COLOR="#F78F54" />
                    </div>
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 16,
                        fontWeight: 600,
                      }}>
                      Candidates Count
                    </p>
                  </div>
                  <div className="mx-2 border border-[#D0D5DD]" />
                  <div className="p-4">
                    <p
                      style={{
                        color: "#1D1F2C",
                        fontSize: 30,
                        fontWeight: 600,
                      }}>
                      {userData?.candidatesCount || "00"}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 14,
                        }}>
                        Candidates created in database
                      </p>
                      <Button onClick={() => navigate("/clientAssignedCandidates")}>
                      <FaArrowRight style={{ color: "#008080" }} />
                      </Button>
                    </div>
                  </div>
                </Card>
                <Card
                  sx={{
                    borderRadius: 4,
                    padding: 1,

                    minWidth: "350px",
                  }}>
                  <div className="p-4 gap-2 flex items-center">
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
                      <AssesmentSvg COLOR="#A1CBB3" />
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
                  <div className="mx-2 border border-[#D0D5DD]" />
                  <div className="p-4">
                    <p
                      style={{
                        color: "#1D1F2C",
                        fontSize: 30,
                        fontWeight: 600,
                      }}>
                      {userData?.assessmentCount || "00"}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 14,
                        }}>
                        Client Assessments created
                      </p>
                      <Button onClick={() => navigate("/assessmentsList")}>
                      <FaArrowRight style={{ color: "#008080" }} />
                      </Button>
                    </div>
                  </div>
                </Card>
                <Card
                  sx={{
                    borderRadius: 4,
                    padding: 1,

                    minWidth: "350px",
                  }}>
                  <div className="p-4 gap-2 flex items-center">
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
                      <JobSvg COLOR="#6A0DAD" />
                    </div>
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 16,
                        fontWeight: 600,
                      }}>
                      Job Created
                    </p>
                  </div>
                  <div className="mx-2 border border-[#D0D5DD]" />
                  <div className="p-4">
                    <p
                      style={{
                        color: "#1D1F2C",
                        fontSize: 30,
                        fontWeight: 600,
                      }}>
                      {userData?.jobCount || "00"}
                    </p>
                    <div className="flex justify-between items-center">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 14,
                        }}>
                        No. of jobs that have been created
                      </p>
                      <Button onClick={() => navigate("/job/allJobs")}>
                      <FaArrowRight style={{ color: "#008080" }} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
