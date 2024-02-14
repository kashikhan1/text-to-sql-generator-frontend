import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@tremor/react';

export default function RecordsTable({ records }: { records: any[] }) {
  if (!records || records.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(records[0]);

  return (
    <Table>
      <TableHead>
        <TableRow>
        {headers.map(header => (
            <TableHeaderCell key={header}>{header.replace("_", " ").toUpperCase()}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map(record => (
          <TableRow key={record.id}>
            {headers.map(header => (
              <TableCell key={`${record.id}-${header}`}>{record[header]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
