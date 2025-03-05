import Link from 'next/link';

export default ({ currentUser }) =>{
    console.log('status of currentUser from headers',currentUser);
    const links = [
       !currentUser && {label : 'Sign Up', href: '/auth/signup'},
        !currentUser && {label : 'Sign In', href: '/auth/signin'},
        currentUser && {label : 'Sign Out', href: '/auth/signout'}
    ].filter(linkConfig => linkConfig)
    .map(({label, href}) =>{
        return <li key={href} className="nav-item">
        <Link href={href} className="nav-link">            
         {label}  
        </Link></li>
    });
    return <nav className="navbar navbar-light bg-light ml-5">
        <Link  className= "navbar-bran" href="/">
            GiTHub
        </Link>
        <div className="d-flex justify-content-end mr-5">
            <ul className="nav d-flex align-items-center">
                {links}
                </ul>

        </div>

    </nav>
}
