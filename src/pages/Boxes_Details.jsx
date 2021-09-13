import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const BoxDetails = () => {
  const { t } = useTranslation()
  //const { id } = useParams()


  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 bg-green-400 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-2 flex flex-col">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.information")}</h3>
          <div className="flex justify-between mt-2">
            <h4>{t("boxDetails.name")}</h4>
            <span>Somethign</span>
          </div>
          <div className="flex justify-between mt-1">
            <h4>{t("boxDetails.name")}</h4>
            <span>Somethign</span>
          </div>
          <div className="flex justify-between mt-4">
            <h4>{t("boxDetails.name")}</h4>
            <span>Somethign</span>
          </div>
          <div className="flex justify-start mt-4">
            <button>Off</button>
            <button>Reboot</button>
          </div>
        </div>
        <div className="dark:bg-darkBlue rounded-lg p-2 flex flex-col h-full mt-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.chronology")}</h3>
        </div>
      </div>
      <div className="w-auto lg:w-3/5 bg-red-400 px-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.connections")}</h3>
        </div>
      </div>
      <div className="w-auto lg:w-1/5 bg-yellow-400 px-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.services")}</h3>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
