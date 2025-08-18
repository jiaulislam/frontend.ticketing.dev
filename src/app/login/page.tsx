"use client";
import { useState } from "react";
import { Flex, Button, Text, TextField, Heading, Box, Link, Card } from "@radix-ui/themes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
  const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Login failed");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      <Card style={{ minWidth: 350, padding: 32, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", borderRadius: 16 }}>
        <Flex direction="column" gap="4" align="center">
          <Heading size="6" color="ruby">Sign In</Heading>
          <Text color="gray">Welcome back! Please login to your account.</Text>
        </Flex>
        <Box mt="5">
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="3">
              <TextField.Root size="3" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <TextField.Root size="3" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              {error && <Text color="red" size="2">{error}</Text>}
              <Button type="submit" size="3" color="ruby" disabled={loading} style={{ marginTop: 8, fontWeight: 600 }}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Flex>
          </form>
        </Box>
        <Flex mt="4" justify="center">
          <Text size="2">Don't have an account? <Link href="/register" color="ruby">Sign up</Link></Text>
        </Flex>
      </Card>
    </Flex>
  );
}
