"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Protected from "@/lib/api/protected";
import { api } from "@/lib/api/api";
import { clearToken } from "@/lib/api/auth";
import { User as UserIcon, Watch } from "lucide-react";

/* ================= TYPES ================= */

type User = {
  id?: string;
  email?: string;
  phone?: string;
  profileImage?: string;
};

type Device = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

type TelemetryItem = {
  id: string;
  deviceId: string;
  heartRate: number;
  steps: number;
  battery: number;
  createdAt: string;
};

type LatestTelemetry = {
  deviceId: string;
  heartRate: number;
  steps: number;
  battery: number;
  createdAt: string;
};

type Alert = {
  id: string;
  deviceId: string;
  metric: string;
  value: number;
  severity: "CRITICAL" | "WARNING";
  acknowledged: boolean;
  createdAt: string;
};

/* ================= PAGE ================= */

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [device, setDevice] = useState<Device | null>(null);
  const [latestTelemetry, setLatestTelemetry] =
    useState<LatestTelemetry | null>(null);
  const [dailySteps, setDailySteps] = useState<number | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<"user" | "device">("user");

  /* ================= TIME ================= */

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const t = setInterval(
      () => setCurrentTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(t);
  }, []);

  const telemetryTime = latestTelemetry?.createdAt
    ? new Date(latestTelemetry.createdAt).toLocaleTimeString()
    : "--";

  const currentDate = new Date().toLocaleDateString();

  const telemetryDate = latestTelemetry?.createdAt
    ? new Date(latestTelemetry.createdAt).toLocaleDateString()
    : "--";

  /* ================= INIT ================= */

  useEffect(() => {
    async function init() {
      try {
        const me = await api<User>("/users/me");
        setUser(me);

        const devices = await api<Device[]>("/devices");

        let did = localStorage.getItem("deviceId");
        if (!did) {
          if (!devices.length) throw new Error("No device found");
          did = devices[0].id;
          localStorage.setItem("deviceId", did);
        }

        const selected = devices.find((d) => d.id === did) || null;
        setDevice(selected);

        const history = await api<TelemetryItem[]>(
          `/telemetry?deviceId=${did}`
        );
        setLatestTelemetry(history.at(-1) ?? null);

        const stepsRes = await api<{ summary: { steps: number } }>(
          `/telemetry/history?deviceId=${did}&range=1d`
        );
        setDailySteps(stepsRes.summary.steps);

        const alertsRes = await api<Alert[]>("/alerts");
        setAlerts(alertsRes);
      } catch (err) {
        console.error("Dashboard init failed:", err);
        clearToken();
        localStorage.removeItem("deviceId");
        router.replace("/login");
      }
    }

    init();
  }, [router]);

  /* ================= ACTIONS ================= */

  async function acknowledgeAlert(id: string) {
    await api(`/alerts/${id}/ack`, { method: "POST" });
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  }

  async function logout() {
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {}
    clearToken();
    localStorage.removeItem("deviceId");
    router.replace("/login");
  }

  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  /* ================= UI ================= */

  return (
    <Protected>
      <div style={pageStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h2 style={{ color: "#111827", fontWeight: 700 }}>
           🏥 Health Dashboard
           </h2>

          <div style={{ position: "relative" }}>
            <div
              style={avatarCircle}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setMenuView("user");
              }}
            >
              {user?.profileImage ? (
               <img
           src={user.profileImage}
          alt="User profile image"
          title="User profile"
            style={avatarImage}
              />

              ) : (
                <UserIcon size={22} color="#374151" />
              )}
            </div>

            {menuOpen && (
              <div style={menuCard}>
                {menuView === "user" ? (
                  <>
                    <div style={menuHeader}>
                      <div style={bigAvatar}>
                        {user?.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <div style={menuName}>User</div>
                        <div style={menuSub}>{user?.email}</div>
                      </div>
                    </div>

                   <div style={infoRowBig}>
                   <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>
                    User ID
                   </span>
                   <span style={{ fontWeight: 600 }}>
                   {user?.id}
                    </span>
                    </div>


                    <button
                      style={primaryBtn}
                      onClick={() => setMenuView("device")}
                    >
                      View Device →
                    </button>
                  </>
                ) : (
                  <>
                    <div style={menuHeader}>
                      <div style={deviceIcon}>
                        <Watch size={22} />
                      </div>
                      <div>
                        <div style={menuName}>{device?.name}</div>
                        <div style={menuSub}>{device?.type}</div>
                      </div>
                    </div>

                   <div style={infoRowBig}>
                   <span style={{ fontSize: 11, color: "#6b7280", fontWeight: 500 }}>
                    Device ID
                    </span>
                    <span style={{ fontWeight: 600 }}>
                     {device?.id}
                     </span>
                     </div>


                    <button
                      style={secondaryBtn}
                      onClick={() => setMenuView("user")}
                    >
                      ← Back
                    </button>
                  </>
                )}

                <button style={logoutBtnBig} onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* TIME */}
        <div style={timeBox}>
          <div>
            🕒 <b>Current:</b> {currentTime}
            <br />
            📅 {currentDate}
          </div>
          <div>
            📡 <b>Telemetry:</b> {telemetryTime}
            <br />
            📅 {telemetryDate}
          </div>
        </div>

        {/* ALERTS */}
        {activeAlerts.map((a) => (
          <div key={a.id} style={alertCard(a.severity)}>
            <div>
              <b>{a.severity}</b>
              <div style={smallText}>{a.id}</div>
            </div>
            <button
              style={ackButton(a.severity)}
              onClick={() => acknowledgeAlert(a.id)}
            >
              ✔ ACK
            </button>
          </div>
        ))}

        {/* METRICS */}
        <div style={rowStyle}>
          <MetricCard
            title="❤️ Heart Rate"
            value={latestTelemetry?.heartRate}
            unit="bpm"
            bgColor="#e0f2fe"
            onClick={() => router.push("/dashboard/heart-rate")}
          />

          <MetricCard
            title="🚶 Steps"
            value={dailySteps ?? undefined}
            bgColor="#f3e8ff"
            onClick={() => router.push("/dashboard/steps")}
          />

          <MetricCard
            title="🔋 Battery"
            value={latestTelemetry?.battery}
            unit="%"
            bgColor="#f3f4f6"
          />
        </div>
      </div>
    </Protected>
  );
}

/* ================= COMPONENT ================= */

function MetricCard({
  title,
  value,
  unit,
  onClick,
  bgColor,
}: {
  title: string;
  value?: number;
  unit?: string;
  onClick?: () => void;
  bgColor: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        ...metricCard,
        background: bgColor,
        cursor: onClick ? "pointer" : "default", // ✅ HAND CURSOR
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 12px 35px rgba(0,0,0,0.25)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.25)";
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
        {title}
      </div>

      <div style={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
        {value ?? "--"} {unit}
      </div>
    </div>
  );
}


/* ================= STYLES ================= */
const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ffffff",
  padding: 22,
  color: "#111827",   // ✅ FORCE DARK TEXT
};

const headerStyle = { display: "flex", justifyContent: "space-between" };
const rowStyle = { display: "flex", gap: 18, marginTop: 24 };


const metricCard: React.CSSProperties = {
  flex: 1,
  padding: 22,
  borderRadius: 18,
  textAlign: "center",
};

const metricValue = { fontSize: 28, fontWeight: 700 };
const avatarCircle = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#e5e7eb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const avatarImage = { width: "100%", height: "100%", borderRadius: "50%" };

const menuCard: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: 54,
  width: 320,                 // ✅ wider
  background: "#ffffff",
  borderRadius: 16,
  padding: 18,
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  zIndex: 100,
};


const menuHeader = { display: "flex", gap: 12 };
const menuName = { fontWeight: 600 };
const menuSub = { fontSize: 13 };
const bigAvatar = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  background: "#e5e7eb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const deviceIcon = {
  width: 46,
  height: 46,
  borderRadius: 12,
  background: "#1e88e5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const infoRowBig: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  marginBottom: 14,

  background: "#f9fafb",          // light card background
  color: "#111827",
  padding: "14px 16px",            // ✅ MORE PADDING
  borderRadius: 12,                // smoother corners
  border: "1px solid #e5e7eb",

  wordBreak: "break-all",
};

const primaryBtn = { background: "#1e88e5", color: "#fff", padding: 10 };
const secondaryBtn = { background: "#1e88e5", color: "#fff", padding: 10 };
const logoutBtnBig = { background: "#e53935ff", color: "#fff", padding: 10 };
const timeBox: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 8,
  padding: "6px 10px",
  background: "#ffffff",
  borderRadius: 8,
  display: "inline-flex",
  gap: 12,
  fontSize: 12,
  color: "#111827",        // ✅ DARK TEXT
  border: "1px solid #e5e7eb",
};

const alertCard = (severity: "CRITICAL" | "WARNING"): React.CSSProperties => ({
  background: "#ffffff",
  color: "#111827",        // ✅ force dark
  borderLeft: `6px solid ${
    severity === "CRITICAL" ? "#dc2626" : "#f59e0b"
  }`,
  padding: 14,
  borderRadius: 12,
});

const ackButton = (s: "CRITICAL" | "WARNING") => ({
  background: s === "CRITICAL" ? "#dc2626" : "#f59e0b",
  color: "#fff",
  padding: "6px 12px",
});
const smallText = { fontSize: 12, opacity: 0.8 };

