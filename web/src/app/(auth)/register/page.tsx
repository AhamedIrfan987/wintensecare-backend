"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api/api";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";


export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      // ✅ register success → login
      router.replace("/login");
    } catch  {
      // ✅ already registered / validation error → login
      router.replace("/login");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("/images/hero-back.jpg")`,
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 420 }}>
        <form onSubmit={submit}>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Create Account
            </Typography>

            <TextField
              label="Email or Phone"
              value={form.identifier}
              onChange={(e) =>
                setForm({ ...form, identifier: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              fullWidth
              required
            />

            <TextField
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            >
              Register
            </Button>

            <Button
              variant="text"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}