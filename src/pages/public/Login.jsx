import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link as Chlink,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import DemoUserDropdown from "../../components/users/DemoUserDropdown";

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    user_email: "",
    user_password: "",
  });

  const setDemoUser = (type) => {
    if (type === 0) {
      setValues((prevValues) => ({
        ...prevValues,
        user_email: "demo-user@email.com",
        user_password: "asdfgh123",
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        user_email: "demo-admin@email.com",
        user_password: "asdfgh123",
      }));
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  const from = location.state?.from?.pathname || "/";

  const togglePassword = () => setShow(!show);

  useEffect(() => {
    const to = from.includes("admin") ? "/" : from;

    if (user) {
      return navigate(to, { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user_email, user_password } = values;

      const response = await axios.post(
        "/users/customers/login",
        {
          user_email,
          user_password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(
        `${response?.data?.user?.user_name} logged in successfully`
      );
      setUser({
        user: response?.data.user,
        accessToken: response?.data.customerToken,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      minH="65vh"
      maxW="600px"
      mx="auto"
      py={10}
      px={4}
    >
      <Box display={"flex"}>
        <Heading as="h1" size="xl" mb={5}>
          Login
        </Heading>
        <DemoUserDropdown action={setDemoUser} />
      </Box>
      <FormControl isRequired mb={4}>
        <FormLabel>Email Address</FormLabel>
        <Input
          name="user_email"
          type="email"
          placeholder="Type in your Email"
          value={values.user_email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired mb={4}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            name="user_password"
            type={show ? "text" : "password"}
            placeholder="Type in you password"
            value={values.user_password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={togglePassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Flex>
        <Button type="submit" colorScheme="teal" size="lg" mb={4}>
          Login
        </Button>
        <Flex flexDirection={"column"}>
          <Chlink as={Link} to={"/register"}>
            Don't have an account? Register here!
          </Chlink>
          <Chlink as={Link} to={"/password-reset"}>
            Reset password
          </Chlink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
