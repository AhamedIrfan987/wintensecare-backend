// app/components/FinalCTA.tsx
"use client";

import React from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Link, 
  useTheme,
  Fade,
  Paper,
  useMediaQuery
} from "@mui/material";

const FinalCTA: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Fade in={true} timeout={1000}>
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
          }
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)',
            opacity: 0.4,
          }}
        />

        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.8)',
              borderRadius: 4,
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Container maxWidth="md">
              {/* Headline */}
              <Typography 
                variant={isMobile ? "h4" : "h3"} 
                component="h2" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.2,
                }}
              >
                Ready to Bring Peace of Mind to Your World?
              </Typography>

              {/* Subtext */}
              <Typography 
                variant={isMobile ? "body1" : "h6"} 
                component="p" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  mx: 'auto',
                  opacity: 0.8,
                }}
              >
                Join thousands of families and professionals who trust us to keep their loved ones safe, healthy, and connected.
              </Typography>

              {/* Call-to-Action Buttons */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="#get-started"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: 3,
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: 200,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a42a0 100%)',
                    },
                  }}
                >
                  Get Started Today
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="#pricing"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderColor: 'text.secondary',
                    color: 'text.primary',
                    borderRadius: 3,
                    borderWidth: 2,
                    minWidth: 200,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  View Pricing
                </Button>
              </Stack>

              {/* Additional Links */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <Link
                  href="#contact-sales"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Contact Sales for Enterprises
                </Link>
                <Box
                  sx={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'text.secondary',
                    opacity: 0.5,
                    display: { xs: 'none', sm: 'block' },
                  }}
                />
                <Link
                  href="#demo"
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Schedule a Demo
                </Link>
              </Stack>

              {/* Trust indicator */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    opacity: 0.7,
                    fontSize: '0.8rem',
                  }}
                >
                  Trusted by 10,000+ families worldwide
                </Typography>
              </Box>
            </Container>
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
};

export default FinalCTA;