// import { makeStyles } from "@material-ui/styles";

// export default makeStyles(theme => ({
//   root: {
    
//     fontFamily: '"Roboto", sans-serif',
//   },
//   drawer: {
//     width: "40%",
//     padding: "10px",
//     [theme.breakpoints.down('md')]: {
//       width: "80%",
//     },
//   },
//   container: {
//     height: "100vh",
//     width: "100vw",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     position: "absolute",
//     top: 0,
//     left: 0,
//   },
//   logotypeContainer: {
//     backgroundColor: theme.palette.primary.main,
//     width: "40%",
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//    justifyContent: "center",
//     alignItems: "center",
//     [theme.breakpoints.down("md")]: {
//       width: "50%",
//     },
//     [theme.breakpoints.down("md")]: {
//       display: "none",
//     },
//   },

  
//   leftContainer: {
//     backgroundColor: "#1a1b1f",
//     width: "35%",
//     height: "100%",
//     display: "flex",
//     padding: "3rem 3rem",
//     flexDirection: "column",
//     color:"white",
//     alignItems: "baseline",
//     [theme.breakpoints.down("md")]: {
//       width: "50%",
//     },
    
//   },

//   logotypeImage: {
//     width: 165,
//     marginBottom: theme.spacing(4),
//   },
//   logotypeText: {
//     color: "white",
//     fontWeight: 500,
//     fontSize: 84,
//     [theme.breakpoints.down("md")]: {
//       fontSize: 48,
//     },
//   },
//   formContainer: {
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     margin: "auto",
//     padding: "0%",
  
//   },
//   form:{
//     padding: '10%'
//   },
//   title:{
//     fontSize: 24,
//     fontWeight: 600,
//     color: "#064be2",
//     marginBottom: 5,
    
//   },
//   subtitle:{
//     marginBottom: 42,
//     fontSize: "17px",
//     fontWeight: 300,
//   },
  
//   h1:{
//     fontSize: 22,
//     width : '83%', 
//      fontWeight: 600, 
//       marginBottom:'10px',
//       lineHeight: 1.5,
//   },
//   body:{
//     fontSize: 16,
//     width: '87%',
//     lineHeight: '29px',
//     fontWeight: 300,
//     marginBottom:'20px',
//   },
//   tab: {
//     fontWeight: 400,
//     fontSize: 18,
//   },
//   greeting: {
//     fontWeight: 500,
//     textAlign: "center",
//     marginTop: theme.spacing(4),
//   },
//   subGreeting: {
//     fontWeight: 500,
//     textAlign: "center",
//     marginTop: theme.spacing(2),
//   },
//   googleButton: {
//     marginTop: theme.spacing(6),
//     boxShadow: theme.customShadows.widget,
//     backgroundColor: "white",
//     width: "100%",
//     textTransform: "none",
//   },
//   googleButtonCreating: {
//     marginTop: 0,
//   },
//   googleIcon: {
//     width: 30,
//     marginRight: theme.spacing(2),
//   },
//   creatingButtonContainer: {
//     marginTop: theme.spacing(2.5),
//     height: 46,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   createAccountButton: {
//     height: 46,
//     textTransform: "none",
//   },
//   formDividerContainer: {
//     marginTop: theme.spacing(4),
//     marginBottom: theme.spacing(4),
//     display: "flex",
//     alignItems: "center",
//   },
//   formDividerWord: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//   },
//   formDivider: {
//     flexGrow: 1,
//     height: 1,
//     backgroundColor: theme.palette.text.hint + "40",
//   },
//   errorMessage: {
//     textAlign: "center",
//   },
//   textFieldUnderline: {
//     "&:before": {
//       borderBottomColor: theme.palette.primary.light,
//     },
//     "&:after": {
//       borderBottomColor: theme.palette.primary.main,
//     },
//     "&:hover:before": {
//       borderBottomColor: `${theme.palette.primary.light} !important`,
//     },
//   },
//   textField: {
//     borderBottomColor: theme.palette.background.light,
//   },
//   formButtons: {
//     width: "100%",
//     marginTop: theme.spacing(4),
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   forgetButton: {
//     textTransform: "none",
//     fontWeight: 400,
//   },
//   loginLoader: {
//     marginLeft: theme.spacing(4),
//   },
//   copyright: {
//     marginTop: theme.spacing(4),
//     whiteSpace: "nowrap",
//     [theme.breakpoints.up("md")]: {
//       position: "absolute",
//       bottom: theme.spacing(2),
//     },
//   },
//   customTextField: {
//     "& input::placeholder": {
//       fontSize: "13px"
//     },
//     marginTop:"5px !important",
//   },
//   backdrop: {
//     zIndex: 1500,
//     color: '#fff',
//   },
//   drawerFooter:{ 
//     borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
//     position: "fixed !important",
//     bottom: "0 !important",
//     width: "40% !important",
//     justifyContent: "center !important",
//     padding: "10px",
//     background: "white",
//     zIndex: "10",
//     margin: "0px !important"
//   },

//   loginParaBottom:{
//     marginBottom: '25%' 
//   }
  
// }));




import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    
    fontFamily: '"Roboto", sans-serif',
  },
  drawer: {
    width: "40%",
    padding: "10px",
    [theme.breakpoints.down('md')]: {
      width: "80%",
    },
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotypeContainer: {
    backgroundColor: theme.palette.primary.main,
    width: "40%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
   justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  
  leftContainer: {
    backgroundColor: "#1a1b1f",
    // width: "35%",
    height: "100%",
    display: "flex",
    padding: "3rem 3rem",
    flexDirection: "column",
    color:"white",
    alignItems: "baseline",
    [theme.breakpoints.between('xs', 'sm')]: {
      order: 2
    }, 
  },

  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    padding: "0%",
    [theme.breakpoints.between('xs', 'sm')]: {
      order: 1
    }
  },

  logotypeImage: {
    width: 165,
    marginBottom: theme.spacing(4),
  },
  logotypeText: {
    color: "white",
    fontWeight: 500,
    fontSize: 84,
    [theme.breakpoints.down("md")]: {
      fontSize: 48,
    },
  },
  
  form:{
    padding: '15%'
  },
  title:{
    fontSize: 24,
    fontWeight: 600,
    color: "#064be2",
    marginBottom: 5,
    
  },
  subtitle:{
    marginBottom: 42,
    fontSize: "17px",
    fontWeight: 300,
  },
  
  h1:{
    fontSize: 22,
    width : '83%', 
     fontWeight: 600, 
      marginBottom:'10px',
      lineHeight: 1.5,
  },
  body:{
    fontSize: 16,
    width: '87%',
    lineHeight: '29px',
    fontWeight: 300,
    marginBottom:'20px',
  },
  tab: {
    fontWeight: 400,
    fontSize: 18,
  },
  greeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  subGreeting: {
    fontWeight: 500,
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(6),
    boxShadow: theme.customShadows.widget,
    backgroundColor: "white",
    width: "100%",
    textTransform: "none",
  },
  googleButtonCreating: {
    marginTop: 0,
  },
  googleIcon: {
    width: 30,
    marginRight: theme.spacing(2),
  },
  creatingButtonContainer: {
    marginTop: theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  createAccountButton: {
    height: 46,
    textTransform: "none",
  },
  formDividerContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  formDividerWord: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  formDivider: {
    flexGrow: 1,
    height: 1,
    backgroundColor: theme.palette.text.hint + "40",
  },
  errorMessage: {
    textAlign: "center",
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
  formButtons: {
    width: "100%",
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgetButton: {
    textTransform: "none",
    fontWeight: 400,
  },
  loginLoader: {
    marginLeft: theme.spacing(4),
  },
  copyright: {
    marginTop: theme.spacing(4),
    whiteSpace: "nowrap",
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      bottom: theme.spacing(2),
    },
  },
  customTextField: { 
        padding: "5px 12px",
        marginTop: "5px !important",
        width: "100%",
        border: "1px solid #ced4da",
        fontSize: "13px",
       fontFamily: '"Satoshi" !important',
        borderRadius: "4px",
        backgroundColor: "#fff",
        "& input::placeholder": {
          fontSize: "13px"
        },
      },
  backdrop: {
    zIndex: 1500,
    color: '#fff',
  },
  drawerFooter:{ 
    borderTop: "1px solid rgba(0, 0, 0, 0.1) !important",
    position: "fixed !important",
    bottom: "0 !important",
    width: "38% !important",
    justifyContent: "center !important",
    padding: "10px",
    background: "white",
    zIndex: "10",
    margin: "0px !important",
    [theme.breakpoints.down("md")]: {
      width: "78% !important",
    },
    gap: "10px",
  },
  drawerHeader: {
    borderBottom: "1px solid rgb(0 0 0 / 10%)",
    padding: "0px 10px",
    width: "100% !important",
    display: 'flex',
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
  },
  drawerClose: {
    display: 'flex',
    justifyContent: 'end'
  },
  closeBtn: {
    cursor: "pointer"
  },
  bottom : {
    marginBottom:'25%'
  }
}));
