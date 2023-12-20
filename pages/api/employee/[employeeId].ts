import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "DELETE":
      return await deleteEmployee(req, res);
    case "POST":
      return await deleteEmployee(req, res);
    default:
      res.status(405).end();
      break;
  }
}

async function deleteEmployee(req: NextApiRequest, res: NextApiResponse) {
  const { employeeId } = req.query;

  const employees = await prisma.employee.delete({
    where: {
      employeeId: String(employeeId),
    },
  });

  res.json(employees);
}
