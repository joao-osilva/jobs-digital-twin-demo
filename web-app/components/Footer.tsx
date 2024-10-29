import { MdEmail } from "react-icons/md";
import { FaYoutube, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1e] py-12 mt-12 border-t border-[#2c2c2e]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-xl font-light text-white">Join the Founder Community</h3>

          <div className="flex space-x-8">
            <a 
              href="https://tiktok.com/@stevejobsai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
            <a 
              href="https://twitter.com/stevejobsai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaXTwitter className="w-6 h-6" />
            </a>
            <a 
              href="mailto:contact@stevejobsai.com" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <MdEmail className="w-6 h-6" />
            </a>
            <a 
              href="https://youtube.com/@stevejobsai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaYoutube className="w-6 h-6" />
            </a>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Steve Jobs AI Mentorship
            </p>
            <p className="text-xs text-gray-500">
              Built for founders, by founders
              <span className="mx-2">·</span>
              Not affiliated with Apple Inc.
            </p>
            <p className="text-xs text-gray-600">
              Making a dent in the universe, one conversation at a time
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
