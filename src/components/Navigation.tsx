// components/Navigation.tsx

import { Link } from "react-router-dom";

const Navigation = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "Posts" },
    { to: "/infinite-posts", label: "Infinite Posts" },
    { to: "/infinite-posts-2", label: "Infinite Posts 2" },
    { to: "/select", label: "Select" },
    { to: "/queries", label: "Queries" },
    { to: "/pagination", label: "Pagination" },
    { to: "/optimistic-updates", label: "Optimistic Updates" },
  ];
  return (
    <nav className="navigation">
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
