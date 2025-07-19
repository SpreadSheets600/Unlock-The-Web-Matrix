import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { PlusIcon, HomeIcon, LogInIcon, UserPlusIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { useState } from "react";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <HomeIcon className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
              <div className="font-bold text-xl gradient-text hidden sm:block">WebMatrix</div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {token ? (
              <>
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to="/">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
                <Button
                  variant={isActive("/create") ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to="/create">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="relative group">
                    <Avatar className="h-9 w-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                      <AvatarFallback className="text-sm bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold">
                        U
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Button
                  variant={isActive("/login") ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link to="/login">
                    <LogInIcon className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button
                  variant={isActive("/register") ? "default" : "outline"}
                  size="sm"
                  asChild
                >
                  <Link to="/register">
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Register
                  </Link>
                </Button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {token ? (
                <>
                  <Button
                    variant={isActive("/") ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                      <HomeIcon className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                  </Button>
                  <Button
                    variant={isActive("/create") ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/create" onClick={() => setMobileMenuOpen(false)}>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Post
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={isActive("/login") ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <LogInIcon className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    variant={isActive("/register") ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        <Separator />
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-5xl px-4 py-8 animate-fade-in">
        <div className="relative">
          {children}
        </div>
      </main>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default Layout;
