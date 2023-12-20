import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Employee } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getEmployees(req, res);
    case "POST":
      return await postEmployees(req, res);
    default:
      res.status(405).end();
      break;
  }
}

async function getEmployees(req: NextApiRequest, res: NextApiResponse) {
  const employees = await prisma.employee.findMany({});
  res.json(employees);
}

async function postEmployees(req: NextApiRequest, res: NextApiResponse) {
  const { employeeName, employeeTitle, employeeSalary } = req.body;
  const employeeId = crypto.randomUUID();

  const newEmployee = await prisma.employee.create({
    data: {
      employeeId,
      employeeName,
      employeeTitle,
      employeeSalary,
    } as Employee,
  });

  res.send(newEmployee);
}
