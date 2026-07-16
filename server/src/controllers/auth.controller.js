import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/auth.service.js";

// Register Controller

const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const user = await registerUser({
            fullName,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login Controller

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, accessToken } = await loginUser({
            email,
            password,
        });

        res
            .status(200)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false, // true in production with HTTPS
                sameSite: "lax",
            })
            .json({
                success: true,
                message: "Login Successful",
                data: user,
            })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Logout Controller

const logout = async (req, res) => {
  try {
    await logoutUser();

    res
      .clearCookie("accessToken")
      .status(200)
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {
  register,
  login,
  logout,
};