import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { readCollection, writeCollection, findOne } from "../storage/db";

interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  fullName?: string;
  householdSize?: number;
  dietaryPreferences?: string;
  location?: string;
  monthlyBudget?: number;
}

function isStrongPassword(pw: string) {
  return (
    typeof pw === "string" &&
    pw.length >= 8 &&
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw)
  );
}

function signToken(user: UserRecord) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign({ id: user.id, email: user.email, fullName: user.fullName }, secret, {
    expiresIn: "7d",
  });
}

export const handleRegister: RequestHandler = (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      householdSize,
      dietaryPreferences,
      location,
      monthlyBudget,
    } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({ error: "Please make a stronger password (min 8, mixed case, number, symbol)" });
    }

    const existing = findOne<UserRecord>("users", (u) => u.email === email);
    if (existing) {
      return res.status(409).json({ error: "User already exists" });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
    const user: UserRecord = {
      id,
      email,
      passwordHash,
      fullName,
      householdSize: householdSize ? Number(householdSize) : undefined,
      dietaryPreferences,
      location,
      monthlyBudget: monthlyBudget ? Number(monthlyBudget) : undefined,
    };
    const users = readCollection<UserRecord[]>("users");
    users.push(user);
    writeCollection("users", users);

    const token = signToken(user);
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        householdSize: user.householdSize,
        dietaryPreferences: user.dietaryPreferences,
        location: user.location,
        monthlyBudget: user.monthlyBudget,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = findOne<UserRecord>("users", (u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const ok = bcrypt.compareSync(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = signToken(user);
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const handleGetProfile: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error extended in middleware
    const userId = req.user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const user = findOne<UserRecord>("users", (u) => u.id === userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        householdSize: user.householdSize,
        dietaryPreferences: user.dietaryPreferences,
        location: user.location,
        monthlyBudget: user.monthlyBudget,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const handleUpdateProfile: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error extended in middleware
    const userId = req.user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const users = readCollection<UserRecord[]>("users");
    const idx = users.findIndex((u) => u.id === userId);
    if (idx < 0) return res.status(404).json({ error: "User not found" });

    const {
      fullName,
      householdSize,
      dietaryPreferences,
      location,
      monthlyBudget,
    } = req.body || {};

    users[idx] = {
      ...users[idx],
      fullName: fullName ?? users[idx].fullName,
      householdSize: householdSize != null ? Number(householdSize) : users[idx].householdSize,
      dietaryPreferences: dietaryPreferences ?? users[idx].dietaryPreferences,
      location: location ?? users[idx].location,
      monthlyBudget: monthlyBudget != null ? Number(monthlyBudget) : users[idx].monthlyBudget,
    };
    writeCollection("users", users);
    const user = users[idx];
    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        householdSize: user.householdSize,
        dietaryPreferences: user.dietaryPreferences,
        location: user.location,
        monthlyBudget: user.monthlyBudget,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const handleLogout: RequestHandler = (_req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
};