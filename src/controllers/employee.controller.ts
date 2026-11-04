
import { type Request, type Response } from "express";
import { createEmployeeService, getEmployeesService } from './../service/employee.service';

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, contact, address, isActive } = req.body;

    console.log(req.body, "req.body 12");

    if (!name || !contact || !address) {
      res.status(400).json({
        message: "Name, contact and address are required",
      });
      return;
    }

    if (
      isActive !== undefined &&
      typeof isActive !== "boolean"
    ) {
      res.status(400).json({
        message: "isActive must be a boolean",
      });
      return;
    }

    const employee = await createEmployeeService({
      name,
      contact,
      address,
      isActive: isActive ?? true,
    });

    res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = (req.query.search as string) || "";

    const isActive =
      req.query.isActive !== undefined
        ? req.query.isActive as string
        : undefined;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (isActive !== undefined && !["true", "false"].includes(isActive)) {
      res.status(400).json({
        message: "isActive must be true or false",
      });
      return;
    }

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      res.status(400).json({
        message: "Invalid page or limit. Page must be >= 1 and limit must be between 1 and 100",
      });
      return;
    }

    const result = await getEmployeesService({
      search,
      isActive,
      page,
      limit,
    });

    res.status(200).json({
      message: "Employees fetched successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};