import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[]; // 'customer', 'partner', 'administrator', etc.
  // Other fields like email confirmation tokens, reset tokens, etc.
}

const userSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  roles: [String],
  // Add other fields as needed (e.g., email confirmation token)
});

export default mongoose.model<User>('User', userSchema);
