"use client";

import { columns } from "@/components/advocated-data-table/columns";
import { DataTable } from "@/components/advocated-data-table/data-table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <DataTable columns={columns} data={filteredAdvocates} />
    </main>
  );
}
