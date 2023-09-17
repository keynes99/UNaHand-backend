import { Request, Response } from 'express';
import User from '@/models/User';
import { authConfig } from '@/config';


// Define roles (you can customize these)
enum UserRole {
  Customer = 'customer',
  Partner = 'partner',
  Administrator = 'administrator',
}

// Assign a role to a user based on specific criteria (e.g., email domain)
const assignRole = (email: string): UserRole => {
  if (email.endsWith('@example.com')) {
    return UserRole.Administrator;
  } else if (email.endsWith('@partnercompany.com')) {
    return UserRole.Partner;
  } else {
    return UserRole.Customer;
  }
};

// Controller for managing user roles
export const manageRoles = async (req: Request, res: Response) => {
  const { userId, email } = req.body;

  try {
    // Retrieve the user by userId or email (adjust as needed)
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assign a role based on the user's email
    const role = assignRole(email);

    // Update the user's role
    user.roles = [role];

    // Save the updated user
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
