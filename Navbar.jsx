import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container, NavDropdown, Form, Row, Col } from "react-bootstrap";
import "../App.css";
import "../Styles/Navbar.css";
import Search from "./NavbarCompo/Search";
import Sidebar from "./Sidebar";
// import laptopImg from "../Images/enterpriselaptop.png"
import Modal from "react-bootstrap/Modal";
import silverLaptop from "../Images/silverlaptop.png";
import news6 from "../Images/news6.png";
// import { Link } from "react-router-dom";
import informatica from '../Images/informatica-Logo.jpg'
import { API_ROOT, webPath } from "../apiConfig";
import EnterpriseLogo from "../Images/enterpriseLogo.webp";
import { Subscribe } from "./subscribe";


const CustomNavbar = () => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const showDropdown = () => {
    setOpen(!open); // Toggle the dropdown
  };

  const closeDropdown = () => setOpen(false); // Close dropdown when clicked outside

  // Detect click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const [nav, setNav] = useState(false);
  const [showContentHub, setShowContentHub] = useState(false);

  const toggleContentHub = () => {
    setShowContentHub((prev) => !prev);
  };

  const showDropdownNav = (e) => {
    setNav(!nav);
  };
  const hideDropdownNav = (e) => {
    setNav(false);
  };

  //krishna
  const closeContentHub = () => setShowContentHub(false); // Close dropdown when clicked outside
  const dropContentHub = useRef(null);
  // Detect click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropContentHub.current &&
        !dropContentHub.current.contains(event.target)
      ) {
        closeContentHub();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropContentHub]);

  //krishna
  const closeFeature = () => setNav(false); // Close dropdown when clicked outside
  const dropFeature = useRef(null);
  // Detect click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropFeature.current && !dropFeature.current.contains(event.target)) {
        closeFeature();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropFeature]);

  const [feat, setFeat] = useState(false);
  const showFeatdownNav = (e) => {
    setFeat(!feat);
  };
  // const hideFeatdownNav = (e) => {
  //   setFeat(false);
  // };

  const closeLeader = () => setFeat(false); // Close dropdown when clicked outside
  const dropLeader = useRef(null);
  // Detect click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropLeader.current && !dropLeader.current.contains(event.target)) {
        closeLeader();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropLeader]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [newsPosts, setNewsPosts] = useState([]);
  const [ArticlePosts, setArticlePosts] = useState([]);
  const [quickBytePosts, setQuickBytePosts] = useState([]);

  const [newsPod, setNewsPod] = useState([]);
  const [interPosts, setInterPosts] = useState([]);
  const [guestPosts, setGuestPosts] = useState([]);

  const [feartureArticlePost, setfeartureArticlePost] = useState([]);
  const [feartureReadyPosts, setfeartureReadyPosts] = useState([]);
  const [feartureLearningPosts, setfeartureLearningPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/post/latestPost`);
        const data = await response.json();
        setNewsPosts(data.newsData);
        setArticlePosts(data.articleData);
        setQuickBytePosts(data.quickByteData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/post/leadership`);
        const data = await response.json();
        setNewsPod(data.podcastData);
        setInterPosts(data.inteviewData);
        setGuestPosts(data.guestPostData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ROOT}/api/post/featured`);
        const data = await response.json();
        console.log("data :", data);
        setfeartureArticlePost(data.articleData);
        setfeartureReadyPosts(data.futureReadyData);
        setfeartureLearningPosts(data.learningData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [policyText, setPolicyText] = useState(
    "*By clicking on the Submit button, you are agreeing with the Privacy Policy with Enterprise Talks.",
  );

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail();
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const resetForm = () => {
    setEmail("");
    setIsValidEmail(true);
    setPolicyText(
      "*By clicking on the Submit button, you are agreeing with the Privacy Policy with Enterprise Talks.",
    );
  };

  const handleSubmit = async () => {
    if (validateEmail()) {
      try {
        const response = await fetch(`${API_ROOT}/api/subscribe/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          // The request was successful, you can handle the response here
          console.log("Subscription successful");
          resetForm(); // Reset the form after successful submission
          setPolicyText("Thank you for subscribing ✅");

          // Reset the complete form after 5 seconds
          setTimeout(() => {
            resetForm();
          }, 5000);
        } else {
          // The request failed, handle the error
          console.error("Subscription failed");

          // Check if the user already exists (assuming a specific response status code)

          if (response.status === 404) {
            // User already exists, show a message
            setPolicyText("This email is already subscribed ❌");
          }
        }
      } catch (error) {
        console.error("Error sending subscription request:", error);
      }
    } else {
      console.log("Invalid email");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div
          style={{ backgroundColor: "#fff", height: "83px" }}
          className="fixed-top"
        >
          <Navbar
            collapseOnSelect
            bg="white"
            expand="md"
            className="NavMArLR container container-max justify-content-between"
            style={{ padding: "0px 8px" }}
          >
            <div className="marginNav d-flex">
              {/* <Navbar.Toggle aria-controls="responsive-navbar-na" /> */}
              <Sidebar />
              &nbsp; &nbsp;
              <Navbar.Brand className="logoImp">
                <a href="/">
                  <img
                    className="MainLogo"
                    style={{ width: "70%", height: "auto" }}
                    // src="https://enterprisetalk.com/wp-content/uploads/2022/10/Asset-5-300x61.png.webp"
                    src={EnterpriseLogo}
                    alt="Logo"
                    width="640"
                    height="360"
                  />
                </a>
              </Navbar.Brand>
            </div>

            <div className="d-flex  gap-3">
              <div className="DesktopResponsive">
                <Search />
              </div>

              <Nav.Link className="pl-4 mt-0  DesktopResponsive">
                {/* <button className="btn-sm" onClick={handleShow}> */}

                <button
                  className="btn-sm"
                  onClick={handleShow}
                  // onClick={() =>
                  //   (window.location.href =
                  //     "https://resources.enterprisetalk.com/ebook/ET-Subscribe-Landing.html")
                  // }
                >
                  Subscribe
                </button>
              </Nav.Link>
            </div>
          </Navbar>
        </div>
      </div>

      <div
        style={{ backgroundColor: "#eeeded", marginTop: "82px" }}
        className="gryBoxRepo fixedNav"
      >
        <Navbar className="DesktopResponsive container-fluid container-max">
          <Navbar className="w-100">
            {/* <Sidebar /> */}
            <Container>
              <Nav className="w-100 text-center d-flex justify-content-center gap-5 spaceNav">
                <NavDropdown
                  ref={dropdownRef}
                  show={open}
                  onClick={showDropdown} // Trigger dropdown on click
                  title="Latest"
                  id="basic-nav-dropdown key1"
                  className="custom-dropdown hover-underline-animation hoverHead fw-bold"
                >
                  {open && (
                    <div className="dropdown-center-wrapper">

                    <div className="dropdownLeader1">
                      <div className="d-flex justify-content-evenly">
                        <div className="borderR" style={{ width: "100%" }}>
                          <p className="fw-bold text-center mt-2">News</p>

                          {newsPosts.map((post, index) => (
                            <NavDropdown.Item
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB"
                              key={index}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  gap: "20px",
                                  // borderBottom: "1px solid #bdbdbd",
                                }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "84px",
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                <div
                                  style={{ width: "105%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {" "}
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive ">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}

                          <a
                            href="/topics/news"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>

                        <div style={{ width: "100%" }}>
                          <p className="fw-bold text-center mt-2">
                            Quick Bytes
                          </p>
                          {quickBytePosts.map((post, index) => (
                            <NavDropdown.Item
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB"
                              key={index}
                            >
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  gap: "20px",
                                  // borderBottom: "1px solid #bdbdbd",
                                }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "84px",
                                      //  objectFit: "contain",
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                <div
                                  style={{ width: "105%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {" "}
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive ">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}

                          <a
                            href="/topics/quick-bytes"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </NavDropdown>

                <NavDropdown
                  show={feat}
                  onClick={showFeatdownNav}
                  ref={dropLeader}
                  title="Leadership"
                  id="basic-nav-dropdown key2"
                  className="custom-dropdown hover-underline-animation hoverHead fw-bold"
                >
                  {feat && (
                    <div className="dropdown-center-wrapper">

                    <div className="dropdownLeader2">
                      <div className="d-flex justify-content-evenly">
                        <div className="borderR" style={{ flex: 1 }}>
                          <p className="fw-bold text-center mt-2">Podcasts</p>
                          {newsPod.map((post, index) => (
                            <NavDropdown.Item
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB leadership-item"
                            >
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "85px",
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                <div
                                  style={{ width: "100%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginBottom: "5px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}

                          <a
                            href="/topics/podcasts"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>

                        <div className="borderR" style={{ flex: 1 }}>
                          <p className="fw-bold text-center mt-2">
                            Featured Interview
                          </p>
                          {interPosts.map((post, index) => (
                            <NavDropdown.Item
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB leadership-item"
                            >
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "85px",
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                <div
                                  style={{ width: "100%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginBottom: "5px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}

                          <a
                            href="/topics/interview"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>

                        <div className="borderR" style={{ flex: 1 }}>
                          <p className="fw-bold text-center mt-2">
                            Guest Posts
                          </p>
                          {guestPosts.map((post, index) => (
                            <NavDropdown.Item
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB leadership-item"
                            >
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "85px",
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                <div
                                  style={{ width: "100%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginBottom: "5px",
                                      marginTop: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}

                          <a
                            href="/topics/guest-author"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </NavDropdown>


                <NavDropdown
                  show={nav}
                  onClick={showDropdownNav}
                  ref={dropFeature}
                  title="Features"
                  id="basic-nav-dropdown-key3"
                  className="custom-dropdown hover-underline-animation hoverHead fw-bold"
                >
                  {nav && (
                    <div className="dropdown-center-wrapper">

                    <div className="dropdownLeader3">
                      {/* Ensure this d-flex matches dropdownLeader1 structure */}
                      <div
                        className="d-flex justify-content-evenly"
                        style={{ width: "100%" }}
                      >
                        {/* Left Column: Articles */}
                        <div className="borderR" style={{ width: "100%" }}>
                          <p className="fw-bold text-center mt-2">Articles</p>
                          {feartureArticlePost.map((post, index) => (
                            <NavDropdown.Item
                              key={index}
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB"
                            >
                              <div
                                className="d-flex"
                                style={{ width: "100%", gap: "20px" }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "84px", // Matches Latest
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                {/* Adjusted width to 105% to match Latest dropdown */}
                                <div
                                  style={{ width: "105%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}
                          <a
                            href="/topics/featured"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>

                        {/* Right Column: Learning Center */}
                        <div style={{ width: "100%" }}>
                          <p className="fw-bold text-center mt-2">
                            Learning Center
                          </p>
                          {feartureLearningPosts.map((post, index) => (
                            <NavDropdown.Item
                              key={index}
                              href={`/${post.cat_slug}/${post.post_name}`}
                              className="text-black borderB"
                            >
                              <div
                                className="d-flex"
                                style={{ width: "100%", gap: "20px" }}
                              >
                                <div
                                  style={{ width: "50%" }}
                                  className="imgMob"
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      borderRadius: "10px",
                                      height: "84px", // Matches Latest
                                      objectFit: "cover",
                                    }}
                                    src={`${webPath}${post.banner_img}`}
                                    alt={post.post_title}
                                  />
                                </div>

                                {/* Adjusted width to 105% to match Latest dropdown */}
                                <div
                                  style={{ width: "105%" }}
                                  className="paraMob"
                                >
                                  <h5
                                    className="fw-bold line-clamp"
                                    style={{
                                      fontSize: "15px",
                                      marginTop: "5px",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    <a
                                      className="text-black hoverHead"
                                      href={`/${post.cat_slug}/${post.post_name}`}
                                    >
                                      {post.post_title}
                                    </a>
                                  </h5>
                                  <div className="DesktopResponsive">
                                    <p style={{ fontSize: "12px" }}>
                                      By{" "}
                                      <span className="fw-bold">
                                        {post.post_author}
                                      </span>{" "}
                                      |{" "}
                                      {new Date(
                                        post.post_updated_date ||
                                          post.post_date,
                                      ).toLocaleDateString(undefined, options)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </NavDropdown.Item>
                          ))}
                          <a
                            href="/topics/learning-center"
                            className="text-black ended mx-4"
                          >
                            See more
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  )}
                </NavDropdown>
                <Nav.Link
                  href="https://resources.enterprisetalk.com/"
                  className="text-black fw-bold hover-underline-animation hoverHead"
                >
                  Resources
                </Nav.Link>

                {/*New  Krishna */}
                <NavDropdown
                  ref={dropContentHub}
                  show={showContentHub}
                  onClick={toggleContentHub}
                  title="Content Hub"
                  id="basic-nav-dropdown key3"
                  className="custom-dropdown fw-bold"
                >
                  {showContentHub && (
                    <div className="dropdownLeader5">
                      <div
                        className="d-flex justify-content-evenly"
                        style={{ width: "100%" }}
                      >
                        <div style={{ width: "100%" }}>
                          <NavDropdown.Item
                            href="https://informatica.enterprisetalk.com/"
                            target="_blank"
                            // rel="noopener noreferrer"
                            className="text-black no-hover"
                          >
                            <div
                              className="d-flex"
                              style={{ width: "100%", gap: "10px" }}
                            >
                              {/* Text Container */}
                              <div style={{ width: "50%" }} className="paraMob">
                                <h5
                                  className="fw-bold line-clamp"
                                  style={{
                                    fontSize: "15px",
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                  }}
                                >
                                  <div
                                    style={{
                                      marginBottom: "5px",
                                    }}
                                    className="text-black  text-center"
                                  >
                                    Informatica
                                  </div>
                                </h5>
                                {/* Optional paragraph, if needed */}
                                {/* <p style={{ fontSize: "12px" }}>Visit Informatica's content hub</p> */}
                              </div>
                            </div>
                          </NavDropdown.Item>
                        </div>
                      </div>
                    </div>
                  )}
                </NavDropdown>

                {/* Krishna */}

                <Nav.Link
                  href="/event"
                  className="text-black fw-bold hover-underline-animation hoverHead"
                >
                  Events
                </Nav.Link>

                <Nav.Link
                  href="/contact-us"
                  className="text-black fw-bold hover-underline-animation hoverHead"
                >
                  Connect
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Navbar>
      </div>

      {/* Subscribe modal */}
      <Subscribe show={show} handleClose={handleClose} />
    </>
  );
};

export default CustomNavbar;
