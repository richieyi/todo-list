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

      <main>
        <div className="max-w-xl m-auto py-12 px-4 flex flex-col items-center">
          <Nav />
          <div className="w-full">{children}</div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default Layout;
