import HeroImg from "/hero.svg";
const Home = () => {
  return (
    <div className=" bg-gray-900 h-screen flex justify-center items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Gérer vos tickets intelligemment
          </h1>
          <p className="max-w-2xl mb-6 font-light  lg:mb-8 md:text-lg lg:text-xl text-gray-400">
            Tickety est un gestionnaire de tickets qui vous aidera a vous
            organiser
          </p>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={HeroImg} alt="mockup" />
        </div>
      </div>
    </div>
  );
};

export default Home;
