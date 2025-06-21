import React, { useEffect, useRef, useState } from 'react';

const LiveLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // const socket = new WebSocket('ws://127.0.0.1:8000/ws');
    const socket = new WebSocket('wss://io-search-engine.onrender.com/ws');


    socket.onmessage = (event) => {
      const { log } = JSON.parse(event.data);
      setLogs((prevLogs) => [...prevLogs.slice(-99), log]);
    };

    socket.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onclose = () => {
      console.log('❌ WebSocket closed');
    };

    return () => {
      socket.close();
      console.log('🔌 WebSocket cleanup');
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-400">📡 Live Terminal Logs</h1>
      <div className="bg-[#0d0d0d] border border-gray-700 rounded-lg p-4 overflow-y-auto max-h-[75vh] shadow-xl">
        <ul className="space-y-2 text-sm">
          {logs.map((log, i) => {
            const match = log.match(/^\[(.*?)\]\s+(.*)$/);
            const timestamp = match?.[1] || '';
            const message = match?.[2] || log;

            let icon = '🟢';
            if (message.includes('✅')) icon = '✅';
            else if (message.includes('⛔') || message.includes('error')) icon = '⛔';
            else if (message.includes('Skipped')) icon = '⚠️';

            return (
              <li
                key={i}
                className="flex items-start gap-3 border-b border-gray-800 pb-1"
              >
                <span className="w-5">{icon}</span>
                <span className="text-gray-500 min-w-[160px]">{timestamp}</span>
                <span className="text-gray-200 flex-1">{message}</span>
              </li>
            );
          })}
          <div ref={bottomRef} />
        </ul>
      </div>
    </div>
  );
};

export default LiveLogs;
