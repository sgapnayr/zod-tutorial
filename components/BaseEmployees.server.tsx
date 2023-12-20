import { Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function BaseEmployees() {
  const employees = await prisma.employee.findMany();

  return (
    <div className="w-full flex justify-center items-center flex-col text-white">
      {employees.map((employee: Employee) => (
        <div
          className="text-black bg-white p-4 rounded-md m-2 shadow-xl"
          key={employee.employeeId}
        >
          <div>Name: {employee.employeeName}</div>
          <div>Title: {employee.employeeTitle}</div>
          <div>Salary: ${employee.employeeSalary}</div>
        </div>
      ))}
    </div>
  );
}
