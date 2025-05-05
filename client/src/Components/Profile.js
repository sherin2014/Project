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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import User from "./User";
import { updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";

const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [email, setemail] = useState(user.email);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  const handleUpdate = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("name", userName);
    formData.append("password", pwd);
    if (profilePic) {
      formData.append("profilePic", profilePic); // ✅ key must match backend
    }
  
    dispatch(updateUserProfile(formData));
    alert("Profile Updated.");
    navigate("/profile");
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={4}>
          <Form onSubmit={handleUpdate}>
            Upload Photo
            <br />
            <input type="file" name="profilePic" onChange={handleFileChange} />
            {profilePic && (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }}
              />
            )}
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name..."
                type="text"
                value={userName}
                {...register("name", {
                  onChange: (e) => {
                    setUserName(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                value={pwd}
                {...register("password", {
                  onChange: (e) => {
                    setPwd(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password..."
                type="password"
                value={confirmPassword}
                {...register("confirmPassword", {
                  onChange: (e) => {
                    setConfirmPassword(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button" type="submit">
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
