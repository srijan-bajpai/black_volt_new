import React from 'react';
import { Mail, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
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
                  <a href="mailto:info@blackvolt.in" className="text-gray-400 hover:text-primary transition-colors text-sm">info@blackvolt.in</a>
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
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <input type="text" placeholder="Full name" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                  <input type="email" placeholder="your@email.com" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                <input type="text" placeholder="Purpose of inquiry" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea rows={4} placeholder="Briefly describe your interest..." className="w-full bg-black/50 border border-white/10 rounded p-3 text-white text-sm focus:border-primary focus:ring-0 focus:outline-none transition-colors"></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">© 2025 BLACKVOLT Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;