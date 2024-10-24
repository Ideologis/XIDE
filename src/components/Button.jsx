import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
export function ButtonDestructive({text, border = true}) {
  return (
    <>
      <div className="flex justify-center items-center max-sm:px-4">
        <NavLink to= "/about">
        <Button
          variant="destructive"
          className="transition duration-300 ease-in-out transform hover:scale-105  max-sm:px-2 text-center px-6 py-4 m-6  max-sm:py-2 max-sm:m-4"
        >
          {text}
        </Button>

        </NavLink>

      </div>
      {border && (
        <hr className="w-full border-t border-gray-300 my-4 max-sm:my-2" />
      )}
    </>
  );
}
