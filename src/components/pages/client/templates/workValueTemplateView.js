import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
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
import { workValueViewData } from "../../../dummy/Data";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";

export const WorkValueTemplateView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      console.log(location.state);
      setData(location.state.valuesData);
    }
  }, [location.state]);

  return (
    <div>
      <div className="flex">
        <ClientSideNav openTemplate={true} />
        <div className="w-full min-h-screen">
          <TopNav />
          <div className="p-8">
            <div>
              <p style={{ color: "#101828", fontSize: 22, fontWeight: 700 }}>
                Work Value Template Details: {data.templateName}
              </p>
              <p style={{ color: "#475467", fontSize: 14, fontWeight: 400 }}>
                Below are the result of Template 1
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

                <PolarAngleAxis dataKey="value" />
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
                          }}>
                          Work Attribute
                        </TableCell>
                        <TableCell
                          sx={{
                            bgcolor: "#F8F9FA",
                            color: "#101828",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          Frequency Selected
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          Priority 1
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                            backgroundColor: "#C2E0E8",
                          }}>
                          <div className="grid grid-cols-4 gap-y-2">
                            {data?.map((data) => {
                              return Number(data?.rating) === 4 ? (
                                <p>{data.value}</p>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          Priority 2
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                            backgroundColor: "#F2EFC9",
                          }}>
                          <div className="grid grid-cols-4 gap-y-2">
                            {data?.map((data) => {
                              return Number(data?.rating) === 3 ? (
                                <p>{data.value}</p>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          Priority 3
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                            backgroundColor: "#D1E6D5",
                          }}>
                          <div className="grid grid-cols-4 gap-y-2">
                            {data?.map((data) => {
                              return Number(data?.rating) === 2 ? (
                                <p>{data.value}</p>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          Priority 4
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                            backgroundColor: "#ECCCB7",
                          }}>
                          <div className="grid grid-cols-4 gap-y-2">
                            {data?.map((data) => {
                              return Number(data?.rating) === 1 ? (
                                <p>{data.value}</p>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                          }}>
                          No Priority
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#171717",
                            border: 1,
                            borderColor: "#D0D5DD50",
                            backgroundColor: "#EDDAD3",
                          }}>
                          <div className="grid grid-cols-4 gap-y-2">
                            {data?.map((data) => {
                              return Number(data?.rating) === 0 ? (
                                <p>{data.value}</p>
                              ) : null;
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
