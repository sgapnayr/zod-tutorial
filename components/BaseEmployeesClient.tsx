"use client";

import { Employee } from "@prisma/client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import z from "zod";

function BaseEmployeesClient() {
  // STATE ____________________________________________________________________________________________________________________________________________ //
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTitle, setEmployeeTitle] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState(0);
  const [loading, setLoading] = useState(false);

  // VALIDATION ____________________________________________________________________________________________________________________________________________ //
  const employeeObject = z.object({
    employeeName: z.string(),
    employeeTitle: z.string(),
    employeeSalary: z.number(),
  });

  // TYPE ____________________________________________________________________________________________________________________________________________ //
  type EmployeeData = z.infer<typeof employeeObject>;

  // FUNCTIONS ____________________________________________________________________________________________________________________________________________ //
  async function postEmployee(employeeData: EmployeeData) {
    try {
      const validData = employeeObject.parse(employeeData);
      await axios.post("/api/employee", validData);

      setEmployeeName("");
      setEmployeeTitle("");
      setEmployeeSalary(0);
      getEmployees();
    } catch (error) {
      console.error("Validation error:", error);
    }
  }

  async function deleteEmployee(employeeId: string) {
    await axios.delete("/api/employee/" + employeeId);
    getEmployees();
  }

  async function getEmployees() {
    setLoading(true);
    const response = await axios.get("/api/employee");
    setEmployees(response?.data);
    setLoading(false);
  }

  // LIFE CYCLE ____________________________________________________________________________________________________________________________________________ //
  useEffect(() => {
    getEmployees();
  }, []);

  // TEMPLATE ____________________________________________________________________________________________________________________________________________ //
  if (loading)
    return (
      <div className="w-full flex justify-center items-center flex-col text-white">
        Loading...
      </div>
    );

  return (
    <div>
      <div className="w-full text-center my-4">Employee Input</div>
      <div className="w-full flex justify-center items-center flex-col text-white">
        <input
          className="text-black"
          type="text"
          value={employeeName}
          placeholder="Employee Name"
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          className="text-black my-2"
          type="text"
          value={employeeTitle}
          placeholder="Position"
          onChange={(e) => setEmployeeTitle(e.target.value)}
        />
        <input
          className="text-black"
          type="text"
          value={employeeSalary}
          placeholder="Salary"
          onChange={(e) => setEmployeeSalary(Number(e.target.value))}
        />

        <button
          className="cursor-pointer bg-white text-black mt-2 rounded-md shadow-md p-2 active:scale-90 transition hover:opacity-50"
          onClick={() =>
            postEmployee({ employeeName, employeeTitle, employeeSalary })
          }
        >
          Post Employee
        </button>
      </div>

      <div className="w-full text-center my-4">Employee List</div>
      <div className="w-full flex justify-center items-center flex-col text-white">
        {employees.map((employee: Employee) => (
          <div
            className="text-black bg-white p-4 rounded-md m-2 shadow-xl"
            key={employee.employeeId}
          >
            <div>Name: {employee.employeeName}</div>
            <div>Title: {employee.employeeTitle}</div>
            <div>Salary: ${employee.employeeSalary}</div>
            <div
              className="cursor-hover opacity-50 hover:opacity-100"
              onClick={() => deleteEmployee(employee.employeeId)}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BaseEmployeesClient;
