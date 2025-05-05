import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "../Features/UserSlice";
import { userSchemaValidation } from "../Validations/UserValidations";
import User from "./User";

const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ⚠️ Important: Reset form fields when user data is available
  useEffect(() => {
    if (user?.email) {
      reset({
        name: user.name || "",
        password: user.password || "",
        confirmPassword: user.password || "",
      });
    } else {
      navigate("/login");
    }
  }, [user, reset, navigate]);

  const handleUpdate = (data) => {
    const userData = {
      email: user.email,
      name: data.name,
      password: data.password,
      profilePic: profilePic, // Can be null if not changed
    };

    console.log("Submitting:", userData);
    dispatch(updateUserProfile(userData)).then((res) => {
      alert("Profile Updated.");
      navigate("/profile");
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected");
    } else {
      setProfilePic(file);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={4}>
          <Form onSubmit={handleSubmit(handleUpdate)}>
            <div>Upload Photo</div>
            <input type="file" name="profilePic" onChange={handleFileChange} />

            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </FormGroup>

            <FormGroup>
              <Button color="primary" type="submit">
                Update Profile
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
