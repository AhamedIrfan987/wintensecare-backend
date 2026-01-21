import React from "react";
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Chip,
  Stack,
  LinearProgress,
  
  useTheme,
  alpha,
  useMediaQuery
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { stepsToDistanceKm, stepsToCalories } from "@/lib/utils/stepsUtils";

interface StepsDialProps {
  totalSteps: number;
  maxSteps?: number;
  startTime: string;
  endTime: string;
  size?: number;
}

export default function StepsDial({
  totalSteps,
  maxSteps = 12000,
  startTime,
  endTime,
  size = 200,
}: StepsDialProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const progress = Math.min(totalSteps / maxSteps, 1);
  const pct = Math.round(progress * 100);
  const remainingSteps = Math.max(maxSteps - totalSteps, 0);

  const distance = stepsToDistanceKm(totalSteps);
  const calories = stepsToCalories(totalSteps);
  
  // Calculate pace (steps per hour)
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);
  const hoursActive = Math.max(endHour - startHour, 1);
  const pace = Math.round(totalSteps / hoursActive);

  // Visual circular SVG values
  const stroke = Math.max(size / 12, 8);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  // Determine status color
  const getStatusColor = () => {
    if (progress >= 1) return 'success';
    if (progress >= 0.75) return 'info';
    if (progress >= 0.5) return 'primary';
    if (progress >= 0.25) return 'warning';
    return 'error';
  };

  const statusColor = getStatusColor();

  return (
    <Card 
      elevation={0}
      sx={{ 
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: theme.palette.background.paper,
        height: '100%',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
          {/* Circular Progress */}
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box 
              sx={{ 
                position: 'relative', 
                width: isMobile ? 150 : size, 
                height: isMobile ? 150 : size,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              <svg width={isMobile ? 150 : size} height={isMobile ? 150 : size}>
                <defs>
                  <linearGradient id="stepsGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={theme.palette.primary.main} floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Background circle */}
                <circle 
                  cx={size / 2} 
                  cy={size / 2} 
                  r={radius} 
                  stroke={alpha(theme.palette.divider, 0.2)} 
                  strokeWidth={stroke} 
                  fill="none" 
                />
                
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="url(#stepsGradient)"
                  strokeWidth={stroke}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  filter="url(#shadow)"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>

              <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                <Typography 
                  variant={isMobile ? "h4" : "h3"} 
                  sx={{ 
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.success.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {totalSteps.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  STEPS
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    color: theme.palette[statusColor].main,
                    fontWeight: 600,
                    mt: 0.5
                  }}
                >
                  {pct}% Complete
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Stats and Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Daily Activity Progress
            </Typography>
            
            {/* Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {totalSteps.toLocaleString()} / {maxSteps.toLocaleString()} steps
                </Typography>
              </Stack>
              <LinearProgress 
                variant="determinate" 
                value={pct} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.divider, 0.2),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.success.main} 100%)`,
                  }
                }}
              />
            </Box>

            {/* Stats Grid */}
            <GridContainer>
              <StatItem
                icon={<DirectionsWalkIcon />}
                label="Distance"
                value={`${distance} km`}
                color={theme.palette.info.main}
              />
              <StatItem
                icon={<WhatshotIcon />}
                label="Calories"
                value={`${calories} kcal`}
                color={theme.palette.error.main}
              />
              <StatItem
                icon={<TrendingUpIcon />}
                label="Pace"
                value={`${pace}/hr`}
                color={theme.palette.warning.main}
              />
              <StatItem
                icon={<FlagIcon />}
                label="Remaining"
                value={`${remainingSteps}`}
                color={theme.palette.text.secondary}
              />
            </GridContainer>

            {/* Time Range */}
            <Box 
              sx={{ 
                mt: 3, 
                p: 1.5, 
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  Monitoring Period
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {startTime} – {endTime}
                </Typography>
              </Stack>
            </Box>

            {/* Goal Status */}
            <Box sx={{ mt: 2 }}>
              <Chip 
                icon={<FlagIcon />}
                label={`Daily Goal: ${maxSteps.toLocaleString()} steps`}
                color={progress >= 1 ? "success" : "primary"}
                variant={progress >= 1 ? "filled" : "outlined"}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              {remainingSteps > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  {remainingSteps} more steps to reach your goal
                </Typography>
              )}
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Helper component for stats grid
const GridContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 1.5,
      mb: 2,
    }}
  >
    {children}
  </Box>
);

// Helper component for stat items
const StatItem = ({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: string;
}) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: 2,
      border: `1px solid ${alpha('#000000', 0.06)}`,
      bgcolor: 'background.default',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-2px)' }
    }}
  >
    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
      <Box sx={{ color }}>{icon}</Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Stack>
    <Typography variant="body1" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);