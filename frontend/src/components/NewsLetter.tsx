const Newsletter = () => {
    return (
      <section className="bg-[#faf6ee] py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Love Thrift Finds?</h2>
        <p className="text-neutral-700 max-w-xl mx-auto mb-8">
          Join our mailing list to score early access to rare vintage drops, special offers, and eco-friendly fashion updates. No spam—just good stuff.
        </p>
  
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto"
        >
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="w-full sm:w-[400px] px-4 py-3 border-b-2 border-warmBrown bg-white text-neutral-800 font-semibold placeholder:text-neutral-400 outline-none focus:border-[#c47a56] transition"
          />
          <button
            type="submit"
            className="bg-warmBrown text-white px-6 py-3 font-bold hover:bg-neutral-800 transition"
          >
            SIGN UP
          </button>
        </form>
  
        <p className="text-sm text-neutral-500 mt-4">
          Unsubscribe anytime. Read our{" "}
          <a href="#" className="underline font-semibold">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline font-semibold">
            Terms
          </a>
          .
        </p>
      </section>
    );
  };
  
  export default Newsletter;
  
  