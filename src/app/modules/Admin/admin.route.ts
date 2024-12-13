import express from 'express';
import { AdminControllers } from './admin.controller';
import { validationMiddleware } from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './admin.zod.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validationMiddleware(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
