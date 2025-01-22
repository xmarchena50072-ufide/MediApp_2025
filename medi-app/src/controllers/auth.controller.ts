import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import crypto from "crypto";
import { sendEmail } from "../services/email.service";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "El correo ya está en uso" });
            return;
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Crear un token de autenticación
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Contraseña incorrecta" });
            return;
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1d",
        });

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: { id: user._id, username: user.username, email: user.email, role: user.role },
            token,
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = (req as Request & { userId: string }).userId;
        //console.log("ID del usuario recibido:", userId); // Verifica si el ID del usuario llega correctamente

        if (!userId) {
            res.status(400).json({ message: "Usuario no autenticado" });
            return;
        }

        const user = await User.findById(userId, "-password"); // Excluir contraseña
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }

        res.status(200).json({
            message: "Información del usuario obtenida correctamente",
            user,
        });
    } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora
      await user.save();
  
      const subject = 'Restablecimiento de contraseña';
      const text = `Recibió este correo electrónico porque usted (u otra persona) solicitó el restablecimiento de la contraseña de su cuenta.\n\n
                    Haga clic en el siguiente enlace, o péguelo en su navegador para completar el proceso:\n\n
                    ${process.env.FRONTEND_URL}/auth/reset-password/${token}\n\n
                    Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.\n`;
      const html = `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #007bff;">Restablecimiento de Contraseña</h2>
          <p>Has recibido este correo electrónico porque usted (u otra persona) solicitó el restablecimiento de la contraseña de su cuenta.</p>
          <p>Haga clic en el siguiente enlace, o péguelo en su navegador para completar el proceso:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEND_URL}/auth/reset-password/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
          </div>
          <p>Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.</p>
          <p>El token tiene una validez hasta de 1 hora para realizar los cambios.</p>
        </div>
      `;
  
      await sendEmail(user.email, subject, text, html);
  
      res.status(200).json({ message: "Correo de restablecimiento de contraseña enviado" });
    } catch (error) {
      res.status(500).json({ message: "Error al enviar el correo de restablecimiento de contraseña" });
    }
  };
  
  export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        res.status(400).json({ message: "El token de restablecimiento de contraseña es no válido o ha expirado" });
        return;
      }
  
      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al restablecer la contraseña" });
    }
  };

