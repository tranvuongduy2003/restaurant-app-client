import Link from 'next/link';
import Image from 'next/image';
import FoodCard from 'components/home/FoodCard';
import CategoryCard from 'components/home/CategoryCard';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  const headerInViewAnimation = useRef<any>(null);
  const popularInViewAnimation = useRef<any>(null);
  const categoryInViewAnimation = useRef<any>(null);
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [popularRef, popularInView] = useInView({ triggerOnce: true });
  const [categoryRef, categoryInView] = useInView({ triggerOnce: true });
  const headingAnimation = useAnimation();
  const discoverAnimation = useAnimation();
  const poularSliderAnimation = useAnimation();
  const popularIntroAnimation = useAnimation();
  const categoryTitleAnimation = useAnimation();
  const categoryDescAnimation = useAnimation();
  const categorySliderAnimation = useAnimation();

  // Variants
  const topToBottomAnimation = {
    y: [-100, 0],
    opacity: [0, 1],
    transition: { duration: 1.2, delay: 0.5 },
  };

  const bottomToTopVariants = {
    y: [60, 0],
    opacity: [0, 1],
    transition: { duration: 1.2, delay: 0.5 },
  };

  const rightToLeftVariants = {
    x: [60, 0],
    opacity: [0, 1],
    transition: { duration: 1.2, delay: 0.3 },
  };

  const leftToRightVariants = {
    x: [-100, 0],
    opacity: [0, 1],
    transition: { duration: 1.2, delay: 0.3 },
  };

  // Animation start function
  headerInViewAnimation.current = () => {
    if (headerInView) {
      headingAnimation.start(topToBottomAnimation);
      discoverAnimation.start(bottomToTopVariants);
    }
  };

  popularInViewAnimation.current = () => {
    if (popularInView) {
      poularSliderAnimation.start({
        opacity: [0, 1],
        transition: { duration: 1.2, delay: 0.3 },
      });
      popularIntroAnimation.start(rightToLeftVariants);
    }
  };

  categoryInViewAnimation.current = () => {
    if (categoryInView) {
      categoryTitleAnimation.start(leftToRightVariants);
      categoryDescAnimation.start(rightToLeftVariants);
      categorySliderAnimation.start(bottomToTopVariants);
    }
  };

  // Mount animation event
  useEffect(() => {
    headerInViewAnimation.current();
  }, [headerInView]);

  useEffect(() => {
    popularInViewAnimation.current();
  }, [popularInView]);

  useEffect(() => {
    categoryInViewAnimation.current();
  }, [categoryInView]);

  return (
    <>
      {/* Header */}
      <header className="grid grid-cols-2 py-10 px-14">
        <div ref={headerRef} className="pl-10 my-auto">
          <motion.h1
            animate={headingAnimation}
            className="mb-10 text-6xl font-bold leading-snug"
          >
            Những
            <br />
            <span className="text-secondary">Món ăn ngon</span> đang
            <br />
            Chờ đợi <span className="text-secondary">bạn</span>
          </motion.h1>
          <motion.div animate={discoverAnimation} className="mb-20">
            <Link
              href="/menu"
              className="inline-flex items-center px-5 py-4 text-lg font-medium text-white rounded-br-none shadow-lg gap-x-5 rounded-2xl bg-primary"
            >
              <span>Khám phá ngay</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </motion.div>
          <motion.div animate={discoverAnimation} className="flex gap-x-4">
            <div className="p-4 rounded-lg shadow-2xl">
              <Image
                src="/salad.png"
                alt="header-logo"
                width={40}
                height={40}
              />
            </div>
            <div className="p-4 rounded-lg shadow-2xl">
              <Image
                src="/rice-bowl.png"
                alt="header-logo"
                width={40}
                height={40}
              />
            </div>
            <div className="p-4 rounded-lg shadow-2xl">
              <Image
                src="/soy-sauce.png"
                alt="header-logo"
                width={40}
                height={40}
              />
            </div>
            <div className="p-4 rounded-lg shadow-2xl">
              <Image
                src="/steamed-fish.png"
                alt="header-logo"
                width={40}
                height={40}
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.2 } }}
          className="w-full p-16"
        >
          <Image
            src="/food-1.png"
            alt="poster"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </header>
      {/* Popular food  */}
      <section ref={popularRef} className="grid grid-cols-2 px-24 py-10 mb-10">
        <motion.div
          animate={poularSliderAnimation}
          className="flex justify-end mr-20 gap-x-10 slider"
        >
          <FoodCard
            url="/food-2.png"
            title="Lorem ipsum"
            description="Lorem ipsumflkasjdkfjsalkdfjk"
            price={1000}
          ></FoodCard>
          <FoodCard
            url="/food-2.png"
            title="Lorem ipsum"
            description="Lorem ipsumflkasjdkfjsalkdfjk"
            price={1000}
          ></FoodCard>
        </motion.div>
        <motion.div animate={popularIntroAnimation} className="my-auto">
          <h2 className="mb-10 text-4xl font-bold leading-snug">
            We have Delicious food
            <br />
            Tasty food in town
          </h2>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            deleniti ipsa eveniet suscipit sed aspernatur voluptas repellendus,
            sapiente
          </p>
        </motion.div>
      </section>
      {/* Caterogies */}
      <section ref={categoryRef} className="px-24 py-10">
        <div className="flex items-center justify-between w-full mb-10">
          <motion.h2
            animate={categoryTitleAnimation}
            className="mb-10 text-4xl font-bold leading-snug"
          >
            Our <span className="text-secondary">Best Deliveried</span>
            <br />
            Categories
          </motion.h2>
          <motion.p
            animate={categoryDescAnimation}
            className="text-lg leading-relaxed"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            Assumenda asperiores consequatur reprehenderit!
          </motion.p>
        </div>
        <motion.div
          animate={categorySliderAnimation}
          className="flex w-full mb-10 justify-evenly slider"
        >
          <CategoryCard url="/food-3.png" title="Việt Nam"></CategoryCard>
          <CategoryCard url="/food-3.png" title="Việt Nam"></CategoryCard>
          <CategoryCard url="/food-3.png" title="Việt Nam"></CategoryCard>
        </motion.div>
      </section>
    </>
  );
}
