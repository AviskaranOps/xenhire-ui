import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { Autocomplete, Button, TextField } from "@mui/material";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { SideNav } from "../../../widgets/sidenav";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";
import { qualifications, specializations, team, skills, skillLevel, PreferOffice, workShifts, locations, yes_No, travels, work_Comapny, schedules, appealings, currency, salary_Rate, envonments, job_Interests, experiences, visa_status, certifications, notice, industry, softwares, environments
 } from "../seedData";
import { useEffect } from "react";


export const PreferenceForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeScreen, setActiveScreen] = useState(1);
  const [academicQualification, setAcademicQualification] = useState();
  const [specialization, setSpecialization] = useState();
  const [academicBackGround, setAcademicBackground] = useState();
  const [specificLicense, setSpecificLicense] = useState();
  const [yearsOfExperience, setYearOfExperience] = useState();
  const [experienceRole, setExperienceRole] = useState();
  const [workInIndustry, setWorkInIndustry] = useState();
  const [workRole, setWorkRole] = useState();
  const [experienceStackHolder, setExperienceStachHolder] = useState();
  const [noticePeriod, setNoticePeriod] = useState();
  const [teamHandling, setTeamHandling] = useState();
  const [teamSize, setTeamSize] = useState();
  const [indusrtyExperience, setIndustryExperience] = useState([
    { type: null, experience: null },
  ]);
  const [primarySkills, setPrimarySkill] = useState([
    { skill: null, expertise: null },
  ]);
  const [secoundrySkills, setSecoundrySkill] = useState([
    { skill: null, expertise: null },
  ]);
  const [softwareApplication, setSoftwareApplication] = useState({
    app: null,
    experience: null,
  });

  // form 2
  const [workSetting, setWorkSetting] = useState();
  const [workShift, setWorkShift] = useState();
  const [prefferedLocation, setPrefferedLocation] = useState();
  const [openToRelocate, setOpenToRelocate] = useState();
  const [requiredForTravel, setRequiredForTravel] = useState();
  const [workSchedule, setWorkSchedule] = useState();
  const [workIndepandently, setWorkIndepandently] = useState();
  const [expectedSalary, setexpectedSalary] = useState({
    range: null,
    currency: null,
  });
  const [expectedRange, setExpectedRange] = useState({
    range: null,
    currency: null,
  });
  const [typeOfJobOpening, setTypeOfJobOpening] = useState();
  const [appealingWork, setAppealingWork] = useState();
  const [workEnvironment, setWorkEnvironment] = useState();
  const [companyOutlook, setCompanyOutlook] = useState();
  const [visaStatus, setVisaStatus] = useState();
  const [importantFactor, setImportantFactor] = useState();

  const options = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  const factors = [
    { label: "Money", value : "Money" },
    { label: "Work", value : "Work" },
    { label: "Atonomy", value : "Atonomy" },
  ]

  // industry experiance
  const addIndustryExperience = () => {
    setIndustryExperience([
      ...indusrtyExperience,
      {
        type: null,
        experience: null,
      },
    ]);
  };

  useEffect( () => {
    const user = JSON.parse(localStorage.getItem("token"));
    let preferenceId = 0;
    if(location.state) {
      preferenceId = location.state;
    }
    axiosInstance.get(`/getCandidatePreferences?candidateId=${user.userId}&preferenceId=${location.state}`,

    )
    .then(response => {
      const data = response.data;
      if(response.data){
        setImportantFactor(data.importantFactor);
        setWorkSetting(data.workSetting)
        setWorkShift(data.workShift)
        setPrefferedLocation(data.prefferedLocation)
        setOpenToRelocate(data.openToRelocate)
        setRequiredForTravel(data.requiredForTravel)
        setWorkSchedule(data.workSchedule)
        setWorkIndepandently(data.workIndepandently)
        setexpectedSalary(data.expectedSalary)
        setExpectedRange(data.expectedRange)
        setTypeOfJobOpening(data.typeOfJobOpening)
        setAppealingWork(data.appealingWork)
        setWorkEnvironment(data.workEnvironment)
        setCompanyOutlook(data.companyOutlook)
        setVisaStatus(data.visaStatus)
        setAcademicQualification(data.academicQualification)
        setSpecialization(data.specialization)
        setAcademicBackground(data.academicBackGround)
        setSpecificLicense(data.specificLicense)
        setYearOfExperience(data.yearsOfExperience)
        setExperienceRole(data.experienceRole)
        setWorkInIndustry(data.workInIndustry)
        setWorkRole(data.workRole)
        setExperienceStachHolder(data.experienceStackHolder)
        setNoticePeriod(data.noticePeriod)
        setTeamHandling(data.teamHandling)
        setTeamSize(data.teamSize)
        setIndustryExperience(data.indusrtyExperience)
        setPrimarySkill(data.primarySkills)
        setSecoundrySkill(data.secoundrySkills)
        setSoftwareApplication(data.softwareApplication)
      }
    })
    .catch(error => {
      console.log(error);
    })
}, []);


  const handleChangeIndustryExperience = (e, value, i) => {
    console.log(value, i, e);
    let newFormValues = [...indusrtyExperience];
    newFormValues[i][e] = value;
    setIndustryExperience(newFormValues);
  };

  const removeIndustryExperience = (i) => {
    let newFormValues = [...indusrtyExperience];
    newFormValues.splice(i, 1);
    setIndustryExperience(newFormValues);
  };

  // primary skill
  const addPrimarySkill = () => {
    setPrimarySkill([...primarySkills, { skill: null, expertise: null }]);
  };

  const handleChangePrimarySkill = (e, value, i) => {
    console.log(value);
    let newFormValues = [...primarySkills];
    newFormValues[i][e] = value;
    setPrimarySkill(newFormValues);
  };

  const removePrimarySkill = (i) => {
    let newFormValues = [...primarySkills];
    newFormValues.splice(i, 1);
    setPrimarySkill(newFormValues);
  };

  // secoundry skill
  const addSecoundrySkill = () => {
    setSecoundrySkill([...secoundrySkills, { skill: null, expertise: null }]);
  };

  const handleChangeSecoundrySkill = (e, value, i) => {
    let newFormValues = [...secoundrySkills];
    newFormValues[i][e] = value;
    setSecoundrySkill(newFormValues);
  };

  const removeSecoundrySkill = (i) => {
    let newFormValues = [...secoundrySkills];
    newFormValues.splice(i, 1);
    setSecoundrySkill(newFormValues);
  };

  const onPrefrenceSubmit = async (e) => {
    e.preventDefault();
    console.log(
      academicQualification,
      specialization,
      academicBackGround,
      specificLicense,
      yearsOfExperience,
      experienceRole,
      workInIndustry,
      workRole,
      experienceStackHolder,
      noticePeriod,
      teamHandling,
      teamSize,
      indusrtyExperience,
      primarySkills,
      secoundrySkills,
      softwareApplication,
      "---------form 2"
    );
    setActiveScreen(2);
  };

  const onWorkPrefrenceSumnit = async (e) => {
    e.preventDefault();
    console.log(
      workSetting,
      workShift,
      prefferedLocation,
      openToRelocate,
      requiredForTravel,
      workSchedule,
      workIndepandently,
      expectedSalary,
      expectedRange,
      typeOfJobOpening,
      appealingWork,
      workEnvironment,
      companyOutlook,
      visaStatus,
      academicQualification,
      specialization,
      academicBackGround,
      specificLicense,
      yearsOfExperience,
      experienceRole,
      workInIndustry,
      workRole,
      experienceStackHolder,
      noticePeriod,
      teamHandling,
      teamSize,
      indusrtyExperience,
      primarySkills,
      secoundrySkills,
      softwareApplication,
      "---------form 3"
    );

    // navigate("/valueassessmentform");
    const user = JSON.parse(localStorage.getItem("token"));
    await axiosInstance
      .post(
        "/saveCandidateForm?candidateId="+user.userId,
        {
          workSetting,
          workShift,
          prefferedLocation,
          openToRelocate,
          requiredForTravel,
          workSchedule,
          workIndepandently,
          expectedSalary,
          appealingWork,
          workEnvironment,
          importantFactor
        },
        
      )
      .then((data) => 
        console.log(data),
        navigate("/digitalTalentProfile")
    )
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <div className="flex">
        <SideNav />
        <div className="w-full min-h-screen">
          <TopNav />
            <form className="p-8" onSubmit={onWorkPrefrenceSumnit}>
              <div className="grid grid-flow-row mt-5">
                <p style={{ color: "#101828", fontSize: 22, fontWeight: 600 }}>
                  My Job Preferences
                </p>
                <p
                  style={{
                    color: "#475467",
                    fontSize: 20,
                    fontWeight: 500,
                    marginTop: 10,
                  }}>
                  Work Environment Preference
                </p>
                  <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      Which work setting do you prefer in-office?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={PreferOffice.map((option) => option.label)}
                      value={workSetting || null}
                      onChange={(e, value) => setWorkSetting(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                  </div>
                  <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      What is your preference on work shifts?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={workShifts.map((option) => option.label)}
                      value={workShift || null}
                      onChange={(e, value) => setWorkShift(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                  </div>
                  <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      What is your preferred work schedule?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={schedules.map((option) => option.label)}
                      value={workSchedule || null}
                      onChange={(e, value) => setWorkSchedule(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                  </div>
              </div>
              <div className="mt-8">
                <p
                  style={{
                    color: "#475467",
                    fontSize: 20,
                    fontWeight: 500,
                    marginTop: 10,
                  }}>
                  Location preference
                </p>
                <div className="grid grid-flow-row mt-5">
                  <p
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      fontWeight: 500,
                    }}>
                    Are you open to relocation if required the job?
                  </p>
                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={yes_No.map((option) => option.label)}
                    value={openToRelocate || null}
                    onChange={(e, value) => setOpenToRelocate(value)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" required />
                    )}
                  />
              </div>
              <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      What are your preferred locations for the job?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={locations.map((option) => option.label)}
                      value={prefferedLocation || null}
                      onChange={(e, value) => setPrefferedLocation(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                </div>
                <div className="grid grid-flow-row mt-5">
                  <p
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      fontWeight: 500,
                    }}>
                    If your work requires you to travel, how comfortable are
                    you to travel?
                  </p>
                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={travels.map((option) => option.label)}
                    value={requiredForTravel || null}
                    onChange={(e, value) => setRequiredForTravel(value)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" required />
                    )}
                  />
                </div>
              </div>
              <div className="mt-8">
                <p
                  style={{
                    color: "#475467",
                    fontSize: 20,
                    fontWeight: 500,
                    marginTop: 10,
                  }}>
                  Expectations
                </p>
                <div className="grid grid-flow-row mt-5">
                  <p
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      fontWeight: 500,
                    }}>
                    Do you prefer working independently or as part of a small
                    team, or as a part of a large team?
                  </p>
                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={work_Comapny.map((option) => option.label)}
                    value={workIndepandently || null}
                    onChange={(e, value) => setWorkIndepandently(value)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" required />
                    )}
                  />
                </div>
                <div className="grid grid-flow-row mt-5">
                  <p
                    style={{
                      color: "#344054",
                      fontSize: 14,
                      fontWeight: 500,
                    }}>
                    what is the most important factor that motivates you to change jobs in your current situation?
                  </p>
                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={factors.map((option) => option.label)}
                    value={importantFactor || null}
                    onChange={(e, value) => setImportantFactor(value)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select" required />
                    )}
                  />
                </div>
          <div className="grid grid-flow-row  mt-5">
            <p
              style={{
                color: "#344054",
                fontSize: 14,
                fontWeight: 500,
              }}>
              What are the salary expectations?
            </p>
            <div className="grid grid-cols-3 gap-8">
              <TextField
                required
                type="number"
                fullWidth
                placeholder="Type Range"
                size="small"
                value={expectedSalary.range}
                onChange={(e) =>
                  setexpectedSalary({
                    ...expectedSalary,
                    range: e.target.value,
                  })
                }
              />
              <Autocomplete
                disablePortal
                size="small"
                fullWidth
                options={currency.map((option) => option.label)}
                value={expectedSalary.currency || null}
                onChange={(e, value) =>
                  setexpectedSalary({
                    ...expectedSalary,
                    currency: value,
                  })
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" required />
                )}
              />
            </div>
          </div>
                  <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      What is appealing to you at work?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={appealings.map((option) => option.label)}
                      value={appealingWork || null}
                      onChange={(e, value) => setAppealingWork(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                  </div>
                  <div className="grid grid-flow-row mt-5">
                    <p
                      style={{
                        color: "#344054",
                        fontSize: 14,
                        fontWeight: 500,
                      }}>
                      What kind of work environment are you looking for?
                    </p>
                    <Autocomplete
                      disablePortal
                      size="small"
                      fullWidth
                      options={environments.map((option) => option.label)}
                      value={workEnvironment || null}
                      onChange={(e, value) => setWorkEnvironment(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select" required />
                      )}
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#008080", color: "#ffffff", marginTop:"25px" }}
                    type="submit">
                    Save
                  </Button>
              </div>
            </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
