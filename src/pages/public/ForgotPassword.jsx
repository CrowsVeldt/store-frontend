import { Box, Button, CircularProgress, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";
import PasswordInput from "../../components/inputs/PasswordInput";

export default function ForgotPassword() {
  const [data, setData] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const emailToken = location.search.split("=")[1];

  const isUserValid = async () => {
    try {
      const { data } = await axios.get(`/mailer/forgot-password/${id}`, {
        headers: {
          email_verify_token: emailToken,
        },
      });

      if (data.status === 201) {
        console.log("User Valid");
      } else {
        navigate("/");
        toast.error("Invalid link");
      }
    } catch (error) {
      navigate("/");
      toast.error("Invalid link");
    }
  };

  const setPasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const setRepeatPasswordValue = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password === "" || repeatPassword === "") {
      toast.error("Password is required");
    } else if (password.length < 2) {
      toast.error("Password must be more than 2 characters");
    } else {
      const { data } = await axios.post(`/mailer/update-password/${id}`, {
        user_password: password,
        email_verify_token: emailToken,
      });

      if (data.status === 201) {
        toast.success("Password changed successfully");
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    isUserValid();
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Box minH="65vh" maxW="600px" mx="auto" py={10} px={4}>
        <Heading as="h5" size="xl" mb={6}>
          Enter Your NEW Password
        </Heading>
        {message ? (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Password Successfully Updated
          </p>
        ) : null}
        {data ? (
          <Box onSubmit={updatePassword}>
            <PasswordInput
              id="password-reset-input"
              placeholder="Password"
              name="password"
              value={password}
              state={setPasswordValue}
            />
            <PasswordInput
              id="repeat-password-reset-input"
              placeholder="Repeat password"
              name="password-repeat"
              value={repeatPassword}
              state={setRepeatPasswordValue}
            />
            <Button type="submit" onClick={updatePassword} colorScheme="teal">
              Reset
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            Loading... &nbsp;
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
}
