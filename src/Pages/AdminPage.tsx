//@ts-nocheck

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getUrls } from '@/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
// Init plugins
dayjs.extend(utc);
dayjs.extend(relativeTime);

function timeAgo(dateStr: string) {
  return dayjs.utc(dateStr).fromNow(); // "5 hours ago", "a minute ago", etc.
}
const dummyStats = [
  { label: 'Indexed URLs', value: 24580 },
  { label: 'Queries Served', value: 19234 },
  { label: 'Crawled Domains', value: 5980 },
  { label: 'Failed Crawls', value: 134 },
];

const recentCrawls = [
  { url: 'https://example.com', status: 'Indexed', time: '2 min ago' },
  { url: 'https://abc.com', status: 'Failed', time: '10 min ago' },
  { url: 'https://devsite.net', status: 'Queued', time: 'Just now' },
];

const popularQueries = [
  { keyword: 'AI tools', count: 1200 },
  { keyword: 'React hooks', count: 980 },
  { keyword: 'YouTube downloader', count: 860 },
];


// Example


const AdminPage = () => {
  const [crawlUrl, setCrawlUrl] = useState('');
  const [urls,seturls]=useState([]);
  // const [logs, setLogs] = useState<string[]>([]);

  useEffect(()=>{
    const getUrl=async()=>{
    const u= await getUrls();
    seturls(u);
    }
    getUrl();
  },[]);
//   useEffect(() => {
//   const socket = new WebSocket("ws://127.0.0.1:8000/ws");

//   socket.onmessage = (event) => {
//     console.log(event.data);
//     setLogs((prevLogs) => [...prevLogs.slice(-99), event.data]); // keep last 100 logs
//   };

//   socket.onerror = (err) => {
//     console.error("❌ WebSocket error:", err);
//   };

//   socket.onopen = () => {
//     console.log("✅ WebSocket connected");
//   };

//   socket.onclose = () => {
//     console.log("❌ WebSocket closed");
//   };

//   return () => {
//     socket.close();
//     console.log("🔌 WebSocket cleanup");
//   };
// }, []);




  const handleSubmitUrl = () => {
    if (!crawlUrl.trim()) return;
    console.log('Submitted to crawl:', crawlUrl);
    setCrawlUrl('');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-6">Search Engine Admin Overview</h1>
   {/* <div className='flex  flex-col items-center justify-center'>

          <h2 className="text-purple-400 text-lg font-semibold mb-2 b">Live Logs</h2>
      <div className="bg-[#161B22] p-4 rounded-lg mt-6 max-h-64 overflow-y-auto w-[1000px] ">
          <ul className="text-sm bg-black font-mono space-y-1">
            {logs.map((log, i) => (
              
              <li key={i} className="text-gray-300">{log}</li>
            ))}
          </ul>
       </div>
   </div> */}


      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyStats.map((stat, i) => (
          <Card key={i} className="bg-[#161B22] text-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submit URL */}
      <div className="bg-[#161B22] p-4 rounded-lg shadow flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Enter URL to crawl"
          value={crawlUrl}
          onChange={(e) => setCrawlUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubmitUrl} variant="default">
          Submit
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="crawls" className="mt-6">
        <TabsList className="bg-[#161B22]">
          <TabsTrigger value="crawls">Recent Crawls</TabsTrigger>
          <TabsTrigger value="queries">Popular Queries</TabsTrigger>
        </TabsList>
        <TabsContent value="crawls">
          <Table className="bg-[#161B22] rounded-lg ">
            <TableHeader>
              <TableRow className='text-white'>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {urls?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.url}</TableCell>
                  <TableCell className={
                    item.status === 'Indexed' ? 'text-green-500' :
                    item.status === 'pending' ? 'text-red-500' :
                    'text-yellow-400'}>
                    {item.status==='pending'?'Queued':'Indexed'}
                  </TableCell>
                  <TableCell>{timeAgo(item.
timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="queries">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularQueries}>
              <XAxis dataKey="keyword" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" fill="#9333ea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;