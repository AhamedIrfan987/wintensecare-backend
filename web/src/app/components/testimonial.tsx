// app/testimonials/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Rating,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { Star, FormatQuote, NavigateBefore, NavigateNext } from "@mui/icons-material";

const TestimonialsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ravi P.",
      role: "Son and primary caregiver",
      location: "Bengaluru",
      avatar: "/images/testimonial-father.png",
      content: "The high heart rate alert from my father watch literally saved his life. We rushed him to the hospital and he received treatment for a heart condition we never knew about. This is more than a device, it is a lifeline.",
      rating: 5,
      accentColor: "#2196f3",
    },
    {
      id: 2,
      name: "Priya S.",
      role: "HR Director | TechCorp India",
      location: "",
      avatar: "/images/corporatelogo.png",
      content: "Implementing these watches has been a cornerstone of our employee wellness program. It shows we genuinely care, and the health insights have helped us reduce stress-related absenteeism by 22%.",
      rating: 5,
      accentColor: "#4caf50",
    },
    {
      id: 3,
      name: "Dr. Amit K.",
      role: "Chief Medical Officer, Apollo Community Clinic",
      location: "",
      avatar: "/images/cmo.png",
      content: "The ability to receive validated patient data between appointments is transformative. It allows for preventative care and more informed consultations, especially for our patients with chronic conditions.",
      rating: 5,
      accentColor: "#ff9800",
    },
  ];

const handleNext = React.useCallback(() => {
  setDirection(1);
  setCurrentIndex((prevIndex) =>
    prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
  );
}, [testimonials.length]);

useEffect(() => {
  const interval = setInterval(handleNext, 5000);
  return () => clearInterval(interval);
}, [handleNext]);


  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };




  const sideCardVariants = {
    left: {
      x: -200,
      scale: 0.8,
      opacity: 0.6,
      rotateY: -25,
      zIndex: 1,
      transition: { duration: 0.5 }
    },
    right: {
      x: 200,
      scale: 0.8,
      opacity: 0.6,
      rotateY: 25,
      zIndex: 1,
      transition: { duration: 0.5 }
    },
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 2,
      transition: { duration: 0.5 }
    }
  };

  // Get previous and next indices for side cards
  const getSideIndices = () => {
    const prevIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    return { prevIndex, nextIndex };
  };
 



  const { prevIndex, nextIndex } = getSideIndices();

  return (

    
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 6, md: 10 },
       background: "#0F0E0E",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #2196f3, #4caf50, #ff9800)",
        },
      }}
    >
      {/* Dark theme background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(33, 150, 243, 0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -50,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76, 175, 80, 0.06) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 152, 0, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(33, 150, 243, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(76, 175, 80, 0.02) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              background: "linear-gradient(135deg, #2196f3 0%, #4caf50 50%, #ff9800 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
            }}
          >
            Trusted by Families and Professionals
          </Typography>
          
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontWeight: 400,
              mb: { xs: 4, md: 8 },
              color: "grey.400",
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Discover how our health monitoring solutions are making a real difference in peoples lives
          </Typography>
        </motion.div>

        {/* 3D Carousel Container */}
        <Box sx={{ position: "relative", height: 500, display: "flex", alignItems: "center" }}>
          {/* Navigation Buttons */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: 0, md: -60 },
              zIndex: 10,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <NavigateBefore sx={{ color: "white", fontSize: 32 }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 0, md: -60 },
              zIndex: 10,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <NavigateNext sx={{ color: "white", fontSize: 32 }} />
          </IconButton>

          {/* 3D Carousel */}
          <Box sx={{ position: "relative", width: "100%", height: "100%", perspective: 1200 }}>
            {/* Left Side Card */}
            {!isMobile && (
              <motion.div
                key={`left-${prevIndex}`}
                variants={sideCardVariants}
                initial="right"
                animate="left"
                style={{
                  position: "absolute",
                  left: "10%",
                  top: "20%",
                  transform: "translateY(-50%)",
                  width: "30%",
                }}
              >
                <TestimonialCard testimonial={testimonials[prevIndex]} isSideCard />
              </motion.div>
            )}

            {/* Center Card */}
            <motion.div
              key={currentIndex}
              custom={direction}
              
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "90%" : "40%",
              }}
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} isMainCard />
            </motion.div>

            {/* Right Side Card */}
            {!isMobile && (
              <motion.div
                key={`right-${nextIndex}`}
                variants={sideCardVariants}
                initial="left"
                animate="right"
                style={{
                  position: "absolute",
                  right: "10%",
                  top: "20%",
                  transform: "translateY(-50%)",
                  width: "30%",
                }}
              >
                <TestimonialCard testimonial={testimonials[nextIndex]} isSideCard />
              </motion.div>
            )}
          </Box>
        </Box>

        {/* Dots Indicator */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: index === currentIndex ? testimonials[currentIndex].accentColor : "grey.600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                  background: testimonials[index].accentColor,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};


 interface Testimonial {
  id: number;
  name: string;
  role: string;
  location?: string;
  avatar: string;
  content: string;
  rating: number;
  accentColor: string;
}

// Separate component for testimonial card
const TestimonialCard: React.FC<{ 
 testimonial: Testimonial; 
  isMainCard?: boolean;
  isSideCard?: boolean;
}> = ({ testimonial, isMainCard = false, isSideCard = false }) => {
  return (
    <motion.div
      whileHover={isMainCard ? { 
        y: -8,
        transition: { duration: 0.3 }
      } : {}}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
        
          borderRadius: 4,
         
          background: `
            linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 50%, #2d2d2d 100%)
          `,
          border: `1px solid rgba(255, 255, 255, 0.05)`,
          boxShadow: isMainCard ? `
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px ${testimonial.accentColor}20,
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          ` : `
            0 10px 20px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          transformStyle: "preserve-3d",
          transform: isSideCard ? "scale(0.9)" : "scale(1)",
          opacity: isSideCard ? 0.7 : 1,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: isMainCard ? `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 0 1px ${testimonial.accentColor}40,
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            ` : `
              0 15px 30px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05)
            `,
          },
          position: "relative",
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, 
              ${testimonial.accentColor}, 
              ${testimonial.accentColor}80)`,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, md: 4 },
            
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transform: "translateZ(30px)",
          }}
        >
          {/* Quote Icon */}
          <FormatQuote
            sx={{
              fontSize: 64,
              color: testimonial.accentColor,
              opacity: 0.1,
              position: "absolute",
              top: 16,
              right: 24,
            }}
          />

          {/* Avatar and Rating */}
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
            <Avatar
              src={testimonial.avatar}
              alt={testimonial.name}
              sx={{
                width: isSideCard ? 60 : 80,
                height: isSideCard ? 60 : 80,
                border: `3px solid ${testimonial.accentColor}30`,
                boxShadow: `0 4px 20px ${testimonial.accentColor}20`,
                background: "rgba(255, 255, 255, 0.05)",
              }}
            />
            <Box sx={{ ml: 2, flex: 1 }}>
              <Rating
                value={testimonial.rating}
                readOnly
                icon={
                  <Star 
                    sx={{ 
                      color: testimonial.accentColor,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                    }} 
                  />
                }
                emptyIcon={
                  <Star 
                    sx={{ 
                      color: "grey.700",
                    }} 
                  />
                }
                size="small"
              />
            </Box>
          </Box>

          {/* Testimonial Content */}
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              mb: 3,
              color: "grey.300",
              lineHeight: 1.7,
              fontSize: isSideCard ? "0.9rem" : "1.1rem",
              flex: 1,
              position: "relative",
              zIndex: 1,
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              display: "-webkit-box",
           
              WebkitBoxOrient: "vertical",
         
            }}
          >
          
            {testimonial.content}
          </Typography>

          <Divider 
            sx={{ 
              my: 2, 
              background: `linear-gradient(90deg, transparent, ${testimonial.accentColor}20, transparent)`,
              border: "none",
              height: "1px",
            }} 
          />

          {/* Author Info */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "grey.100",
                mb: 0.5,
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                fontSize: isSideCard ? "0.9rem" : "1rem",
              }}
            >
              {testimonial.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "grey.400",
                lineHeight: 1.4,
                fontSize: isSideCard ? "0.8rem" : "0.9rem",
              }}
            >
              {testimonial.role}
              {testimonial.location && (
                <>
                  <br />
                  <Box 
                    component="span" 
                    sx={{ color: testimonial.accentColor }}
                  >
                    {testimonial.location}
                  </Box>
                </>
              )}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialsPage;

