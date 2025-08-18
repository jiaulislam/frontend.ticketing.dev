process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { Flex, Button, Text, Card, Heading, Box } from "@radix-ui/themes";
import Link from "next/link";



// Best practice: Use server-side fetching in Next.js app directory
async function getTickets(): Promise<{id: number, title: string, description: string, price: number}[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/tickets`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const tickets = await getTickets();
  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      <Heading size="7" color="ruby" mb="4">Available Tickets</Heading>
      <Flex gap="4" wrap="wrap" justify="center" style={{ maxWidth: 1200 }}>
        {Array.isArray(tickets) && tickets.length > 0 ? (
          tickets.map((ticket: any) => (
            <Card key={ticket.id} style={{ minWidth: 320, maxWidth: 340, margin: 8, padding: 24, borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
              <Heading size="5" color="ruby">{ticket.title}</Heading>
              <Text color="gray" size="3" mb="2">{ticket?.description}</Text>
              <Box mt="2">
                <Text color="jade" size="4" weight="bold">${ticket.price}</Text>
              </Box>
              <Box mt="4">
                <Button color="ruby" size="3" asChild>
                  <Link href={`/tickets/${ticket.id}`}>View Details</Link>
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Text color="gray">No tickets found.</Text>
        )}
      </Flex>
      <Box mt="8">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </Box>
    </Flex>
  );
}
