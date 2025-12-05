// src/services/userService.js
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { createUserSchema, updateUserSchema } from "../validations/userValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

// ========================================================
// 🔹 GET ALL USERS
// ========================================================
export const getAllUser = async () => {
  const [users] = await pool.query(
    `SELECT 
      id, fullname, username, email, role, 
      address, phone_number, age 
     FROM users`
  );

  return users;
};

// ========================================================
// 🔹 GET USER BY ID
// ========================================================
export const getUserById = async (id) => {
  const [users] = await pool.query(
    `SELECT 
      id, fullname, username, email, role,
      address, phone_number, age
     FROM users WHERE id=?`,
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

// ========================================================
// 🔹 ADD NEW USER
// ========================================================
export const addUser = async (request) => {
  const validated = validate(createUserSchema, request);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO users 
      (fullname, username, email, password, role, address, phone_number, age)
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );

  return {
    id: result.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};

// ========================================================
// 🔹 UPDATE USER
// ========================================================
export const updateUser = async (id, request) => {
  const validated = validate(updateUserSchema, request);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `UPDATE users 
     SET fullname=?, username=?, email=?, password=?, role=?, 
         address=?, phone_number=?, age=? 
     WHERE id=?`,
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  const [updatedUser] = await pool.query(
    `SELECT 
      id, fullname, username, email, role,
      address, phone_number, age
     FROM users WHERE id=?`,
    [id]
  );

  return updatedUser[0];
};

// ========================================================
// 🔹 DELETE USER
// ========================================================
export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id=?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "User not found");
  }

  return { message: "User deleted successfully" };
};
