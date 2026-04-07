// "use client";

// import { Mic, Twitter, Linkedin, GitHub } from "lucide-react";

// export default function Footer() {
//   const footerLinks = {
//     Product: ["Features", "How It Works", "Pricing", "Changelog", "Roadmap"],
//     Company: ["About", "Blog", "Careers", "Press", "Contact"],
//     Resources: ["Documentation", "API Reference", "Status", "Support", "Community"],
//     Legal: ["Privacy Policy", "Terms of Service", "Security", "GDPR"],
//   };

//   return (
//     <footer className="border-t border-white/10 pt-20 pb-10 px-6 relative bg-[#05070f]">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[280px_repeat(4,1fr)] gap-12 lg:gap-8 mb-16">
//           <div className="lg:pr-8">
//             <a href="/" className="flex items-center gap-2.5 no-underline mb-4">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6c63ff] to-[#9b59b6] flex items-center justify-center">
//                 <Mic size={18} className="text-white" />
//               </div>
//               <span className="font-['Syne',sans-serif] font-extrabold text-[1.1rem] text-white tracking-tight">
//                 VoiceRecruit<span className="text-[#a78bfa]">AI</span>
//               </span>
//             </a>
//             <p className="text-white/35 text-sm leading-relaxed mb-6">
//               Automate your candidate screening with AI voice agents. Hire faster, smarter.
//             </p>
//             <div className="flex gap-3">
//               {[ { Icon: Twitter, href: "#" }, { Icon: Linkedin, href: "#" }, { Icon: GitHub, href: "#" } ].map(({ Icon, href }, i) => (
//                 <a key={i} href={href} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#a78bfa] hover:bg-[#6c63ff]/20 hover:border-[#6c63ff]/30 transition-all duration-200">
//                   <Icon size={16} />
//                 </a>
//               ))}
//             </div>
//           </div>
//           {Object.entries(footerLinks).map(([category, links]) => (
//             <div key={category}>
//               <h4 className="text-white text-sm font-bold tracking-wider mb-5">{category}</h4>
//               <ul className="flex flex-col gap-3">
//                 {links.map((link) => (
//                   <li key={link}><a href="#" className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200">{link}</a></li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <p className="text-white/30 text-xs text-center sm:text-left">© 2025 VoiceRecruit AI, Inc. All rights reserved.</p>
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-green-500" />
//             <span className="text-white/30 text-xs">All systems operational</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }