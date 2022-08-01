import Head from 'next/head';
import Image from 'next/image';
import Nav from '../Nav';

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Todo list tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Nav />
        {children}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={72}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
