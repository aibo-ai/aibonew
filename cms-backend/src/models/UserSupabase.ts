import bcrypt from 'bcryptjs';
import { SupabaseDatabase, DatabaseUser } from '../config/supabase-db';

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor';
  avatar?: string;
  bio?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: 'admin' | 'editor';
  public avatar?: string;
  public bio?: string;
  public isActive!: boolean;
  public lastLoginAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(data: DatabaseUser) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.role = data.role;
    this.avatar = data.avatar || undefined;
    this.bio = data.bio || undefined;
    this.isActive = data.is_active;
    this.lastLoginAt = data.last_login_at ? new Date(data.last_login_at) : undefined;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  // Static methods
  static async findOne(options: { where: { email: string } }): Promise<User | null> {
    try {
      const user = await SupabaseDatabase.getUserByEmail(options.where.email);
      return user ? new User(user) : null;
    } catch (error) {
      return null;
    }
  }

  static async findByPk(id: string): Promise<User | null> {
    try {
      const user = await SupabaseDatabase.getUserById(id);
      return user ? new User(user) : null;
    } catch (error) {
      return null;
    }
  }

  static async create(data: UserCreationAttributes): Promise<User> {
    try {
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const userData = {
        email: data.email,
        password: hashedPassword,
        first_name: data.firstName,
        last_name: data.lastName,
        role: data.role,
        avatar: data.avatar,
        bio: data.bio,
        is_active: data.isActive,
        last_login_at: data.lastLoginAt?.toISOString(),
      };

      const user = await SupabaseDatabase.createUser(userData);
      return new User(user);
    } catch (error) {
      throw error;
    }
  }

  // Instance methods
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public async save(): Promise<User> {
    try {
      const updateData = {
        first_name: this.firstName,
        last_name: this.lastName,
        avatar: this.avatar,
        bio: this.bio,
        is_active: this.isActive,
        last_login_at: this.lastLoginAt?.toISOString(),
      };

      const updatedUser = await SupabaseDatabase.updateUser(this.id, updateData);
      return new User(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  public async update(data: Partial<UserCreationAttributes>): Promise<User> {
    try {
      const updateData: any = {};
      
      if (data.firstName !== undefined) updateData.first_name = data.firstName;
      if (data.lastName !== undefined) updateData.last_name = data.lastName;
      if (data.avatar !== undefined) updateData.avatar = data.avatar;
      if (data.bio !== undefined) updateData.bio = data.bio;
      if (data.isActive !== undefined) updateData.is_active = data.isActive;
      if (data.lastLoginAt !== undefined) updateData.last_login_at = data.lastLoginAt.toISOString();

      // Handle password update
      if (data.password !== undefined) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(data.password, salt);
      }

      const updatedUser = await SupabaseDatabase.updateUser(this.id, updateData);
      return new User(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  public toJSON(): any {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      avatar: this.avatar,
      bio: this.bio,
      isActive: this.isActive,
      lastLoginAt: this.lastLoginAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default User;
