import { Link } from "react-router-dom";
import { Button, CTA, ScrollToTop } from "../../components";

export const About = () => {
  return (
    <section className="mt-14 mb-20 px-4 md:px-0">
      <div className="ph-container mb-20">
        <h1 className="ph-heading--three text-center mb-6">About Us</h1>

        <div className="max-w-[800px] mx-auto mb-8">
          <p className="text-lg text-center mb-8">
            Welcome to PetHaven! Our mission is to make pet adoption easier,
            faster, and more meaningful. Whether you're looking for a furry
            friend or want to contribute to helping stray animals, we're here to
            guide you every step of the way.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Our Purpose</h2>
              <p className="text-lg">
                At PetHaven, we connect people with pets in need of loving
                homes. We believe every pet deserves a chance at happiness, and
                every person deserves the joy of having a pet. Through our
                platform, you can adopt, foster, or simply support pets in your
                community.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Our Features</h2>
              <ul className="list-disc pl-5">
                <li className="mb-2">Personalized pet recommendation quiz</li>
                <li className="mb-2">Easy application process for adoption</li>
                <li className="mb-2">Stories from other pet adopters</li>
                <li className="mb-2">Support for street dog management</li>
                <li className="mb-2">
                  Roles and functionalities for pet organizations
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <h2 className="text-xl font-semibold mb-4">Explore Our Features</h2>
            <p className="mb-6">
              PetHaven is more than just an adoption platform. From our
              personalized pet recommendation quiz to fostering stories from
              other adopters, we strive to make the pet adoption process
              seamless and meaningful. Explore all the ways we’re changing the
              way people adopt pets and support street animals.
            </p>
            <Link to="/">
              <Button
                label="Explore More"
                classNames="mx-auto"
                variant="primary"
              />
            </Link>
          </div>
        </div>
      </div>

      <CTA />

      <ScrollToTop />
    </section>
  );
};
