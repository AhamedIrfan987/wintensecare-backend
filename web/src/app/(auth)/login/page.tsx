"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api/api";
import { saveToken } from "@/lib/api/auth";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

type LoginResponse = {
  accessToken: string;
};

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await api<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      // ✅ store token once
      saveToken(res.accessToken);

      // ✅ ALWAYS go to dashboard
      router.replace("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url("/images/hero-back.jpg")`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 4, width: 420 }}>
        <form onSubmit={submit}>
          <Stack spacing={3}>
            <Typography variant="h5" textAlign="center">
              Login
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

            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>

            <Button variant="text" component={Link} href="/forgot-password">
              Forgot Password?
            </Button>

            <Button variant="text" onClick={() => router.push("/register")}>
              Create an account
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
