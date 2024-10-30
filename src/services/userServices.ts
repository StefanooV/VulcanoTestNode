import { IUserRepository, IUserService, User } from "types/UsersTypes";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: User): Promise<User> {
    try {
      return await this.userRepository.create(user);
    } catch (err) {
      console.error("Error creando usuario", err);
      throw new Error("Error creando el usuario");
    }
  }

  async findUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      console.error("Error obteniendo usuarios", err);
      throw new Error("Error buscando la lista de usuarios");
    }
  }

  async findUsersById(id: string): Promise<User | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (err) {
      console.error( `Error buscando el usuario con ID:  ${id}`, err);
      throw new Error("Error buscando el usuario por ID");
    }
  }
  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    try {
      return await this.userRepository.update(id, user);
    } catch (err) {
      console.error( `Error actualizando el usuario con ID:  ${id}`, err);
      throw new Error("Error al actualizar usuario");
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      return await this.userRepository.delete(id);
    } catch (err) {
      console.error( `Error eliminando el usuario con ID:  ${id}`, err);
      throw new Error("Error al eliminar el usuario");
    }
  }
}
