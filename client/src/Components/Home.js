import { Col, Row } from "reactstrap";
import User from "./User";
import SharePosts from "./SharePost";
import Posts from "./Posts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
	const email = useSelector((state) => state.users.user.email);
 const navigate = useNavigate();
	useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={9}>
          <SharePosts />
        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <Posts />
        </Col>
      </Row>
    </>
  );
};
export default Home;
