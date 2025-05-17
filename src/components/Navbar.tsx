import { useState } from 'react';

type NavItem = {
  id: string;
  label: string;
};

type NavbarProps = {
  title: string;
  items: NavItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
};

export function Navbar({ title, items, activeItem, onItemClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h3>{title}</h3>
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      <ul className={`nav-items ${menuOpen ? 'open' : ''}`}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => {
                onItemClick(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
