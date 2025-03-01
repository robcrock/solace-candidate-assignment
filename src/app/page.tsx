import { AdvocateDataTable } from "@/features/advocates/components/advocate-data-table/advocate-data-table"

export default function Home() {
  return (
    <main className="container mx-auto pt-4">
      <h1 className="text-xl">Solace Advocates</h1>
      <AdvocateDataTable />
    </main>
  )
}
