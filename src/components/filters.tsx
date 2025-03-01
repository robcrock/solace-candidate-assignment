import { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";

type FiltersProps<TData> = {
  table: Table<TData>;
};

const Filters = <TData,>({ table }: FiltersProps<TData>) => {
  return (
    <div className="flex flex-col my-4">
      <p>Filters</p>
      <div className="flex items-center">
        <Input
          placeholder="First Name"
          value={
            (table.getColumn("firstName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Last Name"
          value={
            (table.getColumn("lastName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="City"
          value={(table.getColumn("city")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("city")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Degree"
          value={(table.getColumn("degree")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("degree")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Specialty"
          value={
            (table.getColumn("specialties")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("specialties")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Years of Experience"
          value={
            (table
              .getColumn("yearsOfExperience")
              ?.getFilterValue() as number) ?? ""
          }
          onChange={(event) => {
            console.log("event.target.value", event.target.value);
            console.log("column", table.getColumn("yearsOfExperience"));
            table
              .getColumn("yearsOfExperience")
              ?.setFilterValue(event.target.value);
          }}
          className="max-w-sm"
        />
      </div>
    </div>
  );
};

export { Filters };
