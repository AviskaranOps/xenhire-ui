import React, { useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import { TopNav } from "../../../widgets/topNav";
import { Footer } from "../../../widgets/footer";

export const TeamEdit = () => {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState();
  const [teamLocation, setTeamLocation] = useState();
  const [crossFunctionality, setCrossFunctionality] = useState();
  const [specifyDomain, setSpecifyDomain] = useState();
  const [id, setId] = useState();

  const [teamWorkingDes, setTeamWorkingDes] = useState("");
  const [describeContributions, setDescribeContributions] = useState("");

  const location = useLocation();

  const options = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  const yes_no = ["Yes", "No"];

  const handleSubmit = async () => {
    const domainRole = specifyDomain;
    const project = teamWorkingDes;
    const contributions = describeContributions;
    const user = JSON.parse(localStorage.getItem("token"));
    const jobId = localStorage.getItem("jobId");
    axios
      .post(
        `http://localhost:8080/xen/saveTeamTemplateForJob?clientId=${user.userId}&jobId=${jobId}`,
        {
          id,
          teamSize,
          teamLocation,
          crossFunctionality,
          domainRole,
          project,
          contributions,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((data) => console.log(data.data))
      .catch((e) => console.log(e));
    navigate("/job/createJob");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (location.state) {
      console.log(location.state);
      if (location.state?.jobData) {
        axios
          .get(
            `http://localhost:8080/xen/getTeamTemplate?clientId=${user.userId}&templateId=${location.state.jobData.jobDetailId}`
          )
          .then(
            (data) => {
              console.log(data);
              setId(data.data.id);
              setTeamSize(data.data.teamSize);
              setTeamLocation(data.data.teamLocation);
              setCrossFunctionality(data.data.crossFunctionality);
              setSpecifyDomain(data.data.domainRole);
              setTeamWorkingDes(data.data.project);
              setDescribeContributions(data.data.contributions);
            },
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          )
          .catch((e) => {
            console.log(e);
          });
      } else {
        setTeamSize(location.state?.teamSize);
        setTeamLocation(location.state?.teamLocation);
        setCrossFunctionality(location.state?.crossFunctionality);
        setSpecifyDomain(location.state?.domainRole);
        setTeamWorkingDes(location.state?.project);
        setDescribeContributions(location.state?.contributions);
      }
    }
  }, [location.state]);

  return (
    <div>
      <div className="flex">
        <ClientSideNav />
        <div className="w-full min-h-screen">
          <TopNav />
          <div className="p-8">
            <div>
              <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                Pre- Fill Job Details: Template 1
              </p>
              <p style={{ color: "#475467", fontSize: 14, fontWeight: 400 }}>
                Please review and edit the information as needed, or use the
                same template.
              </p>
            </div>
            <div className="grid-cols-2 grid gap-8 mt-8">
              <div className="grid grid-flow-row gap-2">
                <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                  What is the size of the team
                </p>
                <Autocomplete
                  size="small"
                  disablePortal
                  options={options.map((option) => option.label)}
                  value={teamSize || null}
                  onChange={(e, newvalue) => setTeamSize(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                />
              </div>
              <div className="grid grid-flow-row gap-2">
                <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                  What is the location of the team where it works from?
                </p>
                <Autocomplete
                  size="small"
                  disablePortal
                  options={options.map((option) => option.label)}
                  value={teamLocation || null}
                  onChange={(e, newvalue) => setTeamLocation(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                />
              </div>
              <div className="grid grid-flow-row gap-2">
                <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                  Does the role have to work cross functionally?
                </p>
                <Autocomplete
                  size="small"
                  disablePortal
                  options={yes_no}
                  value={crossFunctionality || null}
                  onChange={(e, newvalue) => setCrossFunctionality(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                />
              </div>
              <div className="grid grid-flow-row gap-2">
                <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                  If yes, please specify the domain or teams the role will
                  interact with?
                </p>
                <Autocomplete
                  size="small"
                  disablePortal
                  disabled={crossFunctionality !== "Yes"}
                  options={options.map((option) => option.label)}
                  value={specifyDomain || null}
                  onChange={(e, newvalue) => setSpecifyDomain(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select" />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-flow-row gap-2 mt-8">
              <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                What problem/project is the team working on which the candidate
                will be joining?
              </p>
              <textarea
                value={teamWorkingDes}
                onChange={(e) => setTeamWorkingDes(e.target.value)}
                placeholder="type"
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  padding: 5,
                }}
              />
            </div>
            <div className="grid grid-flow-row gap-2 py-5">
              <p style={{ color: "#344054", fontSize: 14, fontWeight: 500 }}>
                Could you describe the contributions of a particularly
                successful team member in a similar role and how they've
                impacted the team's success?
              </p>
              <textarea
                value={describeContributions}
                onChange={(e) => setDescribeContributions(e.target.value)}
                placeholder="type"
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  padding: 5,
                }}
              />
            </div>
            <div className="py-8 gap-8 flex justify-end">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
                style={{ color: "#475467", borderColor: "#D0D5DD" }}>
                back
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                style={{ color: "#ffffff", backgroundColor: "#008080" }}>
                CONFIRM
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
