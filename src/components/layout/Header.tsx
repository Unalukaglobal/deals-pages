"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, UserPlus, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUser, signOut } from "@/lib/auth";
import { SignUpDialog } from "@/components/auth/SignUpDialog";

const categoryLinks = [
  { label: "Trending", href: "/deals" },
  { label: "Tecnologia", href: "/deals?cat=tecnologia" },
  { label: "Gaming", href: "/deals?cat=gaming" },
  { label: "Audio", href: "/deals?cat=audio" },
  { label: "Deportes", href: "/deals?cat=deportes" },
  { label: "Accesorios", href: "/deals?cat=accesorios" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleSignOut = () => {
    signOut();
    setUser(null);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/deals?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        {/* Main header bar */}
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Unaluka Deals"
              width={240}
              height={64}
              className="h-16 w-auto sm:h-20"
              priority
              unoptimized
            />
          </Link>

          {/* Search bar - center, wide */}
          <div className="hidden flex-1 md:block">
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar deals..."
                className="w-full pl-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              />
            </div>
          </div>

          {/* Right: Sign Up / User */}
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="mr-1 h-3.5 w-3.5" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-deal-red text-white hover:bg-deal-red-hover"
                onClick={() => setShowSignUp(true)}
              >
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Sign Up
              </Button>
            )}
          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Category bar */}
        <div className="border-t border-border bg-background/80">
          <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 scrollbar-none">
            {categoryLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-border px-4 pb-4 md:hidden">
            {/* Mobile search */}
            <div className="relative mt-3">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar deals..."
                className="pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    setMobileOpen(false);
                  }
                }}
              />
            </div>
            {/* Mobile categories */}
            <nav className="mt-3 flex flex-col gap-1">
              {categoryLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Mobile sign up */}
            <div className="mt-3 border-t border-border pt-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                    <LogOut className="mr-1 h-3.5 w-3.5" />
                    Salir
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="w-full bg-deal-red text-white hover:bg-deal-red-hover"
                  onClick={() => { setShowSignUp(true); setMobileOpen(false); }}
                >
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  Sign Up
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <SignUpDialog
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={() => setUser(getUser())}
      />
    </>
  );
}
