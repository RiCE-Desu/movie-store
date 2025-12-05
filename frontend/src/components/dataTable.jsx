import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  
  return (
    <div className="overflow-hidden border border-blue-100 rounded-lg shadow-sm bg-white">
      <Table>
        <TableHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-blue-100/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id}
                    className="text-blue-900 font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`
                  transition-colors duration-150
                  ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}
                  hover:bg-blue-100/40
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell 
                colSpan={columns.length} 
                className="h-24 text-center text-gray-500 bg-blue-50/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg">📭</span>
                  <span>No results found.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}