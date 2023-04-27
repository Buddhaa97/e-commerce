import Link from 'next/link';
import classes from "./header.module.css";
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';

export default function Header () {
    return (
        <header className={classes.header}>
            <div>
                <Link href="/">
                    <Image
                        priority
                        src="/images/logo.jpg"
                        className={utilStyles.borderCircle}
                        height={50}
                        width={50}
                        alt=""
                    />
                </Link>
            </div>
           <div className={classes.linkHeader}>
               <Link href="/">
                   Home
               </Link>
               <Link href="/about-us">
                   About
               </Link>
               <Link href="/product">
                   Product
               </Link>
               <Link href="/contact">
                   Contact
               </Link>
           </div>
        </header>
    )
}
