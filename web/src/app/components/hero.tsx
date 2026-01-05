'use client'
import React from "react";
import Link from 'next/link';
import { 
  Box, 
  Button, 
  Typography, 
  Stack, 
  useTheme, 
  useMediaQuery,
  alpha 
} from "@mui/material";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 3, md: 12 },
        py: { xs: 6, md: 0 },
        backgroundColor: "background.default",
        backgroundImage: `
          linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.4)} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%),
          url("/images/hero-back.jpg")  
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: alpha(theme.palette.background.default, 0.65),
          zIndex: 1,
        }
      }}
    >
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ flex: 1, zIndex: 2, position: "relative" }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            mb: 3,
            fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
            lineHeight: 1.2,
            color: "text.primary",
            textShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          Connect and Protect Your Loved Ones.
        
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 5,
            fontSize: { xs: "1rem", md: "1.25rem" },
            color: "text.secondary",
            maxWidth: "90%",
            lineHeight: 1.7,
          }}
        >
          Real-time health monitoring and alerts that bring peace of mind to
          families, employees, and entire communities.
        </Typography>

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.6,
              borderRadius: "50px",
              fontWeight: 700,
              fontSize: "1.1rem",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
              }
            }}
          >
            Order Your RHM Device
          </Button>

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{
                px: 3,
                py: 1.3,
                borderRadius: "50px",
                fontWeight: 600,
                borderColor: alpha(theme.palette.primary.main, 0.4),
                backgroundColor: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: "blur(12px)",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.background.paper, 0.7),
                }
              }}
            >
              Learn More
            </Button>
            <Button
              variant="text"
              color="secondary"
              sx={{
                px: 3,
                py: 1.3,
                borderRadius: "50px",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                }
              }}
               component={Link}
               href="/login"
              
            >
              Already a User? Log In
            </Button>
          </Stack>
        </Stack>
      </motion.div>

      {/* Image / Visual */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          flex: 1,
          maxWidth: isMobile ? "100%" : "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          position: "relative"
        }}
      >
        <Box
          component="img"
          src="/images/family-watch.png"
          alt="Family wearing health watch"
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 3,
            boxShadow: "0 10px 32px rgba(0,0,0,0.25)",
            transform: "rotate(-4deg)",
            backgroundColor: alpha(theme.palette.background.paper, 0.15),
            backdropFilter: "blur(8px)",
          }}
        />
        <Box
          component="img"
          src="/images/watch-app.png"
          alt="Health monitoring app"
          sx={{
            position: "absolute",
            width: "40%",
            maxWidth: 190,
            bottom: 40,
            right: 40,
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            transform: "rotate(6deg)",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Decorative glow */}
        <Box
          sx={{
            position: "absolute",
            width: "80%",
            height: "80%",
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(50px)",
            zIndex: -1,
          }}
        />
      </motion.div>
    </Box>
  );
};

export default HeroSection;
