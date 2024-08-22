import React, { Fragment, useRef, useState } from "react";
import {
  Card,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";
import { convertCompetencies } from "../../../utils/function";
import {
  BehaviouralAttributes,
  candidatePersonalInfoData,
  candidatePreferenceFormData,
  icpTemplateResultData,
  workValueViewData,
} from "../../../dummy/Data";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import { ColorBodySvg } from "../../../../assets/icon/ColorBodySvg";
import { SideNav } from "../../../widgets/sidenav";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoNew from "../../../../assets/images/xenrecruit.png";

export const OutputofDigitalTalentProfile = () => {
  const spectrums = [
    "spectrum1",
    "spectrum2",
    "spectrum3",
    "spectrum4",
    "spectrum5",
  ];
  const printRef = useRef();
  const [personalInfo, setPersonalInfio] = useState(candidatePersonalInfoData);
  const [preferenceForm, setPreferenceForm] = useState(
    candidatePreferenceFormData
  );
  const [behaviour, setBehaviour] = useState(BehaviouralAttributes);
  const [workValueData, setWorkValueData] = useState(workValueViewData.data);
  const [icpAnalysisData, setIcpAnalysisData] = useState(icpTemplateResultData);
  const [pillars, setPillars] = useState(spectrums);
  const [loading, setLoading] = useState(false);
  const [loadpdf, setloadpdf] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    //setLoading(true);
    axiosInstance
      .get(`/getCandidateDTPDescription?candidateId=${user.userId}`)
      .then((response) => {
        console.log(response.data);
        setPersonalInfio(response.data.personalInfo);
        // setPreferenceForm(response.data.preferences);
        setWorkValueData(response.data?.values);
        setIcpAnalysisData(response.data.dtpResult);
        setPillars(response.data.dtpResult.pillars);
        setBehaviour(response.data.dtpResult.behaviourAttributes);
        console.log(response.data.assessment === true);
        //setLoading(false);
        // setAssessment(response.data.assessment);
        // setValueAssessment(response.data.valueAssessment);
        // setPreferences(response.data.preferenes);
        // setPersonalInfo(response.data.personalInfo);
      })
      .catch((error) => {
        console.log(error);
        //setLoading(false);
      });
  }, []);

  const convertedEmtional = convertCompetencies(
    icpAnalysisData?.emtionalFlexibility[0]
  );

  const convertSociability = convertCompetencies(
    icpAnalysisData?.sociabilitySkills[0]
  );

  const convertCognitive = convertCompetencies(
    icpAnalysisData?.cognitiveAgility[0]
  );

  const DownloadPdf = async () => {
    setloadpdf(true);
    // const user = JSON.parse(localStorage.getItem("token"));
    // axiosInstance
    //   .get(`/getPdf=${user.userId}&jobId=${location.state.jobId}`)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    setTimeout(() => {
      setloadpdf(false);
      generatePdf();
    }, 0);
  };

  const generatePdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    // Calculate the required dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Use A2 size (420mm x 594mm) or any other desired size
    const pageWidth = imgWidth;
    const pageHeight = imgHeight - 600;

    // Initialize jsPDF with custom page size
    const pdf = new jsPDF("p", "px", [pageWidth, pageHeight]);

    // Calculate the scaling ratio to fit the height
    const heightRatio = pageHeight / imgHeight;
    const newImgHeight = pageHeight;
    const newImgWidth = imgWidth * heightRatio;

    // Center the image horizontally if needed
    const xOffset = 70;
    const yOffset = 0; // Top of the page

    // pdf.addImage(imgData, "PNG", xOffset, yOffset, newImgWidth, newImgHeight);
    pdf.addImage(imgData, "PNG", xOffset, yOffset, newImgWidth, newImgHeight);
    pdf.save("Output_Of_DTP.pdf");
  };

  return (
    <div>
      <div className="flex ">
        <SideNav />

        <div className="w-full min-h-screen">
          <TopNav />
          <div className="p-8" ref={printRef}>
            <div className="flex justify-between px-5 items-center">
              <div>
                <p
                  style={{
                    color: "#008080",
                    fontSize: 22,
                    fontWeight: 600,
                  }}>
                  Output of Digital Talent Profile
                </p>
                <p style={{ color: "#475467", fontSize: 14 }}>
                  Below is the information for the created job description.
                </p>
              </div>
              {loadpdf ? (
                <>
                  <img src={logoNew} alt="logo" style={{ width: 180 }} />
                </>
              ) : (
                <div className="w-fit">
                  <Button
                    size="small"
                    variant="text"
                    style={{ color: "#5E8EBD", textTransform: "none" }}
                    endIcon={<FiDownload />}
                    onClick={DownloadPdf}>
                    Download PDF
                  </Button>
                </div>
              )}
            </div>
            {/* Candidate’s Personal Detail Information */}
            <Card className="p-4 my-4">
              <div>
                <p style={{ color: "#008080", fontSize: 18, fontWeight: 500 }}>
                  Candidate’s Personal Detail Information
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex gap-5">
                  <p style={{ color: "#475467", fontSize: 18, minWidth: 250 }}>
                    Resume
                  </p>
                  <p style={{ color: "#101828", fontSize: 18 }}>
                    {personalInfo?.resume}
                  </p>
                </div>
                <div className="flex gap-5">
                  <p style={{ color: "#475467", fontSize: 18, minWidth: 250 }}>
                    Mobile Number
                  </p>
                  <p style={{ color: "#101828", fontSize: 18 }}>
                    {personalInfo?.mobileNumber}
                  </p>
                </div>
                <div className="flex gap-5">
                  <p style={{ color: "#475467", fontSize: 18, minWidth: 250 }}>
                    Title
                  </p>
                  <p style={{ color: "#101828", fontSize: 18 }}>
                    {personalInfo?.title}
                  </p>
                </div>

                <div className="flex gap-5">
                  <p style={{ color: "#475467", fontSize: 18, minWidth: 250 }}>
                    LinkedIn Link
                  </p>
                  <a
                    style={{
                      color: "#5E8EBD",
                      fontSize: 18,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    href="#">
                    {personalInfo?.url}
                  </a>
                </div>
              </div>
              <div className="flex gap-5">
                <p style={{ color: "#475467", fontSize: 18, minWidth: 250 }}>
                  Summary
                </p>
                <p style={{ color: "#101828", fontSize: 18 }}>
                  {personalInfo?.summary}
                </p>
              </div>
              <div className="py-4">
                <p style={{ color: "#008080", fontSize: 18, fontWeight: 500 }}>
                  Education
                </p>
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex gap-5">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 250,
                      }}>
                      Degree
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {personalInfo?.degree}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 250,
                      }}>
                      Field of study
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {personalInfo?.filedOfStudy}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 250,
                      }}>
                      Institutions
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {personalInfo?.institute}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 250,
                      }}>
                      City
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {personalInfo?.city}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 250,
                      }}>
                      State
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {personalInfo?.state}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            {/* Candidate’s  Preference Form */}
            <Card className="p-4 my-4">
              <div>
                <p style={{ color: "#008080", fontSize: 18, fontWeight: 500 }}>
                  My Job Preferences
                </p>
              </div>
              <div>
                <div>
                  <p
                    style={{
                      color: "#65BFBF",
                      fontSize: 18,
                      fontWeight: 500,
                      paddingTop: 8,
                    }}>
                    Academic Qualifications
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What level of academic qualification have you attained?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.academicQualification}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is your specialization?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-5 py-1">
                    <p
                      style={{
                        color: "#475467",
                        fontSize: 18,
                        minWidth: 320,
                      }}>
                      Can you share your academic background and how it aligns
                      with this role?
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {preferenceForm?.academicBackground}
                    </p>
                  </div>
                  {/* <div className="grid grid-flow-row  py-1">
                    <p
                      style={{
                        color: "#101828",
                        fontSize: 18,
                        fontWeight: 600,
                      }}>
                      Do you possess any specific certifications or licenses?
                    </p>
                    <p style={{ color: "#101828", fontSize: 18 }}>
                      {preferenceForm?.specificCertifications}
                    </p>
                  </div> */}
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Professional Experience
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        How many years of experience do you have
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.experiance}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Could you elaborate on your experience in [specific area
                        relevant to the role]
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.specificRole}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Have you previously worked in a specific industry
                        related to this role? If Yes then specify your role
                        there.
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.specificIndustry}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Have you had experience with stakeholders for business
                        goals?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.experienceStakeholders}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is your notice period in the current organization?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.noticePeriod}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Do you have team handling experience? (If yes, please
                        select the team size)
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.teamHandling}
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Please select the industry and specify the industry
                        experience
                      </p>
                      <div>
                        <p style={{ color: "#101828", fontSize: 18 }}>
                          Industry :{" "}
                          {preferenceForm?.industryExperience?.industry}
                        </p>
                        <p style={{ color: "#101828", fontSize: 18 }}>
                          Experience :{" "}
                          {preferenceForm?.industryExperience.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Skills
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    {preferenceForm?.primarySkills?.map((row) => {
                      return (
                        <div className="flex py-1 gap-5">
                          <p
                            style={{
                              color: "#475467",
                              fontSize: 18,
                              width: 320,
                            }}>
                            Primary Skills
                          </p>

                          <div className="pb-3">
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Skill :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.skill}
                              </span>
                            </p>
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Experience :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.experiance}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {preferenceForm?.secondarySkills?.map((row) => {
                      return (
                        <div className="flex gap-5 py-1">
                          <p
                            style={{
                              color: "#475467",
                              fontSize: 18,
                              width: 320,
                            }}>
                            Secondary Skills
                          </p>

                          <div className="pb-3">
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Skill :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.skill}
                              </span>
                            </p>
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Experience :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.experiance}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {preferenceForm?.softwareApplication?.map((row) => {
                      return (
                        <div className="flex gap-5 py-1">
                          <p
                            style={{
                              color: "#475467",
                              fontSize: 18,
                              width: 320,
                            }}>
                            Please add the tools or software application you
                            have used in the past
                          </p>

                          <div className="pb-3">
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Tools :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.tool}
                              </span>
                            </p>
                            <p style={{ color: "#475467", fontSize: 18 }}>
                              Experience :{" "}
                              <span style={{ color: "#101828" }}>
                                {row?.experiance}
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Work Experience
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Which work setting do you prefer in-office?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.workSetting}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is your preference on work shifts?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.workShift}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What are your preferred locations for the job?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.perfferdLocation}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Are you open to relocation if required for the job?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.openToRelocate}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        If your work requires you to travel, how comfortable are
                        you to travel?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.requredToTravel}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is your preferred work schedule?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.workShedule}
                      </p>
                    </div>
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Do you prefer working independently or as part of a
                        small team, or as a part of a large team?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.workTeam}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Compensation and Job Type
                  </p>
                  <div className="grid grid-cols-2 py-5 gap-5">
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What are salary expectations:
                      </p>
                      <div>
                        <p style={{ color: "#475467", fontSize: 18 }}>
                          Type Range:{" "}
                          <span style={{ color: "#101828" }}>
                            {preferenceForm?.salaryExpectations?.range}
                          </span>
                        </p>
                        <p style={{ color: "#475467", fontSize: 18 }}>
                          Payment Frequency:{" "}
                          <span style={{ color: "#101828" }}>
                            {preferenceForm?.salaryExpectations?.payment}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-5  py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is the type of job openings are you interested in ?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.typeOfJobopenings}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Work Environment and Values
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5  py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is appealing to you at work?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.appealingWork}
                      </p>
                    </div>
                    <div className="flex gap-5  py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What kind of work environment are you looking for?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.workEnvironment}
                      </p>
                    </div>
                    <div className="flex gap-5  py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        Is the company outlook on environment important? Like
                        sustainability initiatives, being carbon neutral etc.
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.environmentImportant}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <p
                    style={{ color: "#65BFBF", fontSize: 18, fontWeight: 500 }}>
                    Legal and Visa Status
                  </p>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex gap-5 py-1">
                      <p
                        style={{
                          color: "#475467",
                          fontSize: 18,
                          width: 320,
                        }}>
                        What is your current Visa or Work status?
                      </p>
                      <p style={{ color: "#101828", fontSize: 18 }}>
                        {preferenceForm?.visaStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            {/*  Work Value  */}
            <Card className="p-4 my-4">
              <div>
                <p style={{ color: "#008080", fontSize: 16, fontWeight: 500 }}>
                  Work Values Analysis Result
                </p>
              </div>
              <div className="flex gap-10">
                <div className="py-5">
                  <RadarChart
                    height={350}
                    width={450}
                    outerRadius="80%"
                    data={workValueData}>
                    <PolarGrid />
                    <Tooltip />
                    <PolarAngleAxis dataKey="statement" />
                    <PolarRadiusAxis />
                    <Radar
                      dataKey="rating"
                      stroke="#008080"
                      fill="#ffffff"
                      fillOpacity={0}
                    />
                  </RadarChart>
                </div>
                <Box>
                  <TableContainer sx={{ minWidth: 500 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              bgcolor: "#F8F9FA",
                              color: "#101828",
                              border: 1,
                              borderColor: "#D0D5DD50",
                              width: 250,
                              fontWeight: 500,
                            }}>
                            Work Attribute
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              bgcolor: "#F8F9FA",
                              color: "#101828",
                              border: 1,
                              borderColor: "#D0D5DD50",
                              fontWeight: 500,
                            }}>
                            Ranking of the work attributes
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {workValueData.map((row, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  border: 1,
                                  borderColor: "#D0D5DD50",
                                }}>
                                {row?.statement}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  color: "#008080",
                                  border: 1,
                                  borderColor: "#D0D5DD50",
                                  fontWeight: 500,
                                }}>
                                {row?.rating}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </div>
            </Card>
            {/* ICP Analysis */}
            <Card className="p-4 my-4">
              <div>
                <p style={{ color: "#008080", fontSize: 16, fontWeight: 500 }}>
                  Talent Spectrum Analysis Results Summary
                </p>
              </div>
              <div>
                {/* spectrum analysis */}
                <p
                  style={{
                    color: "#101828",
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 10,
                  }}>
                  Spectrum Analysis
                </p>
                <div className="flex gap-5 py-5">
                  {/* table */}
                  <Table
                    sx={{
                      borderWidth: 1,
                    }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                            minWidth: 600,
                          }}>
                          Talent Dimensions
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Attributes
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: "#475467",
                              fontSize: 14,
                              fontWeight: 500,
                              borderWidth: 1,
                            }}
                            rowSpan={behaviour?.length + 1}>
                            {/* <div
                              className="border rounded-lg p-4 w-full"
                              style={{
                                backgroundColor: "#ffffff",
                                borderColor: "#D0D5DD",
                              }}> */}
                            <div className="flex justify-center">
                              <ColorBodySvg />

                              <div className="grid relative pt-5">
                                {pillars.map((row, index) => {
                                  return (
                                    <div className={`flex mt-10`} key={index}>
                                      {/* <div className="flex text-center p-2"></div> */}
                                      <div className="flex gap-3 items-center">
                                        <p
                                          style={{
                                            color: "#D0D5DD",
                                            fontSize: 32,
                                          }}>
                                          &#x2015;
                                          <span style={{ fontSize: 22 }}>
                                            &#x2022;
                                          </span>
                                        </p>
                                        <p
                                          style={{
                                            color: "#000000",
                                            fontSize: 16,
                                            fontWeight: 500,
                                          }}>
                                          {row}
                                        </p>
                                        {/* <p style={{ color: "#475467", fontSize: 14 }}>
                                {row?.description}
                              </p> */}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            {/* </div> */}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                      <Fragment>
                        {behaviour?.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                color: "#475467",
                                fontSize: 14,
                                fontWeight: 500,
                                borderWidth: 1,
                              }}>
                              {row}
                            </TableCell>
                          </TableRow>
                        ))}
                      </Fragment>
                    </TableBody>
                  </Table>
                </div>
                {/* charts */}
                <p
                  style={{
                    color: "#101828",
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 10,
                  }}>
                  Pie Charts
                </p>
                {/* chart 1 table */}
                <div className="mt-5">
                  <Table
                    sx={{
                      borderWidth: 1,
                    }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Emotional Flexibility
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Labels
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}
                          align="center">
                          Rating out of 5
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Attributes
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: "#475467",
                              fontSize: 14,
                              fontWeight: 500,
                              borderWidth: 1,
                              width: 450,
                            }}
                            rowSpan={5}>
                            <div className="flex justify-end">
                              <PieChart
                                series={convertedEmtional}
                                width={300}
                                height={200}
                                slotProps={{
                                  legend: {
                                    hidden: true,
                                  },
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                      <Fragment>
                        {convertedEmtional?.map((data, index) => {
                          let row = data.data[0];
                          return (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                <div
                                  className="flex"
                                  style={{
                                    borderLeftWidth: 3,
                                    borderLeftColor: row.color,
                                    borderRadius: 3,
                                    paddingLeft: 5,
                                  }}
                                  key={index}>
                                  <div className="col-span-2">
                                    <p
                                      style={{
                                        color: "#475467",
                                        fontSize: 16,
                                      }}>
                                      {row.label}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}
                                align="center">
                                {row.rating}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                {row.attribute}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </Fragment>
                    </TableBody>
                  </Table>
                </div>
                {/* chart 2 table */}
                <div className="mt-5">
                  <Table
                    sx={{
                      borderWidth: 1,
                    }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Cognitive Agility
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Labels
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}
                          align="center">
                          Rating out of 5
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Attributes
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: "#475467",
                              fontSize: 14,
                              fontWeight: 500,
                              borderWidth: 1,
                              width: 450,
                            }}
                            rowSpan={5}>
                            <div className="flex justify-end">
                              <PieChart
                                series={convertCognitive}
                                width={300}
                                height={200}
                                slotProps={{
                                  legend: {
                                    hidden: true,
                                  },
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                      <Fragment>
                        {convertCognitive?.map((data, index) => {
                          let row = data.data[0];
                          return (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                <div
                                  className="flex"
                                  style={{
                                    borderLeftWidth: 3,
                                    borderLeftColor: row.color,
                                    borderRadius: 3,
                                    paddingLeft: 5,
                                  }}
                                  key={index}>
                                  <div className="col-span-2">
                                    <p
                                      style={{
                                        color: "#475467",
                                        fontSize: 16,
                                      }}>
                                      {row.label}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}
                                align="center">
                                {row.rating}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                {row.attribute}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </Fragment>
                    </TableBody>
                  </Table>
                </div>
                {/* chart 3 table */}
                <div className="mt-5">
                  <Table
                    sx={{
                      borderWidth: 1,
                    }}>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Sociability Skills
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Labels
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}
                          align="center">
                          Rating out of 5
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#101828",
                            fontSize: 14,
                            fontWeight: 600,
                            borderWidth: 1,
                            bgcolor: "#F8F9FA",
                          }}>
                          Attributes
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <Fragment>
                        <TableRow>
                          <TableCell
                            sx={{
                              color: "#475467",
                              fontSize: 14,
                              fontWeight: 500,
                              borderWidth: 1,
                              width: 450,
                            }}
                            rowSpan={5}>
                            <div className="flex justify-end">
                              <PieChart
                                series={convertSociability}
                                width={300}
                                height={200}
                                slotProps={{
                                  legend: {
                                    hidden: true,
                                  },
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                      <Fragment>
                        {convertSociability?.map((data, index) => {
                          let row = data.data[0];
                          return (
                            <TableRow key={index}>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                <div
                                  className="flex"
                                  style={{
                                    borderLeftWidth: 3,
                                    borderLeftColor: row.color,
                                    borderRadius: 3,
                                    paddingLeft: 5,
                                  }}
                                  key={index}>
                                  <div className="col-span-2">
                                    <p
                                      style={{
                                        color: "#475467",
                                        fontSize: 16,
                                      }}>
                                      {row.label}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}
                                align="center">
                                {row.rating}
                              </TableCell>
                              <TableCell
                                sx={{
                                  color: "#475467",
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderWidth: 1,
                                }}>
                                {row.attribute}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </Fragment>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
