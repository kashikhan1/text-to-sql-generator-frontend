'use client';
import {
  Card,
  LineChart,
  Title,
  Grid,
  BarChart,
  DonutChart
} from "@tremor/react";
import React, { useEffect, useState } from "react";

export default function Example({ records, question }: { records: any[], question?: string }) {
  const [value, setValue] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const valueFormatter = (number: any) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

  useEffect(() => {
    console.log(records);
    const newFilteredData: any = []
    records?.forEach(obj => {
      const newObj = { ...obj }
      const matchingKeys = Object.keys(newObj).filter(key => /_id/.test(key));
      if (matchingKeys.length > 0 && Object.keys(newObj).length > 2) {
        matchingKeys.forEach(key => delete newObj[key]);
      };
      newFilteredData.push(newObj)
    });
    setFilteredData(newFilteredData)
  }, [records])

  return (
    <>
      <Card className="mt-4">
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2">
          <Card className="mt-6">
            <Title>{question} - Line Chart</Title>
            <LineChart
              className="h-72 mt-4"
              data={filteredData}
              index={filteredData?.length ? Object.keys(filteredData[0])[0] : ''}
              categories={[filteredData?.length ? Object.keys(filteredData[0])[1] : '']}
              colors={["neutral", "indigo"]}
              yAxisWidth={30}
              onValueChange={(v: any) => setValue(v)}
              connectNulls={true}
            />
          </Card>

          <Card className="mt-6">
            <Title>{question} - Bar Chart</Title>
            <BarChart
              className="mt-6"
              data={filteredData}
              index={filteredData?.length ? Object.keys(filteredData[0])[0] : ''}
              categories={[filteredData?.length ? Object.keys(filteredData[0])[1] : '']}
              colors={["blue"]}
              valueFormatter={valueFormatter}
              yAxisWidth={48}
            />
          </Card>
        </Grid>

        <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
          <Card className="mt-6">
            <Title>{question} - Pie Chart</Title>
            <Card className="mx-auto max-w-xs">
              <DonutChart
                className="mt-6"
                data={filteredData}
                showLabel={true}
                variant="pie"
                valueFormatter={valueFormatter}
                colors={["blue-900", "blue-800", "blue-700", "blue-600", "blue-500", "blue-400"]}
                onValueChange={(v) => setValue(v)}
                index={filteredData?.length ? Object.keys(filteredData[0])[0] : ''}
                category={filteredData?.length ? `${Object.keys(filteredData[0])[1]}` : ''}
              />
            </Card>
          </Card>
        </Grid>
      </Card>
    </>

  );
}
