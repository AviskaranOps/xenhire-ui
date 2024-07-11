import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ClientSideNav } from "../../../widgets/clientSideNav";
import { Footer } from "../../../widgets/footer";
import { TopNav } from "../../../widgets/topNav";
import { workValueEditData } from "../../../dummy/Data";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Spinner from "../../../utils/spinner";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";


export const ValuesEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [ratingList, setRatingList] = useState(workValueEditData);
  const [value, setValue] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleChangeRating = (value, i) => {
    let newFormValues = [...ratingList];
    newFormValues[i].rating = value;
    setRatingList(newFormValues);
  };

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    const jobId = localStorage.getItem("jobId");
    axiosInstance
      .post(
        `https://localhost:8080/saveValueTemplateForJob?clientId=${user.userId}&jobId=${jobId}`,
        ratingList,
        
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/job/createJob");
  };

  useEffect(() => {
    console.log(location.state);
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("token"));
          console.log(location.state);
          axiosInstance
            .get(
              `/getValueTemplate?clientId=${user.userId}&templateId=${location.state.jobData.workValuesId}`,
            )
            .then((data) => {
              console.log(data);
              setData(data?.data);
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
  }, [location.state]);

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
          <div className="p-8">
            <div>
              <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                Work Value Analysis
              </p>
              <p style={{ color: "#475467", fontSize: 14, fontWeight: 400 }}>
                Please review and edit the information as needed, or use the
                same template
              </p>
            </div>
            <p style={{ color: "#475467", fontSize: 14 }}>
              A spider chart visualising your scores across different work
              attributes.
            </p>
            <div className="py-5">
              <RadarChart
                height={350}
                width={450}
                outerRadius="80%"
                data={data}>
                <PolarGrid />
                <Tooltip />

                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  dataKey="rating"
                  stroke="#008080"
                  fill="#ffffff"
                  fillOpacity={0}
                />
              </RadarChart>
            </div>
            <div>
              <Box sx={{ width: "50%", marginTop: 4 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                          }}>
                          Work Attribute
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                          }}>
                          Ratings
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                color: "#475467",
                              }}>
                              {row.value}
                            </TableCell>
                            <TableCell
                              sx={{
                                color: "#475467",
                              }}>
                                {/* <Rating
                                  name={`rating-${index}`}
                                  value={row?.rating}
                                  max={4}
                                  sx={{ color: "#66B2B2" }}
                                ></Rating> */}
                              {row.rating}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              {/* <div className="flex justify-end py-8 gap-8">
                <Button
                  variant="outlined"
                  style={{
                    color: "#475467",
                    borderColor: "#D0D5DD",
                  }}
                  onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#008080", color: "#ffffff" }}>
                  CONFIRM
                </Button>
              </div> */}
            </div>
          </div>
          )}
      </div>
    </div>
    <Footer />
  </div>
  );
};
