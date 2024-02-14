import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

interface User {
  id: number;
  firstName: string;
  username: string;
  email: string;
}

async function getUsers(search: any) {
  const res = await fetch(`https://dummyjson.com/users${search ? `/search?q=${search}` : ''}`)

  console.log(`https://dummyjson.com/users?${search ? `search?q=${search}` : ''}`)
 
  const data = await res.json()

  // console.log(data)

  return data.users
}
 
export default async function Page({
    searchParams
  }: {
    searchParams: { q: string };
  }) {
  const search = searchParams.q ?? '';

  const getUsersList = await getUsers(search)

  const users = getUsersList;
 
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}