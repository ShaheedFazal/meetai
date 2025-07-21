"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth.client";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully");
        },
      }
    );
  };
  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went wrong");
        },
        onSuccess: () => {
          window.alert("User logged in successfully");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="text-2xl font-bold">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
    </div>
  );
}
