import {Typography} from "@material-tailwind/react";
import DateSelector from "./DateSelector";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
      <>
          <div className={'h-[152px]'}>

          </div>
          <footer
              className={
                  "fixed bottom-0 z-10 h-max w-full max-w-full flex-shrink-0 rounded-none pointer-events-none"
              }
          >
              {/*Date Tabs*/}
              <DateSelector/>
              {/*Copyrights section*/}
              <Typography
                  variant={"small"}
                  placeholder={"Created By Rayan Ali Salem"}
                  className={"bg-black py-1 text-center text-white"}
              >
                  {/*Created By <span className={"font-bold"}>Rayan Ali Salem </span>©*/}
                  {year - 1}-{year} All Rights Reserved.
              </Typography>
          </footer>
      </>
  );
};

export default Footer;
