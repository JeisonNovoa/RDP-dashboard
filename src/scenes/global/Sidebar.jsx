import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/TimelineOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "auto",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="icon"
                  width="50px"
                  height="50px"
                  src={`../../assets/iconRPD.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <Typography variant="h3" color={colors.grey[100]}>
                  Ready Player
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Vote System"
              to="/vote"
              icon={<HowToVoteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Game Categories"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="DAO Treasury"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Coin Value Tracker"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Trading Volume"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
// import React from "react";

// const Sidebar = () => {
//   return (
//     <>
//       <aside
//         id="layout-menu"
//         className="layout-menu menu-vertical menu bg-menu-theme"
//         style={{
//           boxSizing: "border-box",
//           display: "flex",
//           flexDirection: "column",
//           width: "16.25rem",
//           minHeight: "1px",
//           flex: "1 0 auto",
//           color: "rgb(105, 122, 141)",
//           transition: "width 0.3s ease 0s",
//           position: "fixed",
//           top: "0px",
//           bottom: "0px",
//           left: "0px",
//           boxShadow: "rgba(161, 172, 184, 0.12) 0px 0.125rem 0.375rem 0px",
//           zIndex: 1080,
//           backgroundColor: "rgb(255, 255, 255)",
//           marginRight: "0px",
//           marginLeft: "0px",
//         }}
//       >
//         <div
//           className="app-brand demo"
//           style={{
//             boxSizing: "border-box",
//             overflow: "hidden",
//             display: "flex",
//             flexGrow: 0,
//             flexShrink: 0,
//             lineHeight: 1,
//             minHeight: "1px",
//             alignItems: "center",
//             width: "100%",
//             paddingRight: "2rem",
//             height: "64px",
//             marginTop: "12px",
//             paddingLeft: "19px",
//           }}
//         >
//           <a
//             className="app-brand-link"
//             href="http://127.0.0.1:5500/Template/dashboard/html/index.html"
//             style={{
//               boxSizing: "border-box",
//               textDecoration: "none",
//               color: "rgb(105, 108, 255)",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <span
//               className="app-brand-logo demo"
//               style={{
//                 boxSizing: "border-box",
//                 overflow: "hidden",
//                 display: "block",
//                 flexGrow: 0,
//                 flexShrink: 0,
//                 minHeight: "1px",
//                 marginRight: "-42px",
//               }}
//             >
//               <img
//                 alt="logo"
//                 src="http://127.0.0.1:5500/Template/dashboard/assets/img/icons/ReadyPlayer-logo.png"
//                 style={{
//                   boxSizing: "border-box",
//                   verticalAlign: "middle",
//                   display: "block",
//                   width: "55%",
//                 }}
//               />
//             </span>
//             <span
//               className="app-brand-text demo menu-text fw-bolder ms-2"
//               style={{
//                 boxSizing: "border-box",
//                 transition: "opacity 0.15s ease-in-out 0s",
//                 flexShrink: 0,
//                 opacity: 1,
//                 color: "rgb(86, 106, 127)",
//                 fontSize: "1.75rem",
//                 letterSpacing: "-0.5px",
//                 textTransform: "lowercase",
//                 fontWeight: 900,
//                 marginLeft: "0.5rem",
//               }}
//             >
//               ReadyPlayer
//             </span>
//           </a>
//           <a
//             className="layout-menu-toggle menu-link text-large ms-auto d-xl-none d-block"
//             href="/#"
//             style={{
//               boxSizing: "border-box",
//               textDecoration: "none",
//               flex: "0 1 auto",
//               margin: "0px",
//               alignItems: "center",
//               borderRadius: "50%",
//               position: "absolute",
//               left: "15rem",
//               color: "rgb(105, 122, 141)",
//               border: "7px solid rgb(245, 245, 249)",
//               backgroundColor: "rgb(105, 108, 255)",
//               transitionDuration: "0.3s",
//               transitionProperty: "color, background-color",
//               display: "none",
//               marginLeft: "auto",
//             }}
//           >
//             <i
//               className="bx bx-chevron-left bx-sm align-middle"
//               style={{
//                 boxSizing: "border-box",
//                 fontVariant: "normal",
//                 fontWeight: "normal",
//                 fontStyle: "normal",
//                 textRendering: "auto",
//                 display: "inline-block",
//                 textTransform: "none",
//                 speak: "none",
//                 WebkitFontSmoothing: "antialiased",
//                 lineHeight: 1,
//                 flex: "0 1 auto",
//                 opacity: 1,
//                 width: "1.5rem",
//                 height: "1.5rem",
//                 color: "rgb(255, 255, 255)",
//                 transition: "opacity 0.3s ease-in-out 0s",
//                 fontFamily: "boxicons",
//                 fontSize: "1.55rem",
//                 verticalAlign: "middle",
//               }}
//             />
//           </a>
//         </div>
//         <div
//           className="menu-inner-shadow"
//           style={{
//             boxSizing: "border-box",
//             display: "none",
//             position: "absolute",
//             top: "4.225rem",
//             height: "3rem",
//             width: "100%",
//             pointerEvents: "none",
//             zIndex: 2,
//             background:
//               "linear-gradient(rgb(255, 255, 255) 41%, rgba(255, 255, 255, 0.11) 95%, rgba(255, 255, 255, 0))",
//           }}
//         />
//         <ul
//           className="menu-inner py-1 ps"
//           style={{
//             boxSizing: "border-box",
//             margin: "0px",
//             padding: "0px",
//             display: "flex",
//             alignItems: "flex-start",
//             justifyContent: "flex-start",
//             marginTop: "0px",
//             marginBottom: "0px",
//             paddingLeft: "0px",
//             height: "100%",
//             overflowAnchor: "none",
//             touchAction: "auto",
//             position: "relative",
//             flex: "1 1 auto",
//             flexDirection: "column",
//             paddingTop: "0.25rem",
//             paddingBottom: "0.25rem",
//             overflow: "hidden",
//           }}
//         >
//           <li
//             className="menu-item active"
//             style={{
//               boxSizing: "border-box",
//               alignItems: "flex-start",
//               justifyContent: "flex-start",
//               flex: "0 0 auto",
//               padding: "0px",
//               listStyle: "none",
//               flexDirection: "column",
//               width: "16.25rem",
//               margin: "0.0625rem 0px",
//             }}
//           >
//             <a
//               className="menu-link"
//               href="http://127.0.0.1:5500/Template/dashboard/html/index.html"
//               style={{
//                 boxSizing: "border-box",
//                 textDecoration: "none",
//                 flex: "0 1 auto",
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 transitionDuration: "0.3s",
//                 transitionProperty: "color, background-color",
//                 padding: "0.625rem 1rem",
//                 fontSize: "0.9375rem",
//                 margin: "0rem 1rem",
//                 fontWeight: 600,
//                 color: "rgb(105, 108, 255)",
//                 borderRadius: "0.375rem",
//                 backgroundColor: "rgba(105, 108, 255, 0.16)",
//               }}
//             >
//               <i
//                 className="menu-icon tf-icons bx bx-home-circle"
//                 style={{
//                   boxSizing: "border-box",
//                   fontVariant: "normal",
//                   fontWeight: "normal",
//                   fontStyle: "normal",
//                   textRendering: "auto",
//                   display: "inline-block",
//                   textTransform: "none",
//                   speak: "none",
//                   WebkitFontSmoothing: "antialiased",
//                   verticalAlign: "middle",
//                   lineHeight: 1,
//                   flexGrow: 0,
//                   flexShrink: 0,
//                   marginRight: "0.5rem",
//                   fontSize: "1.25rem",
//                   width: "1.5rem",
//                   transition: "margin-right 0.3s ease 0s",
//                   fontFamily: "boxicons",
//                 }}
//               />
//               <div
//                 style={{
//                   boxSizing: "border-box",
//                   flex: "0 1 auto",
//                   opacity: 1,
//                   transition: "opacity 0.3s ease-in-out 0s",
//                 }}
//               >
//                 Dashboard
//               </div>
//             </a>
//           </li>
//           <li
//             className="menu-item"
//             style={{
//               boxSizing: "border-box",
//               alignItems: "flex-start",
//               justifyContent: "flex-start",
//               flex: "0 0 auto",
//               padding: "0px",
//               listStyle: "none",
//               flexDirection: "column",
//               width: "16.25rem",
//               margin: "0.0625rem 0px",
//             }}
//           >
//             <a
//               className="menu-link"
//               href="http://127.0.0.1:5500/Template/dashboard/html/dapp.html"
//               style={{
//                 boxSizing: "border-box",
//                 textDecoration: "none",
//                 flex: "0 1 auto",
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 color: "rgb(105, 122, 141)",
//                 transitionDuration: "0.3s",
//                 transitionProperty: "color, background-color",
//                 padding: "0.625rem 1rem",
//                 fontSize: "0.9375rem",
//                 margin: "0rem 1rem",
//                 borderRadius: "0.375rem",
//               }}
//             >
//               <i
//                 className="menu-icon tf-icons bx bx-user"
//                 style={{
//                   boxSizing: "border-box",
//                   fontVariant: "normal",
//                   fontWeight: "normal",
//                   fontStyle: "normal",
//                   textRendering: "auto",
//                   display: "inline-block",
//                   textTransform: "none",
//                   speak: "none",
//                   WebkitFontSmoothing: "antialiased",
//                   verticalAlign: "middle",
//                   lineHeight: 1,
//                   flexGrow: 0,
//                   flexShrink: 0,
//                   marginRight: "0.5rem",
//                   fontSize: "1.25rem",
//                   width: "1.5rem",
//                   transition: "margin-right 0.3s ease 0s",
//                   fontFamily: "boxicons",
//                 }}
//               />
//               <div
//                 style={{
//                   boxSizing: "border-box",
//                   flex: "0 1 auto",
//                   opacity: 1,
//                   transition: "opacity 0.3s ease-in-out 0s",
//                 }}
//               >
//                 Community
//               </div>
//             </a>
//           </li>
//           <li
//             className="menu-header small text-uppercase"
//             style={{
//               boxSizing: "border-box",
//               fontSize: "85%",
//               flex: "0 0 auto",
//               listStyle: "none",
//               flexDirection: "column",
//               transition: "opacity 0.3s ease-in-out 0s",
//               opacity: 1,
//               margin: "1rem 0px 0.5rem",
//               padding: "0.625rem 2rem",
//               position: "relative",
//               color: "rgb(161, 172, 184)",
//               width: "16.25rem",
//               textTransform: "uppercase",
//             }}
//           >
//             <span
//               className="menu-header-text"
//               style={{ boxSizing: "border-box" }}
//             >
//               Misc
//             </span>
//           </li>
//           <li
//             className="menu-item"
//             style={{
//               boxSizing: "border-box",
//               alignItems: "flex-start",
//               justifyContent: "flex-start",
//               flex: "0 0 auto",
//               padding: "0px",
//               listStyle: "none",
//               flexDirection: "column",
//               width: "16.25rem",
//               margin: "0.0625rem 0px",
//             }}
//           >
//             <a
//               className="menu-link"
//               href="http://127.0.0.1:5500/Template/dashboard/html/index.html#"
//               target="_blank"
//               style={{
//                 boxSizing: "border-box",
//                 textDecoration: "none",
//                 flex: "0 1 auto",
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 color: "rgb(105, 122, 141)",
//                 transitionDuration: "0.3s",
//                 transitionProperty: "color, background-color",
//                 padding: "0.625rem 1rem",
//                 fontSize: "0.9375rem",
//                 margin: "0rem 1rem",
//                 borderRadius: "0.375rem",
//               }}
//             >
//               <i
//                 className="menu-icon tf-icons bx bx-support"
//                 style={{
//                   boxSizing: "border-box",
//                   fontVariant: "normal",
//                   fontWeight: "normal",
//                   fontStyle: "normal",
//                   textRendering: "auto",
//                   display: "inline-block",
//                   textTransform: "none",
//                   speak: "none",
//                   WebkitFontSmoothing: "antialiased",
//                   verticalAlign: "middle",
//                   lineHeight: 1,
//                   flexGrow: 0,
//                   flexShrink: 0,
//                   marginRight: "0.5rem",
//                   fontSize: "1.25rem",
//                   width: "1.5rem",
//                   transition: "margin-right 0.3s ease 0s",
//                   fontFamily: "boxicons",
//                 }}
//               />
//               <div
//                 style={{
//                   boxSizing: "border-box",
//                   flex: "0 1 auto",
//                   opacity: 1,
//                   transition: "opacity 0.3s ease-in-out 0s",
//                 }}
//               >
//                 Support
//               </div>
//             </a>
//           </li>
//           <div
//             className="ps__rail-x"
//             style={{
//               boxSizing: "border-box",
//               transition:
//                 "background-color 0.2s linear 0s, opacity 0.2s linear 0s",
//               display: "none",
//               opacity: 0,
//               position: "absolute",
//               height: "0.25rem",
//               borderRadius: "10rem",
//               left: "0px",
//               bottom: "0px",
//             }}
//           >
//             <div
//               className="ps__thumb-x"
//               tabIndex="0"
//               style={{
//                 boxSizing: "border-box",
//                 transition:
//                   "background-color 0.2s linear 0s, height 0.2s ease-in-out 0s",
//                 position: "absolute",
//                 borderRadius: "10rem",
//                 height: "0.25rem",
//                 bottom: "0px",
//                 backgroundColor: "rgba(67, 89, 113, 0.4)",
//                 left: "0px",
//                 width: "0px",
//               }}
//             />
//           </div>
//           <div
//             className="ps__rail-y"
//             style={{
//               boxSizing: "border-box",
//               transition:
//                 "background-color 0.2s linear 0s, opacity 0.2s linear 0s",
//               display: "none",
//               opacity: 0,
//               position: "absolute",
//               borderRadius: "10rem",
//               top: "0px",
//               width: "0.125rem",
//               background: "none",
//               right: "0.25rem",
//               left: "auto",
//             }}
//           >
//             <div
//               className="ps__thumb-y"
//               tabIndex="0"
//               style={{
//                 boxSizing: "border-box",
//                 transition:
//                   "background-color 0.2s linear 0s, width 0.2s ease-in-out 0s",
//                 position: "absolute",
//                 borderRadius: "10rem",
//                 right: "0px",
//                 top: "0px",
//                 height: "0px",
//                 width: "0.125rem",
//                 background: "rgba(86, 106, 127, 0.2)",
//                 backgroundColor: "rgba(86, 106, 127, 0.2)",
//               }}
//             />
//           </div>
//         </ul>
//       </aside>
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
// html {
//   box-sizing: border-box;
//   font-size: 16px;
//   scroll-behavior: smooth;
//   color-scheme: light;
// }

// body {
//   box-sizing: border-box;
//   margin: 0px;
//   font-family: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
//   font-size: 0.9375rem;
//   font-weight: 400;
//   line-height: 1.53;
//   color: #697a8d;
//   text-align: var(--bs-body-text-align);
//   background-color: #f5f5f9;
//   text-size-adjust: 100%;
//   -webkit-tap-highlight-color: rgba(67, 89, 113, 0);
//   text-rendering: optimizelegibility;
//   -webkit-font-smoothing: antialiased;
// }
// `,
//         }}
//       />
//     </>
//   );
// }
// export default Sidebar;