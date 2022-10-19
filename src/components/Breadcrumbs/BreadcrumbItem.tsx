import Link from 'next/link';
import { PropsWithChildren } from 'react';

const BreadcrumbItem: React.FC<PropsWithChildren & { href: string }> = ({ children, href, ...props }) => {
  return (
    <li {...props}>
      <Link href={href} passHref>
        <a className="buttonHover">{children}</a>
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
