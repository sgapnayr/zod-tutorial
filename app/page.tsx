import BaseEmployeesServer from "@/components/BaseEmployees.server";
import BaseEmployeesClient from "@/components/BaseEmployeesClient";

export default function Home() {
  // TEMPLATE ____________________________________________________________________________________________________________________________________________ //
  return (
    <div className="w-full  flex justify-center items-center flex-col text-white">
      <div className="flex">
        <div>
          <BaseEmployeesClient />
        </div>
      </div>
    </div>
  );
}
