
import { Router } from "express";
import { createEmployee, getEmployees } from "../controllers/employee.controller";



const router = Router();

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);

export default router;
