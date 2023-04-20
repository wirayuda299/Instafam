import Link from "next/link";

export default function Trending() {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url("/trending.jpg")` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content w-full text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Trending</h1>
          <p className="mb-5">
            Discover the most talked-about content on the internet right here on
            our trending page. Our team curates a dynamic selection of the
            latest and greatest posts, from viral videos to breaking news,
            ensuring that you always stay informed and entertained. Updated
            regularly, our trending page is your go-to source for the buzzworthy
            moments that are shaping our world today.
          </p>
          <Link className="btn" href={"/trending/posts"}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
