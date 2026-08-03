import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

const WhatsAppWidget = () => {
  const whatsappNumber = "919006859138";
  const defaultMessage = encodeURIComponent("Hello Rakesh Sir, I want to enquire about admission in Sarthak Institute.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Help tooltip */}
      <div className="hidden sm:flex items-center gap-2 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-800 animate-bounce-soft">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        <span>Admission Enquiry: 9006859138</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 group border border-emerald-400/30"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="text-sm font-extrabold tracking-wide">
          WhatsApp Chat
        </span>
      </a>
    </div>
  );
};

export default WhatsAppWidget;
