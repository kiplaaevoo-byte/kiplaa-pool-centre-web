import bcrypt from "bcryptjs";
import supabase from "../config/supabase.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {

    const {
      full_name,
      phone,
      email,
      password
    } = req.body;

    if (!full_name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields are required"
      });
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          full_name,
          phone,
          email,
          password: hashedPassword
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    const token = generateToken(data.id);

    return res.status(201).json({
      success: true,
      token,
      user: data
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const loginUser = async (req, res) => {
  try {

    const { phone, password } = req.body;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};