import React, { useEffect, useState } from 'react';
import type { Breadcrumb, PageDetails } from '../../types';
import layout from '../../styles/Layout.module.scss';
import BreadcrumbItem from './BreadcrumbItem';
import { useRouter } from 'next/router';

const Breadcrumbs: React.FC<{ details: PageDetails }> = (props) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split('?')[0];
    let pathArray = pathWithoutQuery.split('/');
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== '');

    const breadcrumbs = pathArray.map((path, index) => {
      const href = '/' + pathArray.slice(0, index + 1).join('/');
      if (props.details.isDetails && pathArray.length === index + 1) {
        return {
          href,
          label: props.details.pageTitle + ' (' + path.charAt(0).toUpperCase() + path.slice(1) + ')',
          isCurrent: index === pathArray.length - 1
        };
      }

      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath, props.details.pageTitle]);

  return (
    <ul className={layout.breadcrumbs}>
      <BreadcrumbItem href="/">Strona główna</BreadcrumbItem>
      {breadcrumbs && breadcrumbs.length > 0
        ? breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
              {breadcrumb.isCurrent ? <b>{breadcrumb.label}</b> : breadcrumb.label}
            </BreadcrumbItem>
          ))
        : null}
    </ul>
  );
};

export default Breadcrumbs;
