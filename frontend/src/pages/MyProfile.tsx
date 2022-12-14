import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { isLogin } from "../utils/auth";

const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState<any>({});

  const params = useParams();
  const profileId = params.id;

  useEffect(() => {
    if (!isLogin()) {
      navigate("/");
    }
    profileId ? profileDetails() : fecthData();
  }, []);

  const profileDetails = async () => {
    const response = await axios(
      `http://localhost:5000/api/v1/employee/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setProfile(response.data);
  };

  const fecthData = async () => {
    try {
      const response = await axios("http://localhost:5000/api/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;

      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileDelete = async (id: string) => {
    const removeData = await axios.delete(
      `http://localhost:5000/api/v1/employee/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (removeData.data.message) {
      alert(removeData.data.message);
      navigate("/profiles");
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {profileId ? (
          <Typography variant="h3" sx={{ textAlign: "center", padding: 2 }}>
            Profile Details
          </Typography>
        ) : (
          <Typography variant="h3" sx={{ textAlign: "center", padding: 2 }}>
            My Profile
          </Typography>
        )}
        {profileId ? (
          <div>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white", mr: 2 }}
              onClick={() => navigate(`/addEmployee/${profileId}`)}
            >
              Edit
            </Button>

            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => handleProfileDelete(profileId)}
            >
              Delete
            </Button>
          </div>
        ) : (
          <>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => navigate("/changePassword")}
            >
              Change Password
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => navigate("/profileEdit")}
            >
              Profile Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => navigate(`/claimLeaveRequest/${profile._id}`)}
            >
              Claim Leave Request
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => navigate("/leaveRequestStatus")}
            >
              Leave Request Status
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{ height: "3rem", p: 2, mt: 2, color: "white" }}
              onClick={() => navigate("/payslip")}
            >
              Download Pay Slip
            </Button>
          </>
        )}
      </Box>
      <div>
        <Box>
          <Box sx={{ display: { md: "flex" } }}>
            <Card
              sx={{
                padding: 5,
                margin: 2,
                width: { md: "40rem" },
                boxShadow: "md",
                translate: "translateY(50%)",
                bgcolor: "#526b59",
                color: "white",
              }}
              className="animate__animated animate__fadeInDownBig"
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  pb: 5,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Personal Information
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>Name: {profile?.name}</p>
                  <p>Role: {profile?.role}</p>
                  <p>Email: {profile?.email}</p>
                  <p>Phone: {profile?.phone}</p>
                  <p>Designation: {profile?.designation}</p>
                  <p>Employee Status: {profile?.employeeStatus}</p>
                </div>
                <div>
                  <p>Address: {profile?.address}</p>
                  <p>Salary: {profile?.salary}</p>
                  <p>Joinning Date: {profile?.joingDate}</p>
                  <p>image</p>
                  <img
                    src={`http://localhost:5000${profile?.image}`}
                    alt=""
                    style={{ height: "10rem", width: "10rem" }}
                  />
                </div>
              </Box>
            </Card>
            <Card
              sx={{
                padding: 5,
                margin: 2,
                width: { md: "40rem" },
                boxShadow: "md",
                translate: "translateY(50%)",
                bgcolor: "#bf6c5e",
                color: "#0d0201",
              }}
              className="animate__animated animate__lightSpeedInRight"
            >
              <div>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
                >
                  Project Information
                </Typography>
                <p>Project Name: {profile?.currentProjects?.projectName}</p>
                <p>Resposiblity: {profile?.currentProjects?.responsiblity}</p>
                <p>Staus: {profile?.currentProjects?.status}</p>
              </div>
            </Card>
          </Box>
          <Card
            sx={{
              padding: 5,
              margin: 2,
              width: { md: "40rem" },
              boxShadow: "md",
              translate: "translateY(50%)",
              bgcolor: "#11465c",
              color: "white",
            }}
            className="animate__animated animate__slideInUp"
          >
            <div>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", pb: 5, fontWeight: "bold" }}
              >
                Performance Information
              </Typography>
              <p>Bonus: {profile?.professionalInfo?.bonus}</p>
              <p>Total Leaves: {profile?.professionalInfo?.totalLeave}</p>
            </div>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default MyProfile;
