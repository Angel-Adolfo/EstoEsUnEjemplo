import { Router } from "express";
import { check } from "express-validator";
import { userDelete, userGet, userPost, userPut } from "./user.controller.js";
import { existEmail, roleValidator, existUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateRoles } from "../middlewares/validate-roles.js";

const router = Router();

router.get("/", userGet);

router.get(
    "/:id", [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], userGet
);

router.post(
    "/",
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required and must be at least 6 characters').isLength({ min: 6 }),
        check('email', 'The email is not valid').isEmail(),
        check('email').custom(existEmail),
        validateFields,
    ],
    userPost
)

router.put(
    "/:id",
    [
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(existUserById),
        validateFields,
    ],
    userPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        validateRoles('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'Id is not valid').isMongoId(),
        check('id').custom(existUserById),
        validateFields,
    ],
    userDelete
);

export default router;

