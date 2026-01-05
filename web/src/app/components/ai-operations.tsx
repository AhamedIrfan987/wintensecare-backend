// components/AIOperationsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Chip, alpha, useTheme, useMediaQuery } from '@mui/material';
import { NotificationsActive, FamilyRestroom, MedicalServices, Security, Analytics, SupportAgent, PlayArrow, Pause } from '@mui/icons-material';

export default function AIOperationsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const features = [
    { 
      icon: <NotificationsActive sx={{ fontSize: 48 }} />, 
      title: 'Real-time Alerts', 
      description: '24/7 monitoring with instant alerts for immediate response and intervention.', 
      color: theme.palette.error.main,
      image: '/images/realtimaleart.png',
      imageAlt: 'Real-time monitoring dashboard showing live alerts',
      stats: '99.9% Uptime'
    },
    { 
      icon: <FamilyRestroom sx={{ fontSize: 48 }} />, 
      title: 'Family Notifications', 
      description: 'Loved ones receive immediate updates, ensuring peace of mind and quick family coordination.', 
      color: theme.palette.primary.main,
      image: '/images/familynotify.png',
      imageAlt: 'Family receiving notifications on mobile devices',
      stats: '<30s Delivery'
    },
    { 
      icon: <MedicalServices sx={{ fontSize: 48 }} />, 
      title: 'Healthcare Integration', 
      description: 'Direct alerts to healthcare professionals for timely medical intervention when needed.', 
      color: theme.palette.success.main,
      image: '/images/health.png',
      imageAlt: 'Healthcare professionals monitoring patient data',
      stats: '500+ Partners'
    },
    { 
      icon: <Security sx={{ fontSize: 48 }} />, 
      title: 'Proactive Safety', 
      description: 'AI-driven predictive analysis to prevent incidents before they occur.', 
      color: theme.palette.warning.main,
      image: '/images/proactive-safety.png',
      imageAlt: 'AI safety prediction analytics dashboard',
      stats: '94% Accuracy'
    },
    { 
      icon: <Analytics sx={{ fontSize: 48 }} />,
      title: 'Smart Analytics',
      description: 'Advanced data analytics to identify patterns and improve safety measures over time.', 
      color: theme.palette.info.main,
      image: '/images/smart-analytics.png',
      imageAlt: 'Data analytics visualization with charts and graphs',
      stats: '10M+ Data Points'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 48 }} />,
      title: '24/7 Support', 
      description: 'Round-the-clock professional monitoring and support team always ready to assist.', 
      color: theme.palette.secondary.main,
      image: '/images/24-7-support.png',
      imageAlt: 'Support team available around the clock',
      stats: '2min Response'
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, features.length]);

  return (
    <Box sx={{ 
      bgcolor: 'grey.50', 
      py: 12,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${alpha(theme.palette.info.main, 0.05)} 0%, transparent 50%)
        `,
        zIndex: 0
      }} />

      {/* Floating particles */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.3),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: 'float 6s ease-in-out infinite',
            animationDelay: `${i * 0.5}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
              '50%': { transform: 'translateY(-20px) translateX(10px)' }
            }
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="AI-Powered Safety"
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.2), 
              color: theme.palette.primary.light, 
              mb: 4, 
              fontWeight: 600,
              fontSize: '0.9rem',
              py: 1,
              px: 3,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
              backdropFilter: 'blur(10px)'
            }}
          />
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '4rem' },
              letterSpacing: '-0.02em'
            }}
          >
            AI Operations Center
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'grey.300', 
              maxWidth: 600, 
              mx: 'auto', 
              lineHeight: 1.7,
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 300
            }}
          >
            Continuous AI monitoring that proactively alerts loved ones and healthcare advisors 
            when attention is required.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
          {/* Left: Interactive Feature Showcase with Image */}
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ 
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: `0 25px 50px ${alpha('#000', 0.5)}`,
              background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              border: `1px solid ${alpha('#fff', 0.1)}`
            }}>
              {/* Main Feature Display with Image */}
              <Box sx={{ 
                height: 400,
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background Image with Overlay */}
                <Box
                  component="div"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    backgroundImage: `url(${features[activeFeature].image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Gradient Overlay */}
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${alpha(features[activeFeature].color, 0.1)} 0%, ${alpha('#0f172a', 0.7)} 100%)`,
                    zIndex: 2
                  }} />
                </Box>

                {/* Content Overlay */}
                <Box sx={{
                  position: 'relative',
                  zIndex: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 4
                }}>
            
               
                </Box>
              </Box>

              {/* Feature Content */}
              <Box sx={{ p: 4, position: 'relative', zIndex: 4 }}>
                <Typography sx={{ 
                  color: 'grey.200', 
                  lineHeight: 1.7,
                  fontSize: '1.1rem',
                  mb: 3
                }}>
                  {features[activeFeature].description}
                </Typography>

                {/* Progress Indicators */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Button
                    onClick={() => setIsPlaying(!isPlaying)}
                    sx={{ 
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                      color: 'white',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.3)
                      }
                    }}
                  >
                    {isPlaying ? <Pause /> : <PlayArrow />}
                  </Button>
                  
                  <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                    {features.map((_, index) => (
                      <Box
                        key={index}
                        onClick={() => {
                          setActiveFeature(index);
                          setIsPlaying(false);
                        }}
                        sx={{
                          flex: 1,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: alpha('#fff', index === activeFeature ? 0.8 : 0.2),
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: alpha('#fff', index === activeFeature ? 0.9 : 0.3)
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right: Feature Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)'
            },
            gap: 3
          }}>
            {features.map((feature, index) => (
              <Card
                key={index}
                onClick={() => {
                  setActiveFeature(index);
                  setIsPlaying(false);
                }}
                sx={{
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeFeature === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
                  background: `linear-gradient(145deg, ${alpha('#1e293b', 0.8)} 0%, ${alpha('#0f172a', 0.9)} 100%)`,
                  border: `1px solid ${activeFeature === index ? alpha(feature.color, 0.4) : alpha('#fff', 0.1)}`,
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    border: `1px solid ${alpha(feature.color, 0.3)}`,
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${alpha(feature.color, 0.2)}`
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 2,
                      bgcolor: alpha(feature.color, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${alpha(feature.color, 0.2)}`,
                      flexShrink: 0
                    }}>
                      <Box sx={{ color: feature.color, fontSize: 28 }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ 
                        color: 'white', 
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: '1rem'
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography sx={{ 
                        color: 'grey.400',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                {/* Active indicator */}
                {activeFeature === index && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${feature.color} 0%, ${alpha(feature.color, 0.5)} 100%)`
                  }} />
                )}
              </Card>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: theme.palette.primary.main, 
                color: 'white', 
                px: 6, 
                py: 1.5, 
                fontSize: '1.1rem', 
                fontWeight: 600, 
                borderRadius: 3,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': { 
                  bgcolor: theme.palette.primary.dark,
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.6)}`,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Monitoring
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: alpha('#fff', 0.3),
                color: 'white',
                px: 6, 
                py: 1.5, 
                fontSize: '1.1rem', 
                fontWeight: 600,
                borderRadius: 3,
                '&:hover': { 
                  bgcolor: alpha('#fff', 0.1),
                  borderColor: 'white',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              View Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}