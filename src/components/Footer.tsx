import React from 'react';
import { Shield, Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center">
          {/* Logo and Tagline */}
          <div className="flex items-center mb-6">
            <Shield className="w-5 h-5 text-purple-400 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              ByteFlow
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-6 mb-8">
            <SocialLink href="https://github.com" icon={<Github />} />
            <SocialLink href="https://twitter.com" icon={<Twitter />} />
            <SocialLink href="https://discord.com" icon={<MessageCircle />} />
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-sm mb-2">
              © 2024 BYTEFLOW · QUANTUM-SECURED BLOCKCHAIN PROTOCOL
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-600">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-purple-400 transition-colors"
    >
      {icon}
    </a>
  );
}