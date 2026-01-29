'use client';
import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function ReactQueryProvider({ children }: { children: ReactNode }) {
   const [client] = useState(
       () =>
           new QueryClient({
               defaultOptions: {
                   queries: {
                       gcTime: 5 * 60_000,
                       retry: 2,
                       refetchOnWindowFocus: true,
                   },
               },
           }),
   );
   return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}