import React from "react";
import { Box, Typography } from "@mui/material";

type MetricValueProps = {
  value: string | number;
  label?: string;
  sub?: string;
};

export function MetricValue({ value, label, sub }: MetricValueProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      {/* VALUE */}
      <Typography
        variant="h5"
        fontWeight={700}
        noWrap
      >
        {value}
      </Typography>

      {/* LABEL */}
      {label && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5 }}
          noWrap
        >
          {label}
        </Typography>
      )}

      {/* SUBTEXT */}
      {sub && (
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{
            mt: 0.75,
            maxWidth: 140,
          }}
          noWrap
        >
          {sub}
        </Typography>
      )}
    </Box>
  );
}
