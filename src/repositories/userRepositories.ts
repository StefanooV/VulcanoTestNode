import { UserModel } from "@models/Users";
import { IUserRepository, User } from "types/UsersTypes";

export class UserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    try {
      const newUser = new UserModel(data);
      return await newUser.save();
    } catch (error) {
      console.error("Error al crear usuario en el repositorio:", error);
      throw error;
    }
  }

  async find(): Promise<User[]> {
    try {
      return await UserModel.find().exec();
    } catch (error) {
      console.error("Error al obtener usuarios en el repositorio:", error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await UserModel.findById(id).exec();
    } catch (error) {
      console.error(
        `Error al obtener usuario por ID ${id} en el repositorio:`,
        error
      );
      throw error;
    }
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    try {
      return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
    } catch (error) {
      console.error(
        `Error al actualizar usuario con ID ${id} en el repositorio:`,
        error
      );
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleted = await UserModel.findByIdAndDelete(id).exec();
      return deleted !== null;
    } catch (error) {
      console.error(
        `Error al eliminar usuario con ID ${id} en el repositorio:`,
        error
      );
      throw error;
    }
  }
}
