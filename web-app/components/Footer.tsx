import { Github, Twitter, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1e] py-12 mt-12 border-t border-[#2c2c2e]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-xl font-light text-white">Join the Vision</h3>

          <div className="flex space-x-8">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://discord.com" className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Steve Jobs Digital Twin
            </p>
            <p className="text-xs text-gray-500">
              Crafted with precision in Brazil
              <span className="mx-2">·</span>
              Not affiliated with Apple Inc.
            </p>
            <p className="text-xs text-gray-600">
              Embracing simplicity, pursuing excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
