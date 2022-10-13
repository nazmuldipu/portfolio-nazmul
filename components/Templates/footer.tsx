import { BiPhoneCall, BiEnvelope, BiMap } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function Footer() {
  return (
    <section className="bg-dark">
      <article className="max-w-7xl mx-auto p-6 md:p-8 text-light font-light">
        <h3 className="text-2xl">Contacts</h3>
        <div className="grid md:grid-cols-3 gap-6 pl-4 pt-4 md:pl-0">
          <div className="flex md:justify-center gap-2">
            <IconContext.Provider value={{ size: "30" }}>
              <BiPhoneCall />
            </IconContext.Provider>
            <div>
              <a className=" cursor-pointer" href="tel:+8801912239643">
                +880 1912 239643
              </a>
              <br />
              <a className=" cursor-pointer" href="tel:+8801766880448">
                +880 1766 880448
              </a>
            </div>
          </div>

          <div>
            <div className="flex md:justify-center gap-2">
              <IconContext.Provider value={{ size: "30" }}>
                <BiMap />
              </IconContext.Provider>
              <div>
                <a
                  className="cursor-pointer"
                  href="mailto:nazmuldipu@gmail.com"
                >
                  nazmuldipu@gmail.com
                </a>
                <br />
                <a
                  className=" cursor-pointer"
                  href="mailto:nazmul.alam@cefalo.com"
                >
                  nazmul.alam@cefalo.com
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="flex md:justify-center gap-2">
              <IconContext.Provider value={{ size: "30" }}>
                <BiEnvelope />
              </IconContext.Provider>
              <div>
                <span>
                  C/O: Mahiuddin Vila, <br /> Bhuigor Bus Stand (Westside)
                  <br />
                  Fatullah, Narayanganj - 1421
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
