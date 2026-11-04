
import pool from "../config/db";
import { Employee, CreateEmployeeDto } from "../types/employee.types";

export const createEmployeeService = async (
  employeeData: CreateEmployeeDto
): Promise<Employee> => {
  const { name, contact, address, isActive } = employeeData;

  const result = await pool.query<Employee>(
    `INSERT INTO employee (name, contact, address, "isActive")
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, contact, address, isActive]
  );

  return result.rows[0];
};

interface GetEmployeesParams {
  search?: string;
  isActive?: string;
  page: number;
  limit: number;
}

interface GetEmployeesResponse {
  data: Employee[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getEmployeesService = async (
  params: GetEmployeesParams
): Promise<GetEmployeesResponse> => {
  const { search, isActive, page, limit } = params;

  const values: (string | boolean | number)[] = [];
  const conditions: string[] = [];

  // Search employee by name
  if (search && search.trim()) {
    values.push(`%${search.trim()}%`);
    conditions.push(`name ILIKE $${values.length}`);
  }

  // Filter by active/inactive status
  if (isActive !== undefined) {
    values.push(isActive === "true");
    conditions.push(`"isActive" = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  // Get total matching records
  const countQuery = `
    SELECT COUNT(*) AS total
    FROM employee
    ${whereClause}
  `;

  const countResult = await pool.query(countQuery, values);

  const totalRecords = Number(countResult.rows[0].total);

  const totalPages = Math.ceil(totalRecords / limit);

  // Pagination
  const offset = (page - 1) * limit;

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  const employeesQuery = `
    SELECT *
    FROM employee
    ${whereClause}
    ORDER BY id DESC
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
  `;

  const employeesResult = await pool.query<Employee>(
    employeesQuery,
    values
  );

  return {
    data: employeesResult.rows,
    pagination: {
      totalRecords,
      currentPage: page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1 && page <= totalPages,
    },
  };
};
