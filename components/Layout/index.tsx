import Head from 'next/head';
import Nav from '../Nav';

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Todo list tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="m-8 p-8">
        <Nav />
        {children}
      </main>

      <footer></footer>
    </div>
  );
};

export default Layout;
