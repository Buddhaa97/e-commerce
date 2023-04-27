import utilStyles from '../styles/utils.module.css';
import styles from '../components/layout/layout.module.css';
import Image from 'next/image';


export default function Home ({allPostsData}) {

    return (
        <div className={styles.header}>
            <Image
                priority
                src="/images/logo.jpg"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
            />
            <section className={utilStyles.headingMd}>
                <p>Selise Bhutan</p>
                <p>E-Commerce</p>
            </section>
        </div>
    );
}

// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData();
//     return {
//         props: {
//             allPostsData,
//         },
//     };
// }
