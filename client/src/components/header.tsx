import { ICurrentUser } from "@/app/page";
import Link from "next/link";

type Props = {
  currentUser: ICurrentUser;
};

const HeaderPage = ({ currentUser }: Props) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ];
  const filtered = links.filter((linkConfig) => linkConfig) as {
    label: string;
    href: string;
  }[];
  const elements = filtered.map(({ href, label }) => {
    return (
      <li key={href} className="nav-item">
        <Link href={href}>
          <a className="nav-link">{label}</a>
        </Link>
      </li>
    );
  });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GitTix</a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{elements}</ul>
      </div>
    </nav>
  );
};

export default HeaderPage;
