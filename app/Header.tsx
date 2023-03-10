"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Menu } from "./Menu";
import { AnimatePresence } from "components/AnimatePresence";

export default function Header(props: {}) {
  const { setMode, mode } = useColorScheme();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.document.body.style.overflowY =
      isMenuOpen && isMobile ? "hidden" : "auto";
  }, [isMenuOpen && isMobile]);

  return (
    <>
      <AnimatePresence isPresent={isMenuOpen && isMobile}>
        {({ enter, exit }) => <Menu enter={enter} exit={exit} />}
      </AnimatePresence>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className={"backdrop-filter backdrop-blur-100px"}
        sx={{
          position: "fixed",
          top: "5vh",
          left: "5vw",
          right: "5vw",
          borderRadius: 4,
          pr: 1,
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} sx={{ flex: 1 }}>
          <Link href={"/"}>
            <Button
              sx={{ borderRadius: 4, height: 50, px: 2 }}
              startIcon={
                <Avatar
                  src={"/portrait-trans.png"}
                  sx={{ width: 32, height: 32 }}
                />
              }
            >
              <Typography
                component={"h1"}
                sx={{
                  color: isMenuOpen && isMobile ? "common.white" : undefined,
                }}
              >
                sf23
              </Typography>
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box component={"div"}>
            <Link href={"https://github.com/sFrady20"} target="_blank">
              <IconButton sx={{ color: "inherit", cursor: "alias" }}>
                <GitHubIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
              <IconButton sx={{ color: "inherit", cursor: "alias" }}>
                <TwitterIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <EmailIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Link>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={2}
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          <ButtonGroup>
            <Button
              variant={"text"}
              color={"inherit"}
              onClick={() => {
                setMode(
                  mode === "system"
                    ? "light"
                    : mode === "light"
                    ? "dark"
                    : "system"
                );
              }}
            >
              {mode === "dark" ? (
                <DarkModeIcon />
              ) : mode === "light" ? (
                <LightModeIcon />
              ) : (
                <AutoAwesomeIcon />
              )}
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            sx={{ color: isMenuOpen ? "common.white" : "inherit" }}
            onClick={() => setMenuOpen((x) => !x)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
