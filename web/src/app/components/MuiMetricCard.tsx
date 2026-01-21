"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
} from "@mui/material";

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  status?: "normal" | "warning" | "critical";
};

const STATUS_COLORS = {
  normal: "#e8f5e9",
  warning: "#fff8e1",
  critical: "#ffebee",
};

export const MuiMetricCard: React.FC<Props> = ({
  title,
  children,
  onClick,
  status = "normal",
}) => {
  const Wrapper = onClick ? CardActionArea : Box;

  return (
    <Card
      elevation={2}
      sx={{
        height: 140, // 🔥 grid stability
        borderRadius: 2,
        transition: "box-shadow 0.2s ease",
        "&:hover": onClick ? { boxShadow: 6 } : undefined,
      }}
    >
      <Wrapper
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <CardContent
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title && (
              <Typography variant="subtitle2" fontWeight={600}>
                {title}
              </Typography>
            )}

            {/* STATUS INDICATOR */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: STATUS_COLORS[status],
              }}
            />
          </Box>

          {/* CONTENT */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </Box>
        </CardContent>
      </Wrapper>
    </Card>
  );
};

export default MuiMetricCard;
