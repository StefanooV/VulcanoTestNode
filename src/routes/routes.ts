import { UserRepository } from "repositories/userRepositories";
import { UserService } from "@services/userServices";
import { IUserRepository, IUserService, User } from "types/UsersTypes";
import { Request, Response, Router } from "express";
import { body, param, validationResult } from "express-validator";

const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export default () => {
  //Buscar Users
  router.get("/users", async (req: Request, res: Response) => {
    try {
      const users = await userService.findUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  });

  //Buscar por ID
  router.get(
    "/users/:id",
    param("id").isMongoId().withMessage("ID de usuario no válido"),
    async (req: Request, res: Response) => {
      try {
        const user = await userService.findUsersById(req.params.id);
        if (!user) {
          res.status(404).json({ message: "Usuario no encontrado" });
          return;
        }
        res.status(200).json(user);
      } catch (error) {
        console.error(
          `Error obteniendo usuario con ID ${req.params.id}:`,
          error
        );
        res.status(500).json({ message: "Error al obtener usuario por ID" });
      }
    }
  );

  //Crear User
  router.post(
    "/users",
    [
      body("name").notEmpty().withMessage("El nombre es requerido"),
      body("username")
        .notEmpty()
        .withMessage("El nombre de usuario es requerido"),
      body("name").notEmpty().withMessage("El correo electrónico no es válido"),
    ],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      try {
        const newUser: User = req.body;
        const result = await userService.createUser(newUser);
        res.status(201).json(result);
      } catch (error: any) {
        console.error("Error creando usuario:", error);
        res
          .status(400)
          .json({ message: "Error al crear usuario", details: error.message });
      }
    }
  );

  //Actualizar User
  router.put(
    "/users/:id",
    [
      param("id").isMongoId().withMessage("ID de usuario no válido"),
      body("name").optional().notEmpty().withMessage("El nombre es requerido"),
      body("username")
        .optional()
        .notEmpty()
        .withMessage("El nombre de usuario es requerido"),
      body("name")
        .optional()
        .isEmail()
        .withMessage("El correo electrónico no es válido"),
    ],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (!user) {
          res.status(404).json({ message: "Usuario no encontrado" });
          return;
        }
        res.status(200).json(user);
      } catch (error: any) {
        console.error(
          `Error actualizando usuario con ID ${req.params.id}:`,
          error
        );
        res.status(400).json({
          message: "Error al actualizar usuario",
          details: error.message,
        });
      }
    }
  );

  //Borrar User
  router.delete(
    "/users/:id",
    param("id").isMongoId().withMessage("ID de usuario no válido"),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
          res.status(404).json({ message: "Usuario no encontrado" });
          return;
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente!" });
      } catch (error) {
        console.error(
          `Error eliminando usuario con ID ${req.params.id}:`,
          error
        );
        res.status(500).json({ message: "Error al eliminar usuario" });
      }
    }
  );

  return router;
};
