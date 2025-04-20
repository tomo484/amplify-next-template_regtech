"use client"

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";

// Amplify設定を行う
try {
  Amplify.configure(outputs);
} catch (error) {
  console.error("Error configuring Amplify:", error);
}

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator loginMechanisms={['email']}>
      {children}
    </Authenticator>
  );
}
