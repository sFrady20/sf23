"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <Box
      sx={{
        mt: { xs: "calc(5vh + 90px)", md: "calc(5vh + 130px)" },
      }}
    >
      Projects
      <Link href={"/projects/test"}>
        <Button>Project</Button>
      </Link>
    </Box>
  );
}