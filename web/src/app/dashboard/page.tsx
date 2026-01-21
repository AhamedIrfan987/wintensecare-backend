"use client";

import React from "react";
import Protected from "@/lib/api/protected";
import { useDashboard } from "@/hooks/useDashboard";
import { MetricValue } from "@/app/components/MetricValue";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ranges as rangeOptionssteps } from "@/types/steps";
import { useSteps } from "@/hooks/useSteps";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Box,
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Stack,
  Alert,
  Paper,
  Tooltip,
  ToggleButtonGroup,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  Fade,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import SpeedIcon from "@mui/icons-material/Speed";
import RefreshIcon from "@mui/icons-material/Refresh";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useRouter } from "next/navigation";
import { MuiMetricCard } from "../components/MuiMetricCard";
import { ranges as rangeOptions } from "@/types/heart";
import { useHeartRate } from "@/hooks/useHeartRate";

import HeartChart from "@/app/components/HeartChart";
import StepsDial from "@/app/components/StepsDial";
import StepsChart from "@/app/components/StepsChart";
import { groupStepsByHour } from "@/lib/utils/stepsUtils";
import {

  ToggleButton,

} from "@mui/material";
import SpO2Chart from "@/app/components/SpO2Chart";
import { useSpO2 } from "@/hooks/useSpo2";


export default function DashboardPage() {
  const { range, setRange, data, latest, criticalAlertTimes, alerts } = useHeartRate("1h");
  const loadingHeart = !data;
const {
  rangeSpO2,
  setRangeSpO2,
  pointsspo2,
  loading,
} = useSpO2("1h");

const latestSpO2 = pointsspo2.at(-1);

const currentSpO2 = latestSpO2?.avg ?? null;

const spo2StatusText =
  currentSpO2 === null
    ? "Collecting data"
    : currentSpO2 >= 95
    ? "Normal oxygen level"
    : currentSpO2 >= 90
    ? "Slightly low oxygen level"
    : "Low oxygen level – monitor closely";

const spo2StatusColor =
  currentSpO2 === null
    ? "text.secondary"
    : currentSpO2 >= 95
    ? "success.main"
    : currentSpO2 >= 90
    ? "warning.main"
    : "error.main";


<SpO2Chart
  pointsspo2={pointsspo2}
  loading={loading}
  range={rangeSpO2}
  showMin={rangeSpO2 !== "30m"}
/>



  const { rangestep, setRangestep, points, totalSteps, loading: loadingSteps, startTime, endTime } =
    useSteps("1h");

  const hourlyData = groupStepsByHour(points);
  const maxHourly = Math.max(...hourlyData.map((d) => d.steps), 10);

  const router = useRouter();
  const {
    user,
    device,
    latestTelemetry,
    dailySteps,
    avgHeartRate1h,
    currentECG,
    latestECGTime,
    currentTime,
    currentDate,
    unifiedMeasurementTime,
    vitalAlerts,
    acknowledgeAlert,
    logout,
    refreshLiveData,
    setDevice,
  } = useDashboard();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRefresh = async () => {
    if (device?.id) {
      await refreshLiveData(device.id);
    }
  };

  const getHeartRateStatus = (rate?: number) => {
    if (!rate) return "default";
    if (rate >= 100) return "error";
    if (rate >= 90) return "warning";
    if (rate >= 60 && rate <= 89) return "success";
    return "info";
  };

  return (
    <Protected>
      {/* Enhanced AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
        }}
      >
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          gap: 2,
          py: isMobile ? 1 : 2 
        }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                width: isMobile ? 32 : 40,
                height: isMobile ? 32 : 40,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
                fontWeight: 900,
                fontSize: isMobile ? 14 : 18,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
              }}
            >
              HS
            </Box>

            <Box>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                sx={{ 
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-0.02em"
                }}
              >
                Wintensecare
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: alpha(theme.palette.common.white, 0.8),
                  display: { xs: "none", sm: "block" }
                }}
              >
                Real-time Monitoring • Professional Analytics
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Refresh data">
              <IconButton 
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  color: "white",
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) }
                }}
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Alerts">
              <IconButton 
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  color: "white",
                  bgcolor: alpha(theme.palette.common.white, 0.1),
                  "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.2) }
                }}
              >
                <Badge 
                  badgeContent={vitalAlerts.length} 
                  color="error"
                  max={99}
                >
                  <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
                </Badge>
              </IconButton>
            </Tooltip>

            <IconButton 
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                p: 0.5,
                border: `2px solid ${alpha(theme.palette.common.white, 0.3)}`,
              }}
            >
              <Avatar 
                src={user?.profileImage ?? undefined}
                sx={{ 
                  width: isMobile ? 32 : 36,
                  height: isMobile ? 32 : 36,
                  fontSize: isMobile ? 14 : 16 
                }}
              >
                {user?.email?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu 
              anchorEl={anchorEl} 
              open={open} 
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }
              }}
            >
              <MenuItem onClick={() => { setAnchorEl(null); router.push("/profile"); }}>
                👤 Profile
              </MenuItem>
              <MenuItem onClick={() => { setAnchorEl(null); setDevice(null); router.push("/devices"); }}>
                📱 Devices
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={() => { setAnchorEl(null); logout(); }}
                sx={{ color: theme.palette.error.main }}
              >
                🚪 Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 3 }}>
        {/* Header Cards - Responsive Stack */}
        <Stack 
          direction={isMobile ? "column" : "row"} 
          spacing={2} 
          sx={{ mb: 3 }}
        >
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: isMobile ? 1.5 : 2,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              minWidth: isMobile ? "auto" : 280,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <ScheduleIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 20 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                SYSTEM TIME
              </Typography>
            </Stack>
            <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 700 }}>
              {currentTime}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarTodayIcon sx={{ fontSize: 12 }} />
              {currentDate}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              flex: 1,
              p: isMobile ? 1.5 : 2,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
              minWidth: isMobile ? "auto" : 320,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <TrendingUpIcon sx={{ color: theme.palette.secondary.main, fontSize: isMobile ? 16 : 20 }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                LATEST MEASUREMENT
              </Typography>
            </Stack>
            <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 700 }}>
              {unifiedMeasurementTime
                ? unifiedMeasurementTime.toLocaleTimeString("en-GB", { hour12: false })
                : "--:--:--"}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {unifiedMeasurementTime ? unifiedMeasurementTime.toLocaleDateString() : "No data"}
            </Typography>
          </Paper>
        </Stack>

        {/* Alerts Section */}
        {vitalAlerts.length > 0 && (
          <Fade in={vitalAlerts.length > 0}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              {vitalAlerts.map((a) => (
                <Alert
                  key={a.id}
                  severity={a.severity === "CRITICAL" ? "error" : "warning"}
                  icon={false}
                  sx={{
                    borderRadius: 2,
                    borderLeft: `4px solid ${
                      a.severity === "CRITICAL" 
                      ? theme.palette.error.main 
                      : theme.palette.warning.main
                    }`,
                    alignItems: "flex-start",
                    py: isMobile ? 1.5 : 2,
                  }}
                  action={
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ 
                        minWidth: 60,
                        fontSize: isMobile ? 12 : 14 
                      }}
                      onClick={() => acknowledgeAlert(a.id)}
                    >
                      Acknowledge
                    </Button>
                  }
                >
                  <Stack spacing={0.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {a.metric === "HEART_RATE" ? "❤️ Heart Rate Alert" : "🔋 Battery Alert"}
                      <Chip 
                        label={a.severity} 
                        size="small" 
                        color={a.severity === "CRITICAL" ? "error" : "warning"}
                        sx={{ ml: 1, height: 20, fontSize: 10 }}
                      />
                    </Typography>
                    <Typography variant="body2">
                      {a.metric === "HEART_RATE" 
                        ? `Heart rate recorded at ${a.value} bpm`
                        : `Battery level at ${a.value}%`
                      }
                    </Typography>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      {new Date(a.createdAt).toLocaleString()}
                    </Typography>
                  </Stack>
                </Alert>
              ))}
            </Stack>
          </Fade>
        )}

        {/* Main Metrics Grid - Improved Responsiveness */}
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <MuiMetricCard
              title="Heart Rate"
              icon={<FavoriteIcon />}
              iconColor="#e53935"
              accent="#ffeef0"
              loading={loadingHeart}
              sx={{ height: "100%" }}
            >
              <MetricValue
                value={`${latestTelemetry?.heartRate ?? "--"}`}
                unit="bpm"
                label="Current Rate"
                sub={`Avg (1h): ${avgHeartRate1h ?? "--"} bpm`}
                size={isMobile ? "medium" : "large"}
              />
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={getHeartRateStatus(latestTelemetry?.heartRate) === "success" ? "Normal" : "Monitor"}
                  size="small"
                  color={getHeartRateStatus(latestTelemetry?.heartRate)}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </MuiMetricCard>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <MuiMetricCard
              title="Steps"
              icon={<DirectionsRunIcon />}
              iconColor="#6a1b9a"
              accent="#f4ecff"
              loading={loadingSteps}
              sx={{ height: "100%" }}
            >
              <MetricValue
                value={dailySteps ?? "--"}
                unit="steps"
                label="Today's Activity"
                size={isMobile ? "medium" : "large"}
              />
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={totalSteps > 5000 ? "Active" : "Moderate"}
                  size="small"
                  color={totalSteps > 5000 ? "success" : "info"}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </MuiMetricCard>
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <MuiMetricCard
              title="Battery"
              icon={<BatteryStdIcon />}
              iconColor="#374151"
              accent="#f3f4f6"
              sx={{ height: "100%" }}
            >
              <MetricValue
                value={`${latestTelemetry?.battery ?? "--"}`}
                unit="%"
                label="Device Battery"
                size={isMobile ? "medium" : "large"}
              />
              <Box sx={{ mt: 1 }}>
                <Chip 
                  label={(latestTelemetry?.battery || 0) > 20 ? "Good" : "Low"}
                  size="small"
                  color={(latestTelemetry?.battery || 0) > 20 ? "success" : "warning"}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </MuiMetricCard>
          </Grid>

         <Grid item xs={12} sm={6} lg={3}>
  <MuiMetricCard
    title="ECG"
    icon={<FavoriteIcon />}
    iconColor="#ff7043"
    accent="#fff3e0"
    onClick={() => router.push("/dashboard/ecg")}
    sx={{ height: "100%" }}
  >
    <Box sx={{ textAlign: "center", py: 1 }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          fontWeight: 800,
          color: theme.palette.primary.dark,
          mb: 0.5,
        }}
      >
        ECG
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
      >
        Single-lead ECG (Lead I)
      </Typography>

      {latestECGTime ? (
        <Typography variant="caption" color="text.secondary">
          {new Date(latestECGTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      ) : (
        <Typography variant="caption" color="text.secondary">
          No ECG recorded
        </Typography>
      )}
    </Box>
  </MuiMetricCard>
</Grid>

        </Grid>

        {/* Heart Rate Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            borderRadius: 3,
            mb: 4,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: theme.palette.background.paper,
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.error.light} 0%, ${theme.palette.error.main} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}>
                  <FavoriteIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                    Heart Rate Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time monitoring and historical trends
                  </Typography>
                </Box>
                {alerts?.filter((a) => a.severity === "CRITICAL").length > 0 && (
                  <Badge
                    color="error"
                     badgeContent={vitalAlerts.length}
                    sx={{ ml: 1 }}
                  >
                    <WarningAmberIcon color="action" />
                  </Badge>
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: { xs: "flex-start", md: "flex-end" },
                flexWrap: "wrap",
                gap: 1 
              }}>
                <ToggleButtonGroup
                  value={range}
                  exclusive
                  onChange={(e, v) => v && setRange(v)}
                  size={isMobile ? "small" : "medium"}
                  aria-label="time range"
                  sx={{
                    "& .MuiToggleButton-root": {
                      px: isMobile ? 1.5 : 2,
                      py: 0.5,
                      borderRadius: 2,
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      "&.Mui-selected": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: "white",
                      }
                    }
                  }}
                >
                  {rangeOptions.map((r) => (
                    <Button 
                      key={r.value} 
                      size="small" 
                      onClick={() => setRange(r.value)}
                      sx={{ 
                        px: isMobile ? 1 : 1.5,
                        fontSize: isMobile ? 12 : 14 
                      }}
                    >
                      {r.label}
                    </Button>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                {loadingHeart ? (
                  [0, 1, 2].map((i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          height: "100%",
                          borderRadius: 2,
                          background: alpha(theme.palette.background.default, 0.5)
                        }}
                      >
                        <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <CircularProgress size={24} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">Loading...</Typography>
                            <Typography variant="h6">--</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <>
                    {[
                      { label: "Minimum", value: data!.summary.minHeartRate, color: "info" },
                      { label: "Average", value: data!.summary.avgHeartRate, color: "success" },
                      { label: "Maximum", value: data!.summary.maxHeartRate, color: "error" },
                    ].map((item, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            height: "100%",
                            borderRadius: 2,
                            borderLeft: `4px solid ${theme.palette[item.color].main}`,
                            transition: "transform 0.2s",
                            "&:hover": { transform: "translateY(-2px)" }
                          }}
                        >
                          <CardContent sx={{ p: 2.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                              {item.label}
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette[item.color].dark }}>
                              {item.value}
                              <Typography component="span" variant="body2" sx={{ color: "text.secondary", ml: 0.5 }}>
                                bpm
                              </Typography>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: "100%",
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 600 }}>
                      <AccessTimeIcon sx={{ fontSize: 16 }} /> Last Measurement
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
                      {latest ? new Date(latest.ts).toLocaleTimeString("en-GB", { hour12: false }) : "--:--:--"}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Chip
                      label={latest ? `${latest.heartRate} bpm` : "--"}
                      color={getHeartRateStatus(latest?.heartRate)}
                      icon={<FavoriteIcon />}
                      sx={{ 
                        fontWeight: 700, 
                        py: 1.5, 
                        px: 2, 
                        fontSize: isMobile ? 14 : 16,
                        height: "auto",
                        borderRadius: 2,
                        width: "100%",
                        justifyContent: "center"
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.secondary }}>
              Heart Rate Over Time
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: { xs: 1, sm: 2, md: 3 }, 
                borderRadius: 2,
                background: theme.palette.background.default,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                minHeight: 300
              }}
            >
              {loadingHeart ? (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ height: { xs: 250, sm: 300, md: 350 } }}>
                  <HeartChart 
                    points={data?.points || []} 
                    summary={data?.summary} 
                    range={range} 
                    criticalAlertTimes={criticalAlertTimes} 
                  />
                </Box>
              )}
            </Paper>
          </Box>
        </Paper>

        {/* Steps Section */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: theme.palette.background.paper,
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}>
                  <DirectionsWalkIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                    Activity Monitoring
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Daily steps and hourly distribution
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: { xs: "flex-start", md: "flex-end" },
                flexWrap: "wrap",
                gap: 1 
              }}>
                <ToggleButtonGroup
                  value={rangestep}
                  exclusive
                  onChange={(_, v) => v && setRangestep(v)}
                  size={isMobile ? "small" : "medium"}
                  aria-label="time range"
                  sx={{
                    "& .MuiToggleButton-root": {
                      px: isMobile ? 1.5 : 2,
                      py: 0.5,
                      borderRadius: 2,
                      borderColor: alpha(theme.palette.success.main, 0.2),
                      "&.Mui-selected": {
                        background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                        color: "white",
                      }
                    }
                  }}
                >
                  {rangeOptionssteps.map((r) => (
                    <Button 
                      key={r.value} 
                      size="small" 
                      onClick={() => setRangestep(r.value)}
                      sx={{ 
                        px: isMobile ? 1 : 1.5,
                        fontSize: isMobile ? 12 : 14 
                      }}
                    >
                      {r.label}
                    </Button>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                display: "flex", 
                justifyContent: "center",
                height: "100%",
                minHeight: 300 
              }}>
                <StepsDial 
                  totalSteps={totalSteps} 
                  startTime={startTime} 
                  endTime={endTime}
                  size={isMobile ? 200 : 250}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box sx={{ 
                height: { xs: 250, sm: 300 },
                width: "100%" 
              }}>
                <StepsChart 
                  hourlyData={hourlyData} 
                  maxHourly={maxHourly} 
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ 
            mt: 3, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1 
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 14 }} /> Auto-updates every 5 seconds
            </Typography>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleRefresh}
              startIcon={<RefreshIcon />}
            >
              Refresh Now
            </Button>
          </Box>
        </Paper>

 <Paper
  elevation={0}
  sx={{
    p: 3,
    borderRadius: 3,
    mt: 4,
    border: "1px solid",
    borderColor: "divider",
    background: "background.paper",
  }}
>
  {/* HEADER */}
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mb={2}
  >
    <Box>
      <Typography fontWeight={700}>
        Oxygen Saturation (SpO₂)
      </Typography>
      <Typography fontSize={12} color="text.secondary">
        Blood oxygen level over time
      </Typography>
    </Box>

    <ToggleButtonGroup
      size="small"
      exclusive
      value={rangeSpO2}
      onChange={(_, v) => v && setRangeSpO2(v)}
    >
      {["30m", "1h", "8h", "1d", "7d"].map((r) => (
        <ToggleButton key={r} value={r}>
          {r}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  </Stack>

  {/* CURRENT VALUE */}
  <Stack spacing={0.5} mb={2}>
    <Typography fontSize={14} fontWeight={600}>
      Current SpO₂:{" "}
      {currentSpO2 !== null ? `${currentSpO2}%` : "--"}
    </Typography>

    <Typography fontSize={13} color={spo2StatusColor}>
      {spo2StatusText}
    </Typography>
  </Stack>

  {/* CHART */}
  <Box sx={{ height: 280 }}>
    <SpO2Chart
      pointsspo2={pointsspo2}
      loading={loading}
      range={rangeSpO2}
      showMin={rangeSpO2 !== "30m"}
    />
  </Box>
</Paper>


      </Container>
    </Protected>
  );
}