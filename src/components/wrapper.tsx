import { Outlet } from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';
import Main from '../components/main';

const Wrapper = () => {
  return (
    <div className="wrapper flex flex-col min-h-screen w-full max-w-6xl mx-auto px-4 xl:px-0" id="wrapper">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
};

export default Wrapper;
