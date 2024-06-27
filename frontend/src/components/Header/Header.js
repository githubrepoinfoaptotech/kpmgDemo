import React, { useEffect, useState, useReducer, useRef } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  Select,
  TextField,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
  AppBar,
  InputAdornment,
  Dialog,
  DialogTitle,
  Button,
  Typography,
  DialogContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ClickAwayListener,
  Tooltip,
} from "@material-ui/core";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import InfoIcon from "@material-ui/icons/Info";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { Popover } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import useStyles from "../../themes/style.js";
import { yupResolver } from "@hookform/resolvers/yup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardMedia";
import { Menu as MenuIcon } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Notification from "../../components/Notification";
import {
  toggleSidebar,
  useLayoutDispatch,
  useLayoutState,
} from "../../context/LayoutContext";
import Fab from "@mui/material/Fab";
import { signOut, useUserDispatch } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import SearchBar from "../Candidates/Search.js";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PublishIcon from "@material-ui/icons/Publish";
import sample_candidates from "../../images/sample_candidates.xlsx";
//import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import "react-toastify/dist/ReactToastify.css";

export default function Header(props) {
  var classes = useStyles();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  var userDispatch = useUserDispatch();
  var layoutDispatch = useLayoutDispatch();
  var layoutState = useLayoutState();
  var [notificationsPosition] = useState(2);
  var [errorToastId, setErrorToastId] = useState(null);
  var [profileMenu, setProfileMenu] = useState(null);
  var token = localStorage.getItem("token");
  var decode = jwtDecode(token);
  var [WalletValue, setWalletValue] = useState(0);
  var [image, setImage] = useState();
  var [view, setView] = useState("");
  var [profile, setProfile] = useState([]);
  var [file, setFile] = useState([]);

  const history = useHistory();

  var [deleteValue, setDeleteValue] = useState("");
  var [backupView, setBackupView] = useState({
    view: "",
    link: "",
  });

  const [backupOpen, setBackupOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [uploadConfirmOpen, setUploadConfirmOpen] = React.useState(false);
  const [existingOpen, setExistingOpen] = React.useState(false);
  const [existingConfirmOpen, setExistingConfirmOpen] = React.useState(false);
  const [invitationOpen, setInvitationOpen] = React.useState(false);


  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function handleCopy() {
    copyTextToClipboard(
      `${process.env.REACT_APP_SITE}/v1/#/companyRegister`,
    ).then(() => {
      handleNotificationCall("success", "Copied successfully");
    });
  }

  const handleUploadConfirmClose = () => {
    setUploadConfirmOpen(false);
  };

  const handleUploadClose = () => {
    setUploadOpen(false);
  };

  const handleExistingOpen = () => {
    setExistingOpen(true);
  };

  const handleExistingClose = () => {
    setExistingOpen(false);
  };

  // const handleBackupOpen = () => {
  //   setBackupOpen(true);
  // };

  const handleBackupClose = () => {
    setBackupOpen(false);
  };

  const handleconfirmOpen = () => {
    setBackupOpen(false);
    setConfirmOpen(true);
  };

  const handleconfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleExistingConfirmClose = () => {
    setExistingConfirmOpen(false);
  };

  const handleInvitationClose = () => {
    setInvitationOpen(false);
  };

  const handleDeleteOpen = () => {
    setConfirmOpen(false);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const toRef = useRef(null);
  const fromRef = useRef(null);

  const monthDropdown = [
    {
      id: "1",
      Month: "JANUARY",
    },
    {
      id: "2",
      Month: "FEBRUARY",
    },
    {
      id: "3",
      Month: "MARCH",
    },
    {
      id: "4",
      Month: "APRIL",
    },

    {
      id: "5",
      Month: "MAY",
    },
    {
      id: "6",
      Month: "JUNE",
    },
    {
      id: "7",
      Month: "JULY",
    },
    {
      id: "8",
      Month: "AUGUST",
    },

    {
      id: "9",
      Month: "SEPTEMBER",
    },

    {
      id: "10",
      Month: "OCTOBER",
    },

    {
      id: "11",
      Month: "NOVEMBER",
    },

    {
      id: "12",
      Month: "DECEMBER",
    },
  ];

  const [loader, setLoader] = useState(false);

  const [state, setState] = useState({
    right: false,
  });

  const [popperOpen, setPopperOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleFromMonthChange = (e) => {
    const selectedFromMonth = e.target.value;
    const selectedFromMonthIndex = monthDropdown.findIndex(month => month.id === selectedFromMonth);

    if (selectedFromMonthIndex !== -1) {
      const endMonthIndex = (selectedFromMonthIndex + 11) % 12;
      const endMonth = monthDropdown[endMonthIndex].id;

      setMonthValue({
        fromMonth: selectedFromMonth,
        toMonth: endMonth,
      });
    } else {
      console.error('Invalid fromMonth selected:', selectedFromMonth);
    }
  };

  const getFinancialYearLabel = (fromMonth, toMonth) => {
    const fromMonthObject = monthDropdown.find(month => month.id === fromMonth);
    const toMonthObject = monthDropdown.find(month => month.id === toMonth);

    if (fromMonthObject && toMonthObject) {
      return `${fromMonthObject.Month}-${toMonthObject.Month}`;
    } else {
      return 'Invalid month selection';
    }
  };;


  const handlePoperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setPopperOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = popperOpen && Boolean(anchorEl);
  const poperId = canBeOpen ? "spring-popper" : undefined;

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
    financialData();
  };

  const positions = [toast.POSITION.TOP_RIGHT];
  function sendNotification(componentProps, options) {
    return toast(
      <Notification
        {...componentProps}
        className={classes.notificationComponent}
      />,
      options,
    );
  }
  function handleNotificationCall(notificationType, message) {
    var componentProps;

    if (errorToastId && notificationType === "error") return;

    switch (notificationType) {
      case "info":
        componentProps = {
          type: "feedback",
          message: message,
          variant: "contained",
          color: "primary",
        };
        break;
      case "error":
        componentProps = {
          type: "message",
          message: message,
          variant: "contained",
          color: "secondary",
        };
        break;
      default:
        componentProps = {
          type: "shipped",
          message: message,
          variant: "contained",
          color: "success",
        };
    }

    var toastId = sendNotification(componentProps, {
      type: notificationType,
      position: positions[notificationsPosition],
      progressClassName: classes.progress,
      onClose: notificationType === "error" && (() => setErrorToastId(null)),
      className: classes.notification,
    });

    if (notificationType === "error") setErrorToastId(toastId);
  }

  const [Month, setMonthValue] = useState({
    fromMonth: "4",
    toMonth: "3",
  });


  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a Valid Email Address"),
    firstName: Yup.string().max(255).required("First Name is required"),
    lastName: Yup.string().max(255).required("Last Name is required"),
    mobile: Yup.string()
      .required("Mobile is required")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    companyName: Yup.string().max(255).required("Company Name is required"),
  });

  const changeSchema = Yup.object().shape({
    old: Yup.string()
      .required("Old Password is required")
      .min(8, "Old Password must be at least 8 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm: Yup.string()
      .required("Confirm Password is required")
      .min(8, "Confirm Password must be at least 8 characters"),
  });

  const invitationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a Valid Email Address")
      .required("Email is required"),
  });

  const {
    register: changePassword,
    formState: { errors: changeErrors, isSubmitting: changeIsSubmitting },
    handleSubmit: changeSubmit,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(changeSchema),
  });

  const {
    register: invite,
    formState: { errors: inviteErrors, isSubmitting: inviteIsSubmitting },
    handleSubmit: inviteSubmit,
    reset: inviteReset,
  } = useForm({
    resolver: yupResolver(invitationSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit: uploadSubmit } = useForm({
    mode: "onBlur",
  });

  const [values, setValues] = React.useState({
    showOldPassword: false,
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleClickOldPassword = () => {
    setValues({ ...values, showOldPassword: !values.showOldPassword });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.confirm });
  };

  function handleChange(event) {
    setImage(URL.createObjectURL(event.target.files[0]));

    var FormData = require("form-data");
    var data = new FormData();
    data.append("image", event.target.files[0]);

    setLoader(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/setLogo`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        handleNotificationCall("success", response.data.message);
        setImage(response.data.image);
      } else {
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  function handleCompanySettings(values) {

    // if (fromRef.current.value === "" || toRef.current.value === "") {
    //   handleNotificationCall("error", "Both From Month and To Month are required.");
    //   return;
    // }

    const dataToSend = {
      fromMonth: Month.fromMonth,
      toMonth: Month.toMonth,
    };

    return new Promise((resolve, reject) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/editMyCompanySettings`,
        data: dataToSend,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            handleNotificationCall("success", response.data.message);
            forceUpdate();
            setState({ ...state, right: false });
          } else {
            handleNotificationCall("error", response.data.message);
          }
          setLoader(false);
          resolve();
        })
        .catch(function (error) {
          console.error(error);
          handleNotificationCall("error", "An error occurred while updating settings.");
          setLoader(false);
          reject(error);
        });
    });
  }


  function handleBackupOnly(view) {
    setLoader(true);
    setView("Download");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/resumeBackup`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleResumeBackup(view);
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleResumeBackup(view) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/backupData`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          handleArchiveDownload(view);
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleArchiveDownload(view) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/archiveDownload`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then(function (response) {
        if (response.data.status === true) {
          setLoader(false);
          setBackupView({
            ...backupView,
            view: view,
            link: response.data.link,
          });
        } else {
          setLoader(false);

          handleNotificationCall("error", response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleUploadConfirm() {
    if (file && file.name) {
      setUploadConfirmOpen(true);
      handleUploadClose();
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function handleExistingConfirm() {
    if (file && file.name) {
      setExistingConfirmOpen(true);
      handleExistingClose();
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function handleUpload() {
    if (file && file.name) {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("backup", file);

      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/clientRestoreBackup`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          restore(response.data.foldername);
        } else {
          setLoader(false);
          handleNotificationCall("error", response.data.message);
        }
      });
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  function restore(foldername) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/clientrestoreDataBase`,
      data: {
        foldName: foldername,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        setLoader(false);
        handleNotificationCall("success", response.data.message);
        handleUploadConfirmClose();
        window.location.reload();
      } else {
        setLoader(false);
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  function handleExistingUpload() {
    if (file && file.name) {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("backup", file);

      setLoader(true);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/uploadExistingCandidates`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }).then(function (response) {
        if (response.data.status === true) {
          handleNotificationCall("success", response.data.message);
          handleExistingConfirmClose();
          setLoader(false);
        } else {
          setLoader(false);
          handleNotificationCall("error", response.data.message);
        }
      });
    } else {
      handleNotificationCall("error", "No file uploaded");
    }
  }

  const deleteRef = useRef(null);

  function handleBackupDelete() {
    setLoader(true);
    if (deleteRef.current.value === "DELETE") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/inactiveBackup`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            window.location.reload();
            handleDeleteClose();
            handleNotificationCall("success", "Data is deleted permanently");
          } else {
            handleNotificationCall("error", response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setLoader(false);
      handleNotificationCall("error", "Doesn't match");
    }
  }

  useEffect(() => {
    var decode = jwtDecode(token);
    if (decode.role !== "SUPERADMIN") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}auth/getLogo`,
        data: {},
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            setImage(response.data.image);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}recruiter/viewUsers`,
          data: {
            id: decode.user_id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
          .then(function (response) {
            if (response.data.status === true) {
              setProfile(response.data.data);
            }
            setLoader(false);
          })
          .catch(function (error) {
            console.log(error);

            if (
              error?.response?.status === 401 ||
              error?.response?.status === 403
            ) {
              signOut(userDispatch, props.history);
            }
          });
      };

      if (decode.role === "ADMIN") {
        financialData();
      }
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  const financialData = async () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}admin/myCompanySettings`,
      data: {},
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        const toMonthVal = response.data.data.toMonth
        const fromMonthVal = response.data.data.fromMonth
        setMonthValue({
          toMonth: toMonthVal.toString(),
          fromMonth: fromMonthVal.toString(),
        });
      }
    });
  };

  function updateProfile(values) {
    return new Promise((resolve) => {
      setLoader(true);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER}admin/updateProfile`,
        data: {
          id: decode.user_id,
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          mobile: values.mobile,
          email: values.email,
          employeeId: values.employeeId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then(function (response) {
          if (response.data.status === true) {
            localStorage.setItem("firstName", values.firstName);
            localStorage.setItem("email", values.email);
            localStorage.setItem("mobile", values.mobile);
            localStorage.setItem("companyName", values.companyName);

            handleNotificationCall("success", response.data.message);
            forceUpdate();

            setState({ ...state, right: false });
          } else {
            handleNotificationCall("error", response.data.message);
          }
          resolve();
          setLoader(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  async function handleChangePassword(values) {
    if (values.password !== values.confirm) {
      handleNotificationCall("error", "Password is mismatch");
      return
    }
    setLoader(true);
    try {
      var decode = jwtDecode(token);
      var url = decode.role === "SUPERADMIN"
        ? `${process.env.REACT_APP_SERVER}superadmin/changeMyPassword`
        : `${process.env.REACT_APP_SERVER}auth/changeMyPassword`;

      const response = await axios({
        method: "post",
        url: url,
        data: {
          newPassword: values.password,
          oldPassword: values.old,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.data.status === true) {
        handleNotificationCall("success", response.data.message);
        forceUpdate();
        setState({ ...state, right: false });
      } else {
        handleNotificationCall("error", response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }

  function inviteMSME(values) {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}recruiter/inviteMsme`,
      data: {
        email: values.email,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then(function (response) {
      if (response.data.status === true) {
        handleNotificationCall("success", response.data.message);
        inviteReset();
        handleInvitationClose();
      } else {
        handleNotificationCall("error", response.data.message);
      }
    });
  }

  useEffect(() => {
    var decode = jwtDecode(token);

    if (decode.role !== "SUPERADMIN") {
      const fetchData = async () => {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_SERVER}auth/getMyWallet`,
          data: {},
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }).then(function (response) {
          if (response.data.data !== null) {
            setWalletValue(response.data.data?.remainingMessages);
          } else {
            setWalletValue(0);
          }
        });
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue, token]);

  useEffect(() => {
    const changeWallet = () => {
      forceUpdate();
    };

    window.addEventListener("storage", changeWallet);
    return () => {
      window.removeEventListener("storage", changeWallet);
    };
  }, []);

  const list = (anchor) => (
    <Box sx={{ width: "100%" }} role="presentation">
      <List>
        {view === "Settings" ? (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1"> Settings </Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={uploadSubmit(handleCompanySettings)}>
                <CardContent className={classes.root}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className={classes.ProfileLogoContainer}
                      >
                        <Avatar
                          alt="Profile"
                          src={image}
                        // className={classes.avatarButton}
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} lg={4}></Grid>

                    <Grid item xs={12} lg={4}>
                      <FormControl>
                        <div className={classes.root + " " + classes.center}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="icon-button-file"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleChange}
                          />
                          <label htmlFor="icon-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.button}
                              startIcon={<PhotoCamera />}
                              aria-label="upload picture"
                              component="span"
                            >
                              Upload Logo
                            </Button>
                          </label>
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4}></Grid>
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="fromMonth">
                        Financial Year
                      </InputLabel>

                      <FormControl className={classes.margin}>
                        <div className={classes.space}>
                          <Select
                            labelId="fromMonth"
                            name="fromMonth"
                            defaultValue={Month.fromMonth}
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            onChange={handleFromMonthChange}
                            inputRef={fromRef}
                            disableUnderline
                          >
                            {monthDropdown.map((item, index) => {
                              return [
                                <MenuItem value={item.id}>
                                  {item.Month}
                                </MenuItem>,
                              ];
                            })}
                          </Select>

                          <Select
                            labelId="toMonth"
                            name="toMonth"
                            style={{ display: 'none' }}
                            defaultValue={Month.toMonth}
                            onChange={(e) => {
                              setMonthValue({
                                ...Month,
                                toMonth: e.target.value,
                              });
                            }}
                            classes={{
                              root: classes.customSelectField,
                              icon: classes.customSelectIcon,
                            }}
                            inputRef={toRef}
                            disableUnderline
                          >
                            {monthDropdown.map((item, index) => {
                              return [
                                <MenuItem value={item.id}>
                                  {item.Month}
                                </MenuItem>,
                              ];
                            })}
                          </Select>
                        </div>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {getFinancialYearLabel(Month.fromMonth, Month.toMonth)}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.drawerFooter}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={loader}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </CardActions>
              </form>
            </Card>
          </>
        ) : view === "Change" ? (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">
                      Change Password
                    </Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={changeSubmit(handleChangePassword)}>
                <CardContent className={classes.root}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                      <InputLabel shrink htmlFor="old">

                        Old Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={values.showOldPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickOldPassword}
                                >
                                  {values.showOldPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("old")}
                          error={changeErrors.old ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {changeErrors.old?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="password">

                        Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={values.showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("password")}
                          error={changeErrors.password ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {changeErrors.password?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="confirm">

                        Confirm Password
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          classes={{ root: classes.customTextField }}
                          type={
                            values.showConfirmPassword ? "text" : "password"
                          }
                          placeholder="Enter Confirm Password"
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickConfirmPassword}
                                >
                                  {values.showConfirmPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...changePassword("confirm")}
                          error={changeErrors.confirm ? true : false}
                        />

                        <Typography variant="inherit" color="error">

                          {changeErrors.confirm?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.drawerFooter}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={changeIsSubmitting}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </CardActions>
              </form>
            </Card>
          </>
        ) : (
          <>
            <Card className={classes.root}>
              <CardHeader>
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  className={classes.drawerHeader}
                >
                  <Grid item xs={10} md={6}>
                    <Typography variant="subtitle1">Update Profile</Typography>
                  </Grid>

                  <Grid item xs={2} lg={6} className={classes.drawerClose}>
                    <CloseIcon
                      className={classes.closeBtn}
                      size="14px"
                      onClick={toggleDrawer(anchor, false)}
                    />
                  </Grid>
                </Grid>
              </CardHeader>

              <form onSubmit={handleSubmit(updateProfile)}>
                <CardContent>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="firstName">
                        First Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter First Name"
                          id="firstName"
                          name="firstName"
                          defaultValue={profile.recruiter?.firstName}
                          {...register("firstName")}
                          error={errors.firstName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.firstName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="lastName">
                        Last Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Last Name"
                          id="lastName"
                          name="lastName"
                          defaultValue={profile.recruiter?.lastName}
                          {...register("lastName")}
                          error={errors.lastName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.lastName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="email">
                        Email
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Email"
                          id="email"
                          name="email"
                          defaultValue={profile.email}
                          {...register("email")}
                          error={errors.email ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.email?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="mobile">
                        Mobile
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Mobile"
                          id="mobile"
                          name="mobile"
                          defaultValue={profile.recruiter?.mobile}
                          {...register("mobile")}
                          error={errors.mobile ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.mobile?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="companyName">
                        Company Name
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Company Name"
                          id="companyName"
                          name="companyName"
                          defaultValue={profile.recruiter?.companyName}
                          {...register("companyName")}
                          error={errors.companyName ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.companyName?.message}
                        </Typography>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6}>
                      <InputLabel shrink htmlFor="employeeId">
                        Employee ID
                      </InputLabel>
                      <FormControl className={classes.margin}>
                        <TextField
                          InputProps={{ disableUnderline: true }}
                          classes={{ root: classes.customTextField }}
                          size="small"
                          placeholder="Enter Employee ID"
                          id="employeeId"
                          name="employeeId"
                          defaultValue={profile.recruiter?.employeeId}
                          {...register("employeeId")}
                          error={errors.employeeId ? true : false}
                        />

                        <Typography variant="inherit" color="error">
                          {errors.employeeId?.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    spacing={2}
                    className={classes.drawerFooter}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={toggleDrawer(anchor, false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </CardActions>
              </form>
            </Card>
          </>
        )}
      </List>
    </Box>
  );


  return (
    <>
      <AppBar
        position="fixed"
        className={
          layoutState.isSidebarOpened ? classes.appBar1 : classes.appBar
        }
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            onClick={() => toggleSidebar(layoutDispatch)}
            className={classNames(
              classes.headerMenuButtonSandwich,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutState.isSidebarOpened ? (
              // <ArrowBackIcon
              //       classes={{
              //         root: classNames(
              //           classes.headerIcon,
              //           classes.headerIconCollapse,
              //         ),
              //       }}
              //     />

              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            )}
          </IconButton>

          <div
            className={
              layoutState.isSidebarOpened
                ? classes.headerTopOpen
                : classes.headerTop
            }
          >
            <div
              className={
                layoutState.isSidebarOpened
                  ? classes.headerWidth
                  : classes.headerWidth1
              }
            >
              <Typography variant="h5" className={classes.title}>
                <span className="refo-font">refo</span>
              </Typography>
              {/* <div className={classes.lgQuickButton}>
                {decode.role !== "SUPERADMIN" ? (
                  <Tooltip title="Quick Access" placement="bottom">
                    <IconButton>
                      <ArrowLeftIcon
                        id={qaId}
                        onClick={handleQAClick}
                        className={classes.quickAccessArrow}
                      />
                      
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div>

              <div className={classes.smQuickHeaderButton}>
                {decode.role !== "SUPERADMIN" ? (
                  <Tooltip title="Quick Access" placement="bottom">
                    <IconButton>
                      <ArrowLeftIcon
                        id={qaMobileId}
                        onClick={handleQAMobileClick}
                        className={classes.quickAccessArrow}
                      />
                      
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div> */}
              {/* {
                  isScrollOpen ?  */}
            </div>

            <div className={classes.grow}>
              {decode.role !== "SUPERADMIN" ? (
                <div className={classes.SlgButton}>
                  <SearchBar
                    WalletValue={WalletValue}
                    search={props.history?.location?.search}
                  />
                </div>
              ) : (
                ""
              )}

              {/* {decode.role === "ADMIN" ? (
                <Tooltip
                  title="Credit is one candidate added to a job"
                  placement="bottom"
                  PopperProps={{ style: { marginTop: -35 } }}
                >
                  <Badge
                    onClick={(e) => {
                      history.push("/app/plans");
                    }}
                    overlap="circular"
                    max={999999999}
                    badgeContent={
                      WalletValue === 0 ? "0 Credits" : WalletValue + " Credits"
                    }
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    className={classes.wallet}
                    color={WalletValue === 0 ? "primary" : "secondary"}
                  >
                    {WalletValue === 0 ? (
                      <Avatar
                        alt="Profile"
                        src={walletRed}
                        className={classes.walletButton}
                      />
                    ) : (
                      <Avatar
                        alt="Profile"
                        src={walletBlue}
                        className={classes.walletButton}
                      />
                    )}
                  </Badge>
                </Tooltip>
              ) : decode.role === "CLIENTCOORDINATOR" &&
                decode.role === "RECRUITER" ? (
                <Tooltip
                  title="Credit is one candidate added to a job"
                  placement="bottom"
                >
                  <Badge
                    overlap="circular"
                    max={999999999}
                    badgeContent={
                      WalletValue === 0 ? "0 Credits" : WalletValue + " Credits"
                    }
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    className={classes.wallet}
                    color={WalletValue === 0 ? "primary" : "secondary"}
                  >
                    {WalletValue === 0 ? (
                      <Avatar
                        alt="Profile"
                        src={walletRed}
                        className={classes.walletButton}
                      />
                    ) : (
                      <Avatar
                        alt="Profile"
                        src={walletBlue}
                        className={classes.walletButton}
                      />
                    )}
                  </Badge>
                </Tooltip>
              ) : (
                ""
              )} */}

              <ClickAwayListener onClickAway={(e) => setProfileMenu(false)}>
                <div>
                  <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuButton}
                    aria-controls="profile-menu"
                    onClick={(e) => setProfileMenu(e.currentTarget)}
                  >
                    <Avatar
                      alt="Profile"
                      src={image}
                      className={classes.profileButton}
                    />
                  </IconButton>

                  {profileMenu ? (
                    <div className={classes.dropdown}>
                      {decode.role !== "SUPERADMIN" ? (
                        <ListItem className={classes.profileHeader}>
                          <ListItemAvatar>
                            <Avatar
                              alt={
                                profile.recruiter?.firstName +
                                " " +
                                profile.recruiter?.lastName
                              }
                              sizes="medium"
                              src={image}
                              className={classes.chipAvatar}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Typography>
                                  {profile.recruiter?.firstName +
                                    " " +
                                    profile.recruiter?.lastName}
                                </Typography>
                                <Typography>
                                  {profile.roleName === "CLIENTCOORDINATOR" ? "Hiring Manager" : profile.roleName === "SUBVENDOR" ? "Vendor" : profile.roleName}
                                  {profile.recruiter?.companyName && " - " + profile.recruiter?.companyName}
                                </Typography>
                                <Typography> {profile.email} </Typography>
                              </>
                            }
                          />
                          {/* <ListItemSecondaryAction className={classes.closeBtn} onClick={() => signOut(userDispatch, props.history)}>
                  
                 <VscSignOut  className={classes.IconButton} />   
 
                 </ListItemSecondaryAction> */}
                        </ListItem>
                      ) : (
                        <ListItem className={classes.profileHeader}>
                          <ListItemAvatar>
                            <Avatar
                              alt={
                                profile.recruiter?.firstName +
                                " " +
                                profile.recruiter?.lastName
                              }
                              sizes="medium"
                              src={image}
                              className={classes.chipAvatar}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>

                                <Typography> SUPERADMIN </Typography>
                                <Typography>

                                  {localStorage.getItem("email")}
                                </Typography>
                              </>
                            }
                          />
                          {/* <ListItemSecondaryAction  onClick={() => signOut(userDispatch, props.history)}>
                
                 

                <VscSignOut className={classes.IconButton}    />   

                </ListItemSecondaryAction> */}
                        </ListItem>
                      )}

                      {decode.role === "SUPERADMIN" ? (
                        <ListItem
                          className={classes.profileMenuIcon}
                          onClick={(e) => {
                            history.push("/app/ticket");
                          }}
                        >
                          <ContactSupportIcon />
                          Support
                        </ListItem>
                      ) : (
                        ""
                      )}
                      {decode.role === "ADMIN" ? (
                        <div>
                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              setView("Settings");
                              setState({ ...state, right: true });
                            }}
                          >
                            <SettingsIcon /> Settings
                          </ListItem>
                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              history.push("/app/ticket");
                            }}
                          >
                            <ContactSupportIcon />
                            Support
                          </ListItem>

                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              setView("Profile");
                              setState({ ...state, right: true });
                            }}
                          >
                            <PermContactCalendarIcon /> Update Profile
                          </ListItem>

                          {/*   <ListItem   className={classes.profileMenuIcon} 
                  onClick={(e) => {    handleBackupOpen();
                    setBackupView({  
                      ...backupView,
                      view:"",
                      link:""
                     });  
                  }}
                >
                  <CloudDownloadIcon /> Backup & Store
                </ListItem>


               <ListItem   className={classes.profileMenuIcon}   onClick={(e) => {  handleUploadOpen(); setFile([]); }}   >
                  <CloudUploadIcon /> Restore Backup
                </ListItem> */}

                          <ListItem
                            className={classes.profileMenuIcon}
                            onClick={(e) => {
                              handleExistingOpen();
                              setFile([]);
                            }}
                          >
                            <PublishIcon /> Upload Existing Candidates
                          </ListItem>
                        </div>
                      ) : (
                        ""
                      )}

                      <ListItem
                        className={classes.profileMenuIcon}
                        onClick={(e) => {
                          setView("Change");
                          setState({ ...state, right: true });
                        }}
                      >
                        <VpnKeyIcon /> Change Password
                      </ListItem>

                      <ListItem
                        className={classes.profileMenuIcon}
                        onClick={() => signOut(userDispatch, props.history)}
                      >
                        <ExitToAppIcon /> Logout
                      </ListItem>
                    </div>
                  ) : null}
                </div>
              </ClickAwayListener>
            </div>
          </div>
        </Toolbar>

        <SwipeableDrawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
          classes={{
            paper:
              view === "Client" || view === "Candidate"
                ? classes.clientDrawer
                : classes.drawer,
          }}
        >
          {view === "Settings" || view === "Profile" || view === "Change"
            ? list("right")
            : ""}
        </SwipeableDrawer>
      </AppBar>

      {decode.role !== "SUPERADMIN" ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.smQuickButton}>
              <SearchBar
                WalletValue={WalletValue}
                search={props.history.location.search}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        ""
      )}

      {decode.role !== "SUPERADMIN" ? (
        <Box className={classes.lgButton}>
          <Fab
            aria-label="add"
            size="medium"
            component="div"
            variant="circular"
            aria-describedby={poperId}
            onClick={handlePoperClick}
            color="primary"
            sx={{
              borderRadius: 0,
              borderTopLeftRadius: "50%",
              borderBottomLeftRadius: "50%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "4px",
              top: "88%",
              position: "fixed",
              right: 10,
              zIndex: 99999,
            }}
          >
            <InfoIcon />
          </Fab>
        </Box>
      ) : (
        ""
      )}

      <Popover
        aria-describedby={poperId}
        open={popperOpen}
        onClose={() => {
          setPopperOpen(false);
        }}
        anchorEl={anchorEl}
        sx={{ top: "80%" }}
        anchorPosition={{ top: 225, right: 10, left: 0 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box>
          <Card sx={{ maxWidth: 250 }}>
            <CardHeader>
              <Box className={classes.chipMessageBox}>
                <Chip
                  variant="outlined"
                  className={classes.chipMessage}
                  label={
                    <>
                      <Typography>
                        <span className={classes.colorWhite}>
                          {decode.role === "SUPERADMIN"
                            ? "SUPERADMIN"
                            : profile.recruiter?.firstName +
                            " " +
                            profile.recruiter?.lastName}
                        </span>
                      </Typography>
                    </>
                  }
                  avatar={
                    <Avatar
                      alt={
                        profile.recruiter?.firstName +
                        " " +
                        profile.recruiter?.lastName
                      }
                      sizes="medium"
                      src={image}
                      className={classes.chipMessageAvatar}
                    />
                  }
                ></Chip>
              </Box>
            </CardHeader>
            <CardContent>
              <Typography variant="body2" className={classes.chipMessageText}>
                REFO is available in mobile browser use after candidate upload
                is super easy experience!
              </Typography>
              <Typography variant="body2" className={classes.chipMessageText}>
                Do every other task using your mobile browser.
              </Typography>
              <div className={classes.flexCenter}>
                <Button
                  endIcon={<WhatsAppIcon />}
                  variant="contained"
                  size="small"
                  className={classes.whatsappSend}
                  onClick={(e) => {
                    window.open(
                      "https://api.whatsapp.com/send?phone=+91" +
                      localStorage.getItem("mobile") +
                      "&text=REFO is available in mobile browser so after candidate upload is super easy experience! \n Do every other task using your mobile browser. - https://refo.app/",
                    );
                  }}
                >
                  Send to
                </Button>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Popover>

      <Dialog
        onClose={handleBackupClose}
        aria-labelledby="dialog-title"
        open={backupOpen}
        width="md"
        maxWidth="md"
        PaperProps={{
          style: {
            maxWidth: "520px",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >

              Backup and Store
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleBackupClose}
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
          <div className={classes.sendBackUp}>
            <div className={classes.sendBackUpContainer}>
              <Button
                startIcon={
                  <>
                    <SwapVertIcon />
                    <CloudQueueIcon />
                  </>
                }
                variant="contained"
                size="small"
                className={classes.storeLocal}
                onClick={(e) => {
                  handleconfirmOpen();
                  setView("BackUpOnly");
                }}
              >
                Backup the data and store in local system
              </Button>

              <Button
                variant="contained"
                startIcon={
                  <>
                    <SwapVertIcon />
                    <CloudOffIcon />
                  </>
                }
                className={classes.removeCloud}
                size="small"
                onClick={(e) => {
                  handleconfirmOpen();
                  setView("BackUpDelete");
                }}
              >
                Backup the data and remove in REFO Cloud
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleconfirmClose}
        aria-labelledby="dialog-title"
        open={confirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleconfirmClose}
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>
            {view === "BackUpOnly"
              ? "Are you sure want to backup the data and store in local system?"
              : view === "BackUpDelete"
                ? "Are you sure want to backup the data and remove in REFO cloud?"
                : "The data has been loaded. Please click on the download button."}
          </Typography>

          <div className={classes.sendWhatsapp}>
            <>
              {view === "BackUpOnly" ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      handleBackupOnly("Download");
                    }}
                  >

                    Yes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleconfirmClose}
                  >

                    No
                  </Button>
                </>
              ) : view === "BackUpDelete" ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => {
                      handleBackupOnly("Delete");
                    }}
                  >

                    Yes
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleconfirmClose}
                  >

                    No
                  </Button>
                </>
              ) : (
                ""
              )}

              {backupView.view === "Download" ? (
                <>
                  <Grid className={classes.flexCenter}>
                    <a
                      className={classes.a + " " + classes.buttonBtn}
                      href={`${process.env.REACT_APP_URL}` + backupView.link}
                      onClick={(e) => {
                        handleNotificationCall(
                          "success",
                          "Data is downloaded Successfully",
                        );
                      }}
                      download
                    >
                      <CloudDownloadIcon /> Download
                    </a>
                  </Grid>

                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleconfirmClose}
                  >

                    Close
                  </Button>
                </>
              ) : (
                ""
              )}

              {backupView.view === "Delete" ? (
                <>
                  <Grid className={classes.flexCenter}>
                    <a
                      className={classes.a + " " + classes.buttonBtn}
                      href={`${process.env.REACT_APP_URL}` + backupView.link}
                      download
                      onClick={(e) => {
                        handleDeleteOpen();
                      }}
                    >

                      <CloudDownloadIcon /> Download
                    </a>
                  </Grid>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={handleconfirmClose}
                  >

                    Close
                  </Button>
                </>
              ) : (
                ""
              )}
            </>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleDeleteClose}
        aria-labelledby="dialog-title"
        open={deleteOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleDeleteClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>
            Are you sure want to delete the data permanently from REFO cloud.
            Please note that once deleted, the data cannot be restored?
          </Typography>

          <Typography
            variant="body1"
            className={classes.center + " " + classes.colorRed}
          >

            In order to permanently delete the data, please type 'DELETE' in
            capital letter. Then click on "CONFIRM" to proceed.
          </Typography>

          <Grid className={classes.center + " " + classes.ptb025}>
            <TextField
              required
              name="delete"
              placeholder="DELETE"
              InputLabelProps={{ shrink: true }}
              defaultValue={deleteValue}
              onChange={(e) => {
                setDeleteValue(e.target.value);
              }}
              inputRef={deleteRef}
            />
          </Grid>
          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleBackupDelete();
              }}
            >
              Confirm
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleDeleteClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleUploadClose}
        aria-labelledby="dialog-title"
        open={uploadOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleUploadClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Restore the data that was downloaded earlier
          </Typography>

          <div className={classes.root + " " + classes.center}>
            <input
              accept=".zip,.rar,.7zip"
              className={classes.input}
              id="icon-button-zip"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="icon-button-zip">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                aria-label="upload Backup"
                component="span"
              >
                Upload Backup
              </Button>
            </label>
          </div>
          <div className={classes.center + " " + classes.button}>
            <Typography variant="inherit" className={classes.lineBreak}>

              {file?.name}
            </Typography>

            {file?.name ? (
              <Tooltip title="Delete" placement="bottom">
                <DeleteIcon
                  color="secondary"
                  className={classes.closeBtn}
                  onClick={(e) => {
                    setFile([]);
                  }}
                />
              </Tooltip>
            ) : (
              ""
            )}
          </div>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleUploadConfirm();
              }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleUploadClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleUploadConfirmClose}
        aria-labelledby="dialog-title"
        open={uploadConfirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleUploadConfirmClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Are you sure?
          </Typography>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleUpload();
              }}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleUploadConfirmClose}
            >
              No
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleExistingClose}
        aria-labelledby="dialog-title"
        open={existingOpen}
        width="md"
        maxWidth="md"
        PaperProps={{ style: { width: "100%" } }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Upload existing candidates
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleExistingClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid className={classes.center}>
            <a href={sample_candidates} className={classes.aLink} download>

              Sample excel format to upload your data (Only then Vendor /
              Freelancer can check duplicate)
            </a>
          </Grid>

          <Grid className={classes.filterGap + " " + classes.center}>
            <input
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className={classes.input}
              id="icon-button-csv"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <label htmlFor="icon-button-csv">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                aria-label="upload Backup"
                component="span"
              >
                Upload Excel
              </Button>
            </label>
          </Grid>
          <Grid className={classes.center + " " + classes.button}>
            <Typography variant="inherit" className={classes.lineBreak}>

              {file?.name}
            </Typography>
          </Grid>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleExistingConfirm();
              }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleExistingClose}
            >
              Close
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={handleExistingConfirmClose}
        aria-labelledby="dialog-title"
        open={existingConfirmOpen}
        width="md"
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Confirmation
            </Typography>
            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                size="14px"
                onClick={handleExistingConfirmClose}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" className={classes.center}>

            Are you sure?
          </Typography>

          <Grid className={classes.sendWhatsapp}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleExistingUpload();
              }}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={handleExistingConfirmClose}
            >
              No
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog
        aria-labelledby="dialog-title"
        width="md"
        open={invitationOpen}
        onClose={handleInvitationClose}
        PaperProps={{
          style: {
            width: "100%",
          },
        }}
      >
        <DialogTitle className={classes.digTitle}>
          <div className={classes.center}>
            <Typography
              variant="subtitle2"
              className={classes.digColor + " " + classes.digCenter}
            >
              Invite MSME
            </Typography>

            <div className={classes.drawerClose}>
              <CloseIcon
                className={classes.digClose}
                onClick={handleInvitationClose}
                size="14px"
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent className={classes.chatListBackGround}>
          <form onSubmit={inviteSubmit(inviteMSME)}>
            <Grid container direction="row">
              <Grid item xs={12}>
                <InputLabel shrink htmlFor="email">
                  Enter Email
                </InputLabel>
                <FormControl className={classes.margin}>
                  <TextField
                    classes={{ root: classes.customTextField }}
                    InputProps={{ disableUnderline: true }}
                    size="small"
                    placeholder="Enter Email ID"
                    id="email"
                    {...invite("email")}
                    name="email"
                    error={inviteErrors.email ? true : false}
                  />

                  <Typography variant="inherit" color="error">
                    {inviteErrors.email?.message}
                  </Typography>
                </FormControl>
              </Grid>
            </Grid>

            <div className={classes.sendWhatsapp}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={inviteIsSubmitting}
              >
                Invite
              </Button>

              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<FileCopyIcon />}
                onClick={(e) => {
                  handleCopy();
                }}
              >
                Copy URL
              </Button>

              <Button
                variant="contained"
                size="small"
                onClick={handleInvitationClose}
              >
                Close
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
