import jwt from "jsonwebtoken";
import "dotenv/config";
import { users } from "../data/users.js";

const secretKey = process.env.JWT_SECRET_KEY;

export const home = (req, res) => {
  const token = jwt.sign({ user: users[1] }, secretKey);
  res.send(token);
};

/* export const token = (req, res) => {
    try {
        const expire = 10
        const {token} = req.query
    const decoded = jwt.verify(token, secretKey, { exp: `${expire}s`})
    res.status(200).send(decoded);
    } catch (error) {
        res.status(401).json({message: 'Token inválido'});
    }
} */

export const login = (req, res) => {
  try {
    const { email, password } = req.query;
    // Paso 3
    const user = users.find((u) => u.email == email && u.password == password);
    // Paso 4
    if (user) {
      // Paso 5
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 20,
          data: user,
        },
        secretKey
      );
      // Paso 6
      res.send(`
<a href="/Dashboard?token=${token}"> <p> Ir al Dashboard </p> </a>
Bienvenido, ${email}.
<script>
localStorage.setItem('token', JSON.stringify("${token}"))
</script>
`);
    } else {
      // Paso 7
      res.send("Usuario o contraseña incorrecta");
    }
  } catch (error) {
    res.status(401).json({message: 'Token inválido'});
  }
};
