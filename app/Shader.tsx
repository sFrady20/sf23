"use client";

import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { CursorTarget } from "components/Cursor";
import { useEffect, useRef } from "react";
import { useResize } from "@react-spring/web";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Canvas } from "@react-three/fiber";
import Color from "color";
import Slice from "components/Slice";

export function Shader(props: {
  frag: string;
  title?: string;
  subtitle?: string;
  sourceHref?: string;
}) {
  const { frag, title, subtitle, sourceHref } = props;
  const theme = useTheme();
  const containerEl = useRef<HTMLDivElement>(null);
  const uniforms = useRef({
    resolution: { value: [100, 100] },
    time: { value: 0 },
    cursor: { value: [0, 0] },
  }).current;

  const backdropRgb = Color(theme.palette.common.black)
    .rgb()
    .array()
    .map((x) => `${x / 2.55}%`)
    .join(" ");

  useEffect(() => {
    let frame = 0;
    const cb = (now: number) => {
      uniforms.time.value = now / 1000;
      frame = requestAnimationFrame(cb);
    };
    frame = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useResize({
    container: containerEl as any,
    immediate: true,
    onChange: ({ value: { width, height } }) => {
      uniforms.resolution.value = [width, height];
    },
  });

  return (
    <CursorTarget effect={{ type: "hide" }}>
      <Box
        component={"div"}
        className={"col-span-1"}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: {
            xs: 2,
            md: 1,
            lg: 3,
          },
          transition: "box-shadow 0.2s ease-out, transform 0.2s ease-in-out",
          cursor: "crosshair",
          overflow: "hidden",
          paddingBottom: "72%",
          height: 0,
          position: "relative",
          boxShadow: "0 4px 3px -1.5px rgb(0 0 0 / 5%)",

          ["&:hover"]: {
            boxShadow: "0 40px 30px -15px rgb(0 0 0 / 30%)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Box
          ref={containerEl}
          component={"div"}
          sx={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          onMouseMove={(e) => {
            var rect = (e.target as any).getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            uniforms.cursor.value = [x, y];
          }}
        >
          <Canvas dpr={[1, 1]}>
            <Slice>
              <shaderMaterial fragmentShader={frag} uniforms={uniforms} />
            </Slice>
          </Canvas>
        </Box>

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "45%",
            alignItems: "flex-end",
            justifyContent: "space-between",
            px: { xs: 3, md: 4 },
            py: 3,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(0deg, rgb(${backdropRgb}) 0%, rgb(${backdropRgb} / 0.9903926402016152) 6.25%, rgb(${backdropRgb} / 0.9619397662556434) 12.5%, rgb(${backdropRgb} / 0.9157348061512727) 18.75%, rgb(${backdropRgb} / 0.8535533905932737) 25%, rgb(${backdropRgb} / 0.7777851165098011) 31.25%, rgb(${backdropRgb} / 0.6913417161825449) 37.5%, rgb(${backdropRgb} / 0.5975451610080642) 43.75%, rgb(${backdropRgb} / 0.5) 50%, rgb(${backdropRgb} / 0.4024548389919359) 56.25%, rgb(${backdropRgb} / 0.3086582838174552) 62.5%, rgb(${backdropRgb} / 0.22221488349019902) 68.75%, rgb(${backdropRgb} / 0.14644660940672627) 75%, rgb(${backdropRgb} / 0.08426519384872733) 81.25%, rgb(${backdropRgb} / 0.03806023374435663) 87.5%, rgb(${backdropRgb} / 0.009607359798384785) 93.75%, rgb(${backdropRgb} / 0) 100% )`,
          }}
        >
          <Stack>
            <Typography
              sx={{ opacity: 0.8, lineHeight: 1, color: "common.white" }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ opacity: 0.4, lineHeight: 1, color: "common.white" }}
            >
              {subtitle}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            {sourceHref && (
              <Link href={sourceHref} target={"_blank"}>
                <IconButton sx={{ pointerEvents: "all", cursor: "alias" }}>
                  <GitHubIcon sx={{ color: "common.white" }} />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </CursorTarget>
  );
}
