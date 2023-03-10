import { Box, BoxProps } from "@mui/material";
import { SpringValue, useSpringValue } from "@react-spring/web";
import { ReactNode, useContext, useRef, useState, useEffect } from "react";
import { CursorContext } from "./Provider";
import { atom, Atom } from "jotai/vanilla";
import { useAtom } from "jotai/react";

export type CursorTargetEffect =
  | {
      type: "grow";
      size: number;
    }
  | {
      type: "hide";
    };

export function CursorTarget<T>(
  props: {
    children?:
      | ReactNode
      | ((opt: {
          hover: SpringValue<number>;
          isHovered: boolean;
        }) => ReactNode);
    content?: ReactNode;
    effect: CursorTargetEffect | null;
  } & Omit<BoxProps, "component" | "children">
) {
  const {
    children,
    content,
    effect: effectProp,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;
  const elRef = useRef<HTMLDivElement>(null);
  const cursor = useContext(CursorContext);

  const hover = useSpringValue(0);
  const [isHovered, setHovered] = useState(false);

  const effectAtom = useRef<Atom<CursorTargetEffect | null>>(
    atom(effectProp)
  ).current;
  const [effect, setEffect] = useAtom(effectAtom);

  useEffect(() => {
    (setEffect as any)(effectProp);
  }, [effectProp]);

  useEffect(() => {
    return () => {
      setHovered((x) => {
        if (x) cursor.handleTargetExit();
        return x;
      });
    };
  }, []);

  return (
    <Box
      component="div"
      ref={elRef}
      onMouseEnter={(e) => {
        hover.start(1);
        cursor.handleTargetEnter(effectAtom, content);
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        hover.start(0);
        cursor.handleTargetExit();
        setHovered(false);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      {typeof children === "function"
        ? children({ hover, isHovered })
        : children}
    </Box>
  );
}
