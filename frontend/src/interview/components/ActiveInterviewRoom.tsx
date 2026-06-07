// // import { useState, useEffect, useRef } from 'react';
// // import { Logo } from '../../shared/components/Logo';
// // import Vapi from '@vapi-ai/web';

// // // Call Status
// // // enum CallStatus{
// // //     INACTIVE='INACTIVE',
// // //     CONNECTING='CONNECTING',
// // //     ACTIVE='ACTIVE',
// // //     FINISHED='FINISHED'
// // // }

// // // const vapi = new Vapi(`${import.meta.env.VITE_VAPI_PUBLIC_KEY}`);

// // export default function ActiveInterviewRoom() {
// //   const [isListening, setIsListening] = useState(false);
// //   const [isAiSpeaking, setIsAiSpeaking] = useState(true);
// //   const [timer, setTimer] = useState(0);
// //   const [transcript, setTranscript] = useState([
// //     {
// //       role: 'ai',
// //       text: 'Hello Santu! Great to have you here. To start off, can you tell me about a complex React project you worked on recently?',
// //     },
// //   ]);

// //   // Ref to handle auto-scrolling the transcript
// //   const transcriptEndRef = useRef<HTMLDivElement>(null);

// //   // Timer
// //   useEffect(() => {
// //     const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const formatTime = (seconds: number) => {
// //     const m = Math.floor(seconds / 60)
// //       .toString()
// //       .padStart(2, '0');
// //     const s = (seconds % 60).toString().padStart(2, '0');
// //     return `${m}:${s}`;
// //   };

// //   // Auto-scroll whenever transcript changes
// //   useEffect(() => {
// //     transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [transcript, isListening]);

// //   // Initial AI greeting simulation
// //   useEffect(() => {
// //     const speakingTimer = setTimeout(() => {
// //       setIsAiSpeaking(false);
// //     }, 4000); // AI stops speaking after 4 seconds
// //     return () => clearTimeout(speakingTimer);
// //   }, []);

// //   // Interactive Mock Conversation Flow
// //   const handleToggleMic = () => {
// //     if (isListening) {
// //       // Manually turn off mic
// //       setIsListening(false);
// //     } else {
// //       // 1. Start listening to candidate
// //       setIsAiSpeaking(false);
// //       setIsListening(true);

// //       // 2. Simulate candidate finishing their answer after 3.5 seconds
// //       setTimeout(() => {
// //         setTranscript((prev) => [
// //           ...prev,
// //           {
// //             role: 'user',
// //             text: 'Recently, I built a real-time dashboard using React and WebSockets. I used the Context API for state management to keep it highly performant.',
// //           },
// //         ]);
// //         setIsListening(false);

// //         // 3. AI takes a brief moment to process the answer
// //         setTimeout(() => {
// //           setIsAiSpeaking(true); // Waveform starts bouncing again

// //           // 4. AI responds
// //           setTimeout(() => {
// //             setTranscript((prev) => [
// //               ...prev,
// //               {
// //                 role: 'ai',
// //                 text: 'That sounds impressive. Using Context API was a good choice. How did you handle WebSocket connection drops and reconnections in that architecture?',
// //               },
// //             ]);

// //             // AI finishes speaking
// //             setTimeout(() => setIsAiSpeaking(false), 5000);
// //           }, 1000);
// //         }, 1500);
// //       }, 3500);
// //     }
// //   };

// //   return (
// //     <div className="h-screen bg-[#0B0F19] text-white flex flex-col overflow-hidden font-class">
// //       {/* TOP NAVBAR */}
// //       <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0B0F19] z-20">
// //         <div className="flex items-center gap-3">
// //           <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
// //             <Logo></Logo>
// //           </div>
// //           <div className="flex flex-col">
// //             <span className="font-bold tracking-tight leading-tight">
// //               HireIQ
// //             </span>
// //             <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
// //               Full Stack React Developer
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-4 md:gap-6">
// //           <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
// //             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
// //             <span className="text-xs font-mono font-medium text-slate-300">
// //               {formatTime(timer)}
// //             </span>
// //           </div>
// //           <button
// //             onClick={() => alert('Interview Ended!')}
// //             className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-all"
// //           >
// //             End Interview
// //           </button>
// //         </div>
// //       </header>

// //       {/* MAIN WORKSPACE */}
// //       <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
// //         {/* CENTER STAGE (Video Panels & Controls) */}
// //         <div className="flex-1 flex flex-col relative min-w-0">
// //           {/* Status Indicator (Top Center) */}
// //           <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
// //             <span
// //               className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 shadow-lg flex items-center gap-2 ${isAiSpeaking ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-indigo-500/20' : 'bg-slate-900/80 border-slate-700 text-slate-400 backdrop-blur-md'}`}
// //             >
// //               {isAiSpeaking && (
// //                 <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
// //               )}
// //               {isAiSpeaking ? 'AI Speaking' : 'AI Listening'}
// //             </span>
// //             {isListening && (
// //               <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center gap-2 animate-fade-in">
// //                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
// //                 You are Speaking
// //               </span>
// //             )}
// //           </div>

// //           {/* Video Grid */}
// //           <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto">
// //             {/* AI Panel */}
// //             <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group min-h-62.5">
// //               {/* Dynamic Background Glow */}
// //               <div
// //                 className={`absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full transition-opacity duration-700 ${isAiSpeaking ? 'opacity-100' : 'opacity-0'}`}
// //               ></div>

// //               <div
// //                 className={`w-28 h-28 md:w-32 md:h-32 bg-linear-to-tr from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-4 border-[#121214] relative z-10 transition-all duration-500 ${isAiSpeaking ? 'shadow-[0_0_40px_rgba(99,102,241,0.4)] ring-4 ring-indigo-500/50 scale-105' : 'shadow-xl scale-100'}`}
// //               >
// //                 <span className="material-symbols-outlined">chat</span>
// //               </div>
// //               <h3 className="mt-6 text-lg font-bold text-white relative z-10">
// //                 AI Interviewer
// //               </h3>

// //               {/* Waveform Visualizer */}
// //               <div className="flex items-center justify-center gap-1 h-8 mt-4 w-32 relative z-10">
// //                 {[...Array(10)].map((_, i) => (
// //                   <div
// //                     key={i}
// //                     className={`w-1.5 bg-indigo-500 rounded-full transition-all duration-300 ${isAiSpeaking ? 'animate-bounce' : 'opacity-20'}`}
// //                     style={{
// //                       height: isAiSpeaking
// //                         ? `${Math.random() * 80 + 20}%`
// //                         : '10%',
// //                       animationDelay: `${i * 0.05}s`,
// //                     }}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Candidate Panel */}
// //             <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-62.5">
// //               {/* Abstract Camera Simulation */}
// //               <div className="absolute inset-0 opacity-40">
// //                 <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[80px] rounded-full animate-[spin_10s_linear_infinite]"></div>
// //                 <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 blur-[60px] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
// //               </div>
// //               {/* Candidate Avatar Silhouette */}
// //               <div
// //                 className={`w-28 h-28 md:w-32 md:h-32 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300 ${isListening ? 'ring-4 ring-emerald-500/50' : ''}`}
// //               >
// //                 <span className="text-4xl text-slate-400 font-medium tracking-widest">
// //                   S
// //                 </span>
// //               </div>
// //               <h3 className="mt-6 text-lg font-bold text-white relative z-10">
// //                 You (Santu)
// //               </h3>
// //             </div>
// //           </div>

// //           {/* Bottom Control Bar */}
// //           <div className="h-24 bg-[#0B0F19] border-t border-slate-800 flex items-center justify-center gap-6 shrink-0 relative z-20">
// //             <button
// //               onClick={handleToggleMic}
// //               className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-500' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700'}`}
// //               title={isListening ? 'Mute Microphone' : 'Unmute to Speak'}
// //             >
// //               {isListening ? (
// //                 <svg
// //                   className="w-6 h-6"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
// //                   />
// //                 </svg>
// //               ) : (
// //                 <svg
// //                   className="w-6 h-6"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth="2"
// //                     d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
// //                   />
// //                   <line
// //                     x1="4"
// //                     y1="4"
// //                     x2="20"
// //                     y2="20"
// //                     strokeWidth="2"
// //                     strokeLinecap="round"
// //                   />
// //                 </svg>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* RIGHT SIDEBAR (Live Transcript) */}
// //         <aside className="w-full lg:w-100 xl:w-112.5 bg-[#111622] border-l border-slate-800 flex flex-col z-20 shrink-0">
// //           <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
// //             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
// //               <span className="material-symbols-outlined">toc</span>
// //               Live Transcript
// //             </h3>
// //           </div>

// //           <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
// //             {transcript.map((msg, i) => (
// //               <div
// //                 key={i}
// //                 className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'} animate-fade-in`}
// //               >
// //                 <span
// //                   className={`text-[10px] font-bold uppercase mb-1.5 ${msg.role === 'ai' ? 'text-indigo-400' : 'text-emerald-400'}`}
// //                 >
// //                   {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
// //                 </span>
// //                 <div
// //                   className={`max-w-[90%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50' : 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 rounded-tr-none'}`}
// //                 >
// //                   {msg.text}
// //                 </div>
// //               </div>
// //             ))}

// //             {/* Thinking / Typing indicator */}
// //             {isListening && (
// //               <div className="flex flex-col items-end animate-fade-in">
// //                 <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-2xl rounded-tr-none text-xs italic flex items-center gap-2 border border-emerald-500/20">
// //                   <span className="flex gap-1">
// //                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
// //                     <span
// //                       className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
// //                       style={{ animationDelay: '0.1s' }}
// //                     ></span>
// //                     <span
// //                       className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
// //                       style={{ animationDelay: '0.2s' }}
// //                     ></span>
// //                   </span>
// //                   Transcribing...
// //                 </div>
// //               </div>
// //             )}
// //             {/* Invisible div to scroll to */}
// //             <div ref={transcriptEndRef} />
// //           </div>

// //           <div className="p-4 bg-[#0B0F19]/80 border-t border-slate-800 shrink-0 flex items-center justify-center gap-2">
// //             <span
// //               className="material-symbols-outlined"
// //               style={{ fontSize: '18px' }}
// //             >
// //               lock
// //             </span>
// //             <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
// //               End-to-End Encrypted
// //             </p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect, useRef } from 'react';
// import { Logo } from '../../shared/components/Logo';
// import VapiModule from '@vapi-ai/web';
// import { MuteMicIcon } from '../../shared/components/MuteMicIcon';
// import UnmuteMicIcon from '../../shared/components/UnmuteMicIcon';

// const Vapi = (VapiModule as any).default || VapiModule;
// const vapi = new Vapi(`${import.meta.env.VITE_VAPI_PUBLIC_KEY}`);

// export default function ActiveInterviewRoom() {
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [isAiSpeaking, setIsAiSpeaking] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [timer, setTimer] = useState(0);

//   // Start with an empty array. Vapi will fill this in real-time.
//   const [transcript, setTranscript] = useState<
//     { role: string; text: string }[]
//   >([]);

//   // Ref to handle auto-scrolling the transcript
//   const transcriptEndRef = useRef<HTMLDivElement>(null);

//   // --- VAPI EVENT LISTENERS ---
//   // --- VAPI EVENT LISTENERS ---
//   useEffect(() => {
//     // 1. Create named functions for your events
//     const onCallStart = () => {
//       setIsCallActive(true);
//       setIsAiSpeaking(true);
//     };

//     const onCallEnd = () => {
//       setIsCallActive(false);
//       setIsAiSpeaking(false);
//       setTimer(0);
//     };

//     const onSpeechStart = () => setIsAiSpeaking(true);
//     const onSpeechEnd = () => setIsAiSpeaking(false);

//     vapi.on('error', (error: any) => {
//       console.error('🚨 Vapi Error:', error);
//     });

//     // 2. Track microphone volume (0 to 1)
//     vapi.on('volume-level', (volume: any) => {
//       // If the volume is greater than 0, your mic is working!
//       if (volume > 0.05) {
//         console.log('🎤 Mic is picking up sound! Level:', volume.toFixed(2));
//       }
//     });

//     const onMessage = (message: any) => {
//       if (message.type === 'transcript' && message.transcriptType === 'final') {
//         const currentRole = message.role === 'assistant' ? 'ai' : 'user';

//         setTranscript((prev) => {
//           // If the chat is empty, just add the first message normally
//           if (prev.length === 0) {
//             return [{ role: currentRole, text: message.transcript }];
//           }

//           // Get the very last message in the chat
//           const lastMessage = prev[prev.length - 1];

//           // If the current speaker is the SAME as the last speaker, merge the text!
//           if (lastMessage.role === currentRole) {
//             const updatedLastMessage = {
//               ...lastMessage,
//               text: `${lastMessage.text} ${message.transcript}`, // Combine the sentences
//             };

//             // Return the array with the last message updated
//             return [...prev.slice(0, -1), updatedLastMessage];
//           } else {
//             // If the speaker changed (e.g., Candidate replies to AI), create a new bubble
//             return [...prev, { role: currentRole, text: message.transcript }];
//           }
//         });
//       }
//     };

//     // 2. Attach the listeners
//     vapi.on('call-start', onCallStart);
//     vapi.on('call-end', onCallEnd);
//     vapi.on('speech-start', onSpeechStart);
//     vapi.on('speech-end', onSpeechEnd);
//     vapi.on('message', onMessage);

//     // 3. Clean up the SPECIFIC listeners when component unmounts
//     // (This stops the double-appending bug!)
//     return () => {
//       vapi.off('call-start', onCallStart);
//       vapi.off('call-end', onCallEnd);
//       vapi.off('speech-start', onSpeechStart);
//       vapi.off('speech-end', onSpeechEnd);
//       vapi.off('message', onMessage);

//       // Only stop the call if the component actually unmounts (user leaves page)
//       vapi.stop();
//     };
//   }, []);

//   // --- TIMER LOGIC ---
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;
//     if (isCallActive) {
//       interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
//     }
//     return () => clearInterval(interval);
//   }, [isCallActive]);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, '0');
//     const s = (seconds % 60).toString().padStart(2, '0');
//     return `${m}:${s}`;
//   };

//   // Auto-scroll whenever transcript changes
//   useEffect(() => {
//     transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [transcript]);

//   // --- REAL CALL CONTROLS ---
//   // const handleStartInterview = () => {
//   //   setTranscript([]); // Clear previous transcripts if restarting
//   //   vapi.start({
//   //     name: 'HireIQ Technical Interviewer',
//   //     firstMessage:
//   //       'Hello Santu! Welcome to HireIQ. To start off, can you tell me about a complex React project you have worked on recently?',
//   //     model: {
//   //       provider: 'openai',
//   //       model: 'gpt-4o-mini',
//   //       messages: [
//   //         {
//   //           role: 'system',
//   //           content:
//   //             'You are a professional technical interviewer for HireIQ. You have just greeted the candidate and asked about their React experience. Listen to their answer, and then ask a follow-up technical question.',
//   //         },
//   //       ],
//   //     },
//   //     // Pass your MongoDB Application ID here later for webhooks
//   //     // metadata: { applicationId: "123456789" }
//   //   });
//   // };

//   // --- REAL CALL CONTROLS ---
//   const handleStartInterview = () => {
//     setTranscript([]);

//     vapi.start({
//       name: 'HireIQ Technical Interviewer',
//       firstMessage:
//         'Hello Santu! Welcome to HireIQ. To start off, can you tell me about a complex React project you have worked on recently?',

//       // 1. CONFIGURE THE TRANSCRIBER (This handles the VAD / Fan Noise)
//       transcriber: {
//         provider: 'deepgram',
//         model: 'nova-2',
//         language: 'en-IN',
//         // 'endpointing' is Deepgram's VAD sensitivity.
//         // A higher number (e.g., 500ms or 800ms) means it waits longer through background noise before cutting you off.
//         // endpointing: 2000
//       },

//       // 2. CONFIGURE AI INTERRUPTION (Prevents the fan from talking over the AI)
//       clientMessages: ['transcript', 'hang', 'function-call', 'speech-update'],
//       serverMessages: ['end-of-call-report', 'status-update', 'transcript'],

//       model: {
//         provider: 'openai',
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'system',
//             content: `
//           You are a senior technical interviewer for HireIQ. Your goal is to interview the candidate about the MERN stack.

//         CRITICAL RULES:
//           1. You must act like a human in a real conversation.
//           2. Ask ONLY ONE question at a time. 
//           3. After asking a question, you MUST STOP SPEAKING and wait for the candidate to answer.
//           4. Never assume what the candidate will say, and never answer your own questions.
//           5. Keep your responses short (1 to 2 sentences maximum).

//           INTERVIEW FLOW:
//             Step 1: Welcome the candidate and ask them to describe a complex React project they recently built. Wait for their answer.
//             Step 2: Listen to their project description. Ask exactly one follow-up question about how they handled state management (e.g., Redux, Context API). Wait for their answer.
//             Step 3: Acknowledge their technical choice, then ask them to explain how React's Virtual DOM benefits application performance. Wait for their answer.
//             Step 4: Thank them for their time and end the interview.
//           `,
//           },
//         ],
//       },
//     });
//   };

//   const handleEndInterview = () => {
//     vapi.stop();
//   };

//   const handleToggleMic = () => {
//     const newMutedState = !isMuted;
//     setIsMuted(newMutedState);
//     vapi.setMuted(newMutedState); // Physically mutes/unmutes Vapi
//   };

//   // Determine if candidate is "listening" (Call active, AI not speaking, not muted)
//   const isCandidateSpeaking = isCallActive && !isAiSpeaking && !isMuted;

//   return (
//     <div className="h-screen bg-[#0B0F19] text-white flex flex-col overflow-hidden font-class">
//       {/* TOP NAVBAR */}
//       <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0B0F19] z-20">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
//             <Logo></Logo>
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold tracking-tight leading-tight">
//               HireIQ
//             </span>
//             <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
//               Full Stack React Developer
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 md:gap-6">
//           <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
//             <span
//               className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-red-500 animate-pulse' : 'bg-slate-600'}`}
//             ></span>
//             <span className="text-xs font-mono font-medium text-slate-300">
//               {formatTime(timer)}
//             </span>
//           </div>

//           {/* Dynamic Start/End Button */}
//           {!isCallActive ? (
//             <button
//               onClick={handleStartInterview}
//               className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-bold transition-all"
//             >
//               Start Interview
//             </button>
//           ) : (
//             <button
//               onClick={handleEndInterview}
//               className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-all"
//             >
//               End Interview
//             </button>
//           )}
//         </div>
//       </header>

//       {/* MAIN WORKSPACE */}
//       <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//         {/* CENTER STAGE (Video Panels & Controls) */}
//         <div className="flex-1 flex flex-col relative min-w-0">
//           {/* Status Indicator (Top Center) */}
//           <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
//             {isCallActive && (
//               <span
//                 className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 shadow-lg flex items-center gap-2 ${isAiSpeaking ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-indigo-500/20' : 'bg-slate-900/80 border-slate-700 text-slate-400 backdrop-blur-md'}`}
//               >
//                 {isAiSpeaking && (
//                   <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
//                 )}
//                 {isAiSpeaking ? 'AI Speaking' : 'AI Listening'}
//               </span>
//             )}

//             {isCandidateSpeaking && (
//               <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center gap-2 animate-fade-in">
//                 <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
//                 You are Speaking
//               </span>
//             )}
//           </div>

//           {/* Video Grid */}
//           <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto">
//             {/* AI Panel */}
//             <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group min-h-62.5">
//               <div
//                 className={`absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full transition-opacity duration-700 ${isAiSpeaking ? 'opacity-100' : 'opacity-0'}`}
//               ></div>

//               <div
//                 className={`w-28 h-28 md:w-32 md:h-32 bg-linear-to-tr from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-4 border-[#121214] relative z-10 transition-all duration-500 ${isAiSpeaking ? 'shadow-[0_0_40px_rgba(99,102,241,0.4)] ring-4 ring-indigo-500/50 scale-105' : 'shadow-xl scale-100'}`}
//               >
//                 <span className="material-symbols-outlined">chat</span>
//               </div>
//               <h3 className="mt-6 text-lg font-bold text-white relative z-10">
//                 AI Interviewer
//               </h3>

//               {/* Waveform Visualizer */}
//               <div className="flex items-center justify-center gap-1 h-8 mt-4 w-32 relative z-10">
//                 {[...Array(10)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`w-1.5 bg-indigo-500 rounded-full transition-all duration-300 ${isAiSpeaking ? 'animate-bounce' : 'opacity-20'}`}
//                     style={{
//                       height: isAiSpeaking
//                         ? `${Math.random() * 80 + 20}%`
//                         : '10%',
//                       animationDelay: `${i * 0.05}s`,
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Candidate Panel */}
//             <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-62.5">
//               <div className="absolute inset-0 opacity-40">
//                 <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[80px] rounded-full animate-[spin_10s_linear_infinite]"></div>
//                 <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 blur-[60px] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
//               </div>

//               <div
//                 className={`w-28 h-28 md:w-32 md:h-32 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300 ${isCandidateSpeaking ? 'ring-4 ring-emerald-500/50' : ''}`}
//               >
//                 <span className="text-4xl text-slate-400 font-medium tracking-widest">
//                   S
//                 </span>
//               </div>
//               <h3 className="mt-6 text-lg font-bold text-white relative z-10">
//                 You (Santu)
//               </h3>
//             </div>
//           </div>

//           {/* Bottom Control Bar */}
//           <div className="h-24 bg-[#0B0F19] border-t border-slate-800 flex items-center justify-center gap-6 shrink-0 relative z-20">
//             <button
//               onClick={handleToggleMic}
//               disabled={!isCallActive}
//               className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${!isCallActive ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30' : 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-500'}`}
//               title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
//             >
//               {isMuted ? <MuteMicIcon /> : <UnmuteMicIcon />}
//             </button>
//           </div>
//         </div>

//         {/* RIGHT SIDEBAR (Live Transcript) */}
//         <aside className="w-full lg:w-100 xl:w-112.5 bg-[#111622] border-l border-slate-800 flex flex-col z-20 shrink-0">
//           <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <span className="material-symbols-outlined">toc</span>
//               Live Transcript
//             </h3>
//           </div>

//           <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
//             {!isCallActive && transcript.length === 0 && (
//               <div className="text-center text-slate-500 text-sm mt-10">
//                 Click "Start Interview" when you are ready.
//               </div>
//             )}

//             {transcript.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'} animate-fade-in`}
//               >
//                 <span
//                   className={`text-[10px] font-bold uppercase mb-1.5 ${msg.role === 'ai' ? 'text-indigo-400' : 'text-emerald-400'}`}
//                 >
//                   {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
//                 </span>
//                 <div
//                   className={`max-w-[90%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50' : 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 rounded-tr-none'}`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             {/* Transcribing / Listening indicator */}
//             {isCandidateSpeaking && (
//               <div className="flex flex-col items-end animate-fade-in">
//                 <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-2xl rounded-tr-none text-xs italic flex items-center gap-2 border border-emerald-500/20">
//                   <span className="flex gap-1">
//                     <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
//                     <span
//                       className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
//                       style={{ animationDelay: '0.1s' }}
//                     ></span>
//                     <span
//                       className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
//                       style={{ animationDelay: '0.2s' }}
//                     ></span>
//                   </span>
//                   Listening...
//                 </div>
//               </div>
//             )}
//             {/* Invisible div to scroll to */}
//             <div ref={transcriptEndRef} />
//           </div>

//           <div className="p-4 bg-[#0B0F19]/80 border-t border-slate-800 shrink-0 flex items-center justify-center gap-2">
//             <span
//               className="material-symbols-outlined"
//               style={{ fontSize: '18px' }}
//             >
//               lock
//             </span>
//             <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
//               End-to-End Encrypted
//             </p>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Logo } from '../../shared/components/Logo';
import VapiModule from '@vapi-ai/web';
import { MuteMicIcon } from '../../shared/components/MuteMicIcon';
import UnmuteMicIcon from '../../shared/components/UnmuteMicIcon';

const Vapi = (VapiModule as any).default || VapiModule;
const vapi = new Vapi(`${import.meta.env.VITE_VAPI_PUBLIC_KEY}`);

// Define the shape of the data we expect from Python
interface SessionData {
  job_title: string;
  candidate_name: string;
  duration: number;
  questions: string[];
}

export default function ActiveInterviewRoom() {
  const navigate = useNavigate();
  // Grab the ID from the URL (your router uses :interviewId)
  const { interviewId } = useParams();
  const sessionId = interviewId;

  const [interviewData, setInterviewData] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isCallActive, setIsCallActive] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(0); // Will now be a countdown

  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // 1. FETCH DYNAMIC DATA ON LOAD
  // ==========================================
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/session/${sessionId}`
        );

        if (response.data.success) {
          const data = response.data.data;
          setInterviewData(data);
          // Set timer to duration in seconds
          setTimer((data.duration || 30) * 60);
        }
      } catch (error) {
        console.error("Failed to load interview data", error);
        alert("Failed to load interview session. It may be invalid or expired.");
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) fetchSessionData();
  }, [sessionId, navigate]);

  // ==========================================
  // 2. VAPI EVENT LISTENERS
  // ==========================================
  useEffect(() => {
    const onCallStart = () => {
      setIsCallActive(true);
      setIsAiSpeaking(true);
    };

    const onCallEnd = () => {
      setIsCallActive(false);
      setIsAiSpeaking(false);
    };

    const onSpeechStart = () => setIsAiSpeaking(true);
    const onSpeechEnd = () => setIsAiSpeaking(false);

    vapi.on('error', (error: any) => console.error('🚨 Vapi Error:', error));

    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const currentRole = message.role === 'assistant' ? 'ai' : 'user';

        setTranscript((prev) => {
          if (prev.length === 0) return [{ role: currentRole, text: message.transcript }];
          const lastMessage = prev[prev.length - 1];

          if (lastMessage.role === currentRole) {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, text: `${lastMessage.text} ${message.transcript}` },
            ];
          } else {
            return [...prev, { role: currentRole, text: message.transcript }];
          }
        });
      }
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('message', onMessage);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('message', onMessage);
      vapi.stop();
    };
  }, []);

  // ==========================================
  // 3. COUNTDOWN TIMER LOGIC
  // ==========================================
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isCallActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isCallActive) {
      handleEndInterview(); // Auto-end when time runs out
    }
    return () => clearInterval(interval);
  }, [isCallActive, timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // ==========================================
  // 4. DYNAMIC CALL CONTROLS
  // ==========================================
  const handleStartInterview = () => {
    if (!interviewData) return;
    
    setTranscript([]);

    const candidateName = interviewData.candidate_name || "Candidate";
    const jobTitle = interviewData.job_title || "this role";
    
    // Format the questions into a numbered string
    const formattedQuestions = interviewData.questions
      .map((q, index) => `${index + 1}. ${q}`)
      .join('\n');

    vapi.start({
      name: 'HireIQ Technical Interviewer',
      firstMessage: `Hello ${candidateName}! Welcome to HireIQ. Whenever you are ready, we can begin the interview for the ${jobTitle} position.`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-IN',
      },
      clientMessages: ['transcript', 'hang', 'function-call', 'speech-update'],
      serverMessages: ['end-of-call-report', 'status-update', 'transcript'],
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo', // Consider upgrading to gpt-4o for better conversational flow
        messages: [
          {
            role: 'system',
            content: `
            You are a professional technical interviewer for the HireIQ platform. You are interviewing ${candidateName} for the role of ${jobTitle}.
            Your goal is to assess the candidate by asking a specific list of questions.

            CRITICAL RULES:
            1. You must act like a human in a real conversation.
            2. Ask EXACTLY ONE question from the list at a time. Do not combine questions.
            3. After asking a question, you MUST STOP SPEAKING and wait for the candidate to answer.
            4. Never assume what the candidate will say, and never answer your own questions.
            5. Keep your responses and acknowledgements short (1 to 2 sentences maximum) before moving to the next question.

            HERE ARE YOUR QUESTIONS TO ASK:
            ${formattedQuestions}

            INTERVIEW FLOW:
            Step 1: Wait for the candidate to say they are ready.
            Step 2: Ask the first question from the list. Wait for their answer.
            Step 3: Listen to their answer, briefly acknowledge it, and then ask the next question on the list.
            Step 4: Repeat this process strictly in order until all questions have been asked.
            Step 5: Once all questions are completed, thank them for their time and tell them the interview is over.
            `,
          },
        ],
      },
    });
  };

  const handleEndInterview = async () => {
    vapi.stop();
    setIsCallActive(false);

    try {
      // Burn the link so it can never be used again
      await axios.post(
        `${import.meta.env.VITE_AI_API_BASE_URL || 'http://localhost:7000'}/api/interview/session/${sessionId}/complete`
      );
      
      alert("Interview Completed Successfully. Thank you for your time!");
      navigate('/'); // Redirect the candidate away
      
    } catch (error) {
      console.error("Failed to close session.", error);
    }
  };

  const handleToggleMic = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    vapi.setMuted(newMutedState);
  };

  const isCandidateSpeaking = isCallActive && !isAiSpeaking && !isMuted;

  if (isLoading) {
    return (
      <div className="h-screen bg-[#0B0F19] text-white flex items-center justify-center font-class">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-indigo-500">progress_activity</span>
          <p className="text-slate-400 font-medium tracking-wide">Connecting to secure interview room...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0B0F19] text-white flex flex-col overflow-hidden font-class">
      {/* TOP NAVBAR */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 shrink-0 bg-[#0B0F19] z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
            <Logo></Logo>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight leading-tight">
              HireIQ
            </span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider hidden sm:block">
              {interviewData?.job_title || 'Candidate Portal'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
            <span
              className={`w-2 h-2 rounded-full ${isCallActive && timer <= 60 ? 'bg-red-500 animate-ping' : isCallActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}
            ></span>
            <span className={`text-xs font-mono font-medium ${timer <= 60 && isCallActive ? 'text-red-400' : 'text-slate-300'}`}>
              {formatTime(timer)}
            </span>
          </div>

          {!isCallActive ? (
            <button
              onClick={handleStartInterview}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-bold transition-all"
            >
              Start Interview
            </button>
          ) : (
            <button
              onClick={handleEndInterview}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-all"
            >
              End Interview
            </button>
          )}
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* CENTER STAGE */}
        <div className="flex-1 flex flex-col relative min-w-0">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {isCallActive && (
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 shadow-lg flex items-center gap-2 ${isAiSpeaking ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-indigo-500/20' : 'bg-slate-900/80 border-slate-700 text-slate-400 backdrop-blur-md'}`}
              >
                {isAiSpeaking && (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                )}
                {isAiSpeaking ? 'AI Speaking' : 'AI Listening'}
              </span>
            )}

            {isCandidateSpeaking && (
              <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center gap-2 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                You are Speaking
              </span>
            )}
          </div>

          {/* Video Grid */}
          <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto">
            {/* AI Panel */}
            <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group min-h-62.5">
              <div
                className={`absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full transition-opacity duration-700 ${isAiSpeaking ? 'opacity-100' : 'opacity-0'}`}
              ></div>

              <div
                className={`w-28 h-28 md:w-32 md:h-32 bg-linear-to-tr from-slate-800 to-slate-700 rounded-full flex items-center justify-center border-4 border-[#121214] relative z-10 transition-all duration-500 ${isAiSpeaking ? 'shadow-[0_0_40px_rgba(99,102,241,0.4)] ring-4 ring-indigo-500/50 scale-105' : 'shadow-xl scale-100'}`}
              >
                <span className="material-symbols-outlined">chat</span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white relative z-10">
                AI Interviewer
              </h3>

              <div className="flex items-center justify-center gap-1 h-8 mt-4 w-32 relative z-10">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 bg-indigo-500 rounded-full transition-all duration-300 ${isAiSpeaking ? 'animate-bounce' : 'opacity-20'}`}
                    style={{
                      height: isAiSpeaking
                        ? `${Math.random() * 80 + 20}%`
                        : '10%',
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Candidate Panel */}
            <div className="bg-[#121214] rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-62.5">
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[80px] rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 blur-[60px] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              </div>

              <div
                className={`w-28 h-28 md:w-32 md:h-32 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700 flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300 ${isCandidateSpeaking ? 'ring-4 ring-emerald-500/50' : ''}`}
              >
                <span className="text-4xl text-slate-400 font-medium tracking-widest uppercase">
                  {interviewData?.candidate_name ? interviewData.candidate_name.charAt(0) : 'C'}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold text-white relative z-10">
                {interviewData?.candidate_name || 'You'}
              </h3>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="h-24 bg-[#0B0F19] border-t border-slate-800 flex items-center justify-center gap-6 shrink-0 relative z-20">
            <button
              onClick={handleToggleMic}
              disabled={!isCallActive}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${!isCallActive ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30' : 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:bg-emerald-500'}`}
              title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isMuted ? <MuteMicIcon /> : <UnmuteMicIcon />}
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Live Transcript) */}
        <aside className="w-full lg:w-100 xl:w-112.5 bg-[#111622] border-l border-slate-800 flex flex-col z-20 shrink-0">
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between shrink-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined">toc</span>
              Live Transcript
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {!isCallActive && transcript.length === 0 && (
              <div className="text-center text-slate-500 text-sm mt-10">
                Click "Start Interview" when you are ready.
              </div>
            )}

            {transcript.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'} animate-fade-in`}
              >
                <span
                  className={`text-[10px] font-bold uppercase mb-1.5 ${msg.role === 'ai' ? 'text-indigo-400' : 'text-emerald-400'}`}
                >
                  {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
                </span>
                <div
                  className={`max-w-[90%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${msg.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50' : 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 rounded-tr-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isCandidateSpeaking && (
              <div className="flex flex-col items-end animate-fade-in">
                <div className="bg-emerald-600/10 text-emerald-400 p-3 rounded-2xl rounded-tr-none text-xs italic flex items-center gap-2 border border-emerald-500/20">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></span>
                    <span
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                  </span>
                  Listening...
                </div>
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>

          <div className="p-4 bg-[#0B0F19]/80 border-t border-slate-800 shrink-0 flex items-center justify-center gap-2">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '18px' }}
            >
              lock
            </span>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
              End-to-End Encrypted
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}


// import { useState, useEffect, useRef } from 'react';
// import VapiModule from '@vapi-ai/web';

// const Vapi = (VapiModule as any).default || VapiModule;
// const vapi = new Vapi(`${import.meta.env.VITE_VAPI_PUBLIC_KEY}`);

// export default function ActiveInterviewRoom() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState<{role: string, text: string}[]>([]);

//   // 1. Setup local Browser Speech Recognition
//   const recognitionRef = useRef<any>(null);

//   useEffect(() => {
//     // Check if browser supports Web Speech API
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false; // Stop after one sentence
//       recognitionRef.current.interimResults = false; // Only final results
//       recognitionRef.current.lang = 'en-IN'; // Optimized for Indian English

//       recognitionRef.current.onresult = (event: any) => {
//         const text = event.results[0][0].transcript;
//         handleUserSpeech(text);
//       };

//       recognitionRef.current.onend = () => setIsListening(false);
//     }
//   }, []);

//   const handleUserSpeech = (text: string) => {
//     // 2. Add text to your UI immediately
//     setTranscript(prev => [...prev, { role: 'user', text }]);

//     // 3. Send text to Vapi AI
//     vapi.send({
//       type: "add-message",
//       message: {
//         role: "user",
//         content: text,
//       },
//     });
//   };

//   const toggleMic = () => {
//     if (isListening) {
//       recognitionRef.current?.stop();
//     } else {
//       setIsListening(true);
//       // 4. Ensure Vapi mic is MUTED to avoid fan noise interference
//       vapi.setMuted(true);
//       recognitionRef.current?.start();
//     }
//   };

// const startInterview = async () => {
//     try {
//       // 1. Start with a clean, minimal config to avoid the 400 error
//       await vapi.start({
//         name: "HireIQ Interviewer",
//         model: {
//           provider: "openai",
//           model: "gpt-4o-mini",
//           messages: [
//             {
//               role: "system",
//               content: "You are a professional technical interviewer for HireIQ. Wait for the user's text input and respond with your voice."
//             }
//           ]
//         }
//       });

//       // 2. IMPORTANT: Mute the Vapi mic immediately so it doesn't try to use the fan noise
//       vapi.setMuted(true);
//       console.log("Vapi started and muted. Using local browser speech recognition.");

//     } catch (err) {
//       console.error("Vapi Start Error:", err);
//     }
//   };
//   return (
//     <div className="flex flex-col items-center p-10 bg-[#0B0F19] h-screen text-white">
//       <button
//         onClick={startInterview}
//         className="px-6 py-2 bg-indigo-600 rounded mb-5"
//       >
//         Start Interview
//       </button>

//       <div className="w-full max-w-lg bg-slate-900 p-5 rounded-lg h-64 overflow-y-auto mb-5">
//         {transcript.map((m, i) => (
//           <p key={i} className={`mb-2 ${m.role === 'ai' ? 'text-indigo-400' : 'text-emerald-400'}`}>
//             <strong>{m.role === 'ai' ? 'AI: ' : 'You: '}</strong>{m.text}
//           </p>
//         ))}
//       </div>

//       <button
//         onClick={toggleMic}
//         className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
//           isListening ? 'bg-red-600 animate-pulse' : 'bg-slate-700'
//         }`}
//       >
//         <span className="material-symbols-outlined">
//           {isListening ? 'mic' : 'mic_off'}
//         </span>
//       </button>
//       <p className="mt-2 text-slate-400">
//         {isListening ? "Listening locally..." : "Click to Speak"}
//       </p>
//     </div>
//   );
// }
