import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Recycle, PlusCircle, Sparkles, Wrench, MapPin, BarChart3,
  Award, User as UserIcon, LogOut, Menu, X, ChevronDown, Check,
  Package, Heart, History, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const demoMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDemoMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Click outside listener for classic dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (demoMenuRef.current && !demoMenuRef.current.contains(event.target as Node)) {
        setDemoMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Smart Match', path: '/smart-matching', icon: Sparkles },
    { name: 'Repair First', path: '/repair-assistant', icon: Wrench },
    { name: 'Nearby Map', path: '/nearby-map', icon: MapPin },
    { name: 'Impact', path: '/impact', icon: BarChart3 },
    { name: 'Rewards', path: '/rewards', icon: Award },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/90 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Classic Brand & Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-lg bg-forest-900 flex items-center justify-center text-white shadow-xs group-hover:bg-forest-800 transition-colors">
                <Recycle className="w-5 h-5 text-leaf-300 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-forest-950 font-sans leading-none">
                  Circular<span className="text-leaf-600">Loop</span>
                </span>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase mt-1">
                  Give Every Product Another Life
                </span>
              </div>
            </Link>

            {/* Center-Left: Classic Desktop Horizontal Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 h-16">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative inline-flex items-center gap-1.5 h-16 px-3.5 text-sm font-medium transition-colors border-b-2 ${
                      active
                        ? 'border-forest-900 text-forest-950 font-bold'
                        : 'border-transparent text-gray-600 hover:text-forest-900 hover:border-gray-300'
                    }`}
                  >
                    {Icon && (
                      <Icon className={`w-4 h-4 ${active ? 'text-forest-900' : 'text-gray-400 group-hover:text-forest-900'}`} />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions, Demo Switcher, List Item CTA & User Profile */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Classic Demo Mode Selector Dropdown */}
            <div className="relative" ref={demoMenuRef}>
              <button
                type="button"
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                aria-expanded={demoMenuOpen}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Demo Role</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {demoMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 text-left">
                  <div className="px-3.5 py-1.5 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Demo Persona Switcher
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>

                  <button
                    onClick={() => {
                      demoLogin('student');
                      setDemoMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-gray-900">Maya Chen (Student)</div>
                      <div className="text-[11px] text-gray-500">College Junior • Seeking Laptop</div>
                    </div>
                    {user?.email === 'maya.student@circularloop.edu' && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      demoLogin('repairer');
                      setDemoMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-gray-900">Alex Thorne (Fixer)</div>
                      <div className="text-[11px] text-gray-500">Repair Specialist • Tech Mentor</div>
                    </div>
                    {user?.email === 'alex.repair@circularloop.edu' && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      demoLogin('coordinator');
                      setDemoMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-gray-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-gray-900">Sam Rivera (Lead)</div>
                      <div className="text-[11px] text-gray-500">Campus Sustainability Coordinator</div>
                    </div>
                    {user?.email === 'sam.coordinator@circularloop.edu' && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Classic Primary CTA Button: List an Item */}
            <Link
              to="/create-listing"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-leaf-300" />
              <span>List an Item</span>
            </Link>

            {/* User Account / Profile Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                  aria-expanded={userMenuOpen}
                >
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                    alt={user.full_name}
                    className="w-7 h-7 rounded-full object-cover border border-gray-300 shrink-0"
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 line-clamp-1 max-w-[90px]">
                      {user.full_name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-leaf-600 font-bold -mt-0.5">
                      {user.circular_points} pts
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 text-left">
                    <div className="px-3.5 py-2.5 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">{user.full_name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                        <Award className="w-3 h-3 text-emerald-600" />
                        <span>{user.circular_points} Circular Points</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-900"
                      >
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        <span>Dashboard Overview</span>
                      </Link>

                      <Link
                        to="/dashboard?tab=listings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-900"
                      >
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>My Active Listings</span>
                      </Link>

                      <Link
                        to="/dashboard?tab=requests"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-900"
                      >
                        <History className="w-4 h-4 text-gray-400" />
                        <span>Exchange Requests</span>
                      </Link>

                      <Link
                        to="/dashboard?tab=saved"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-900"
                      >
                        <Heart className="w-4 h-4 text-gray-400" />
                        <span>Saved Favourites</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-forest-900"
                      >
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        <span>Profile & Preferences</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-forest-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?tab=register"
                  className="px-3.5 py-2 text-sm font-semibold text-forest-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/create-listing"
              className="p-2 rounded-lg bg-forest-900 text-white"
              aria-label="List an item"
            >
              <PlusCircle className="w-5 h-5 text-leaf-300" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Classic Mobile Accordion Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-forest-50 text-forest-950 font-bold border-l-4 border-forest-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-forest-900' : 'text-gray-400'}`} />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Demo Persona Buttons */}
          <div className="pt-3 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Quick Demo Personas:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  demoLogin('student');
                  setMobileMenuOpen(false);
                }}
                className="text-xs py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-center"
              >
                🎓 Maya
              </button>
              <button
                onClick={() => {
                  demoLogin('repairer');
                  setMobileMenuOpen(false);
                }}
                className="text-xs py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-center"
              >
                🔧 Alex
              </button>
              <button
                onClick={() => {
                  demoLogin('coordinator');
                  setMobileMenuOpen(false);
                }}
                className="text-xs py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-semibold text-center"
              >
                🏛 Sam
              </button>
            </div>
          </div>

          {/* Mobile Auth Button */}
          <div className="pt-3 border-t border-gray-100">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <img
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'}
                    alt={user.full_name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-900">{user.full_name}</p>
                    <p className="text-[11px] text-leaf-600 font-bold">{user.circular_points} Circular Points</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?tab=register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 rounded-lg bg-forest-900 text-white font-semibold text-xs shadow-xs"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
