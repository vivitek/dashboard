import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_ROUTER } from "../utils/apollo"
import { useEffect, useState } from "react";
import LoadingPage from "./Loading";

const BoxDetails = () => {
  const { id } = useParams();
  const { loading, error, data: routerData } = useQuery(GET_ROUTER, {
    variables: { routerId: id },
  });
  const [isRouterOnline, setIsRouterOnline] = useState(false);

  const { t } = useTranslation()

  useEffect(() => {
    if (routerData) {
      console.log(routerData)
      fetch(routerData.getRouter.url).then(() => {
        setIsRouterOnline(true)
      }).catch(() => {
        setIsRouterOnline(false)
      })
    }
  }, [routerData])

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 bg-green-400 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-2 flex flex-col">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.information")}</h3>
          <div className="flex justify-between mt-2">
            <h4 className="font-itc uppercase font-light">{t("boxDetails.name")}</h4>
            <span>{routerData.getRouter.name}</span>
          </div>
          <div className="flex justify-between mt-1">
            <h4 className="font-itc uppercase font-light">id</h4>
            <span>{routerData.getRouter._id.substr(0, 5)}...</span>
          </div>
          <div className="flex justify-between mt-4">
            <h4 className="font-itc uppercase font-light">{t("boxDetails.status")}</h4>
            {isRouterOnline ? <div className="bg-green-500 h-4 w-4 rounded-full"></div> : <div className="bg-red-500 h-4 w-4 rounded-full"></div>}
          </div>
          <div className="flex justify-evenly mt-4">
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
