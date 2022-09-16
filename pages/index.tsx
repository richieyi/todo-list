import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mt-8 mb-2">Todo Lists made easy!</h1>
      <img src="/hero.jpg" />
      <span>Create an account to start today.</span>
    </div>
  );
};

export default Home;
