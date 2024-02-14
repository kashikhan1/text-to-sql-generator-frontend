'use client';

import { Card, Grid, Textarea, Button } from '@tremor/react';
import Chart from './chart';
import React from 'react';
import RecordsTable from '../dynamictable';

export default function PlaygroundPage() {
  const [value, setValue] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    if (query) {
      getQueryAndData(query)
        .then((data) => {
          console.log(data);
          setQuery(data.data.query)
          setRecords(data.data.records)
        })
    }
  }, [query])


  async function getQueryAndData(search: any) {
    const res = await fetch(`http://127.0.0.1:8000/get-query/${search}`)
    // const res = await fetch(`http://127.0.0.1:8000/execute`)
    const data = await res.json()
    return data
  }
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="gap-6">
        <Card>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(value);
            }}
          >
            <div className="flex flex-col gap-2">
              <Textarea
                onChange={(e) => setValue(e.target.value)}
                id="description"
                placeholder="please ask me question which product sold the most?"
                value={value}
              />
            </div>
            <Button className='float-right mt-8' size="sm" variant="secondary" type='submit'>
              Submit
            </Button>
          </form>
        </Card>
      </Grid>
      <Card className="mt-6">
       <h1 >data table for query : {value}</h1>

        <RecordsTable records={records} />
      </Card>
      <Card>
            <div className="flex flex-col gap-2">
              <h1 >SQL Query for:  {value}</h1>
              <Textarea
                id="description"
                placeholder="once query is executed its shows here"
                value={query || ''}
              />
            </div>
        </Card>
      <Chart records={records} question={value} />
    </main>
  );
}
