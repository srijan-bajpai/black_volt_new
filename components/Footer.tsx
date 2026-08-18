import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Instagram, Users } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    const recipientEmail = "blackvolt.tech@gmail.com";
    const emailBody = `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <footer id="contact" className="bg-[#050505] pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="reveal-on-scroll">
            <h2 className="font-display text-4xl font-bold text-white mb-6 uppercase tracking-tight">Get In Touch</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Whether you are a researcher, startup, or institution, we welcome discussions around joint research, technical guidance, and long-term collaboration.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Email Us</h4>
                  <a href="mailto:blackvolt.tech@gmail.com" target = "_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-sm">blackvolt.tech@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Visit Us</h4>
                  <p className="text-gray-400 text-sm">VNEST Office, VIT Chennai<br />600127, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Follow Us</h4>
                  <div className="flex gap-4 mt-2">
                    <a href="https://www.linkedin.com/company/backvolt/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/blackvolt.in/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold mb-2">Join Our Mission</h4>
              <p className="text-xs text-gray-400 mb-4">We are actively looking to collaborate with researchers, mentors, and institutions.</p>
              <div className="flex gap-3">
                <button 
                  onClick={onOpenModal} 
                  className="text-xs font-bold text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111111] p-8 rounded-2xl border border-white/10 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul Sharma" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <input 
                    type="email" 
                    placeholder="e.g. rahul.sharma@example.com" 
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                <input 
                  type="text" 
                  placeholder="Purpose of inquiry" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Briefly describe your interest..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors"></textarea>
              </div>
              <button 
                type="button" 
                onClick={handleSendMessage}
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© 2026 BLACKVOLT Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social links moved up */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;