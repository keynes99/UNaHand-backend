import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

// Route for updating user roles
router.post('/manage-roles', UserController.manageRoles);

// You can add more routes for other user-related actions here, such as updating user profiles, deleting users, etc.

export default router;
