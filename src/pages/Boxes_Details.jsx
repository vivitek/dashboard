import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_BANS_FOR_ROUTER, GET_ROUTER, ON_BAN_CREATED, UPDATE_BAN } from "../utils/apollo";
import { FireworkSpinner, TraceSpinner } from "react-spinners-kit"
import { useEffect, useState } from "react";
import LoadingPage from "./Loading";
import TablePagination from "../components/Table";
import { toast } from "react-toastify";
import Tick from "../images/Tick";
import Cross from "../images/Cross";

const BoxDetails = () => {
  const { id } = useParams();
  const { loading, error, data: routerData } = useQuery(GET_ROUTER, {
    variables: { routerId: id },
  });
  const { data: historyData } = useQuery(GET_BANS_FOR_ROUTER, {
    variables: { routerId: id }
  });
  const [updateBan] = useMutation(UPDATE_BAN)
  const [isRouterOnline, setIsRouterOnline] = useState(false);
  const [connections, setConnections] = useState([])
  const [chronology, setChronology] = useState([])

  const {
    error: subError,
    data: subData,
  } = useSubscription(ON_BAN_CREATED, {
    variables: {
      routerId: id
    },
  });

  const { t } = useTranslation()

  const mutateBan = async (data) => {
    try {
      const res = await updateBan({
        variables: {
          banUpdate: { ...data },
        },
      });
      if (res?.errors?.length > 0) {
        toast.error("Oops!\n" + res.errors.join("\n"));
      } else {
        toast.success("Your modification has been processed")
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  const updateChronology = (ban) => {
    setChronology(old => [ban, ...old]);
    setConnections(old => old.filter((e) => e._id !== ban._id));
  }

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

  useEffect(() => {
    if (subData?.banCreated && !chronology.find((e) => e._id === subData?.banCreated._id)) {
      const { address, _id } = subData.banCreated;

      const found = connections.find(
        (e) => e.address === address || e._id === _id
      );
      if (!found) {
        setConnections((old) => [...old, { address, _id }]);
      }
    }
  }, [subData, connections, chronology])


  useEffect(() => {
    if (historyData?.getBans) {
      setChronology([...historyData.getBans])
    }
  }, [historyData])

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

  if (subError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>subError</h1>
        <p>{subError.message}</p>
      </div>
    )
  }


  return (
    <div className="w-full h-full flex flex-col lg:flex-row py-4">
      <div className="w-auto lg:w-1/5 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col">
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
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col h-full mt-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.chronology")}</h3>
          {chronology.length === 0 &&
            <div className="h-full w-full flex flex-col justify-center items-center">
              <TraceSpinner size="10" sizeUnit="rem" />
              <h3>Loading chronology...</h3>
            </div>}
          {
            chronology.length !== 0 && <TablePagination tableName={`box-${routerData.getRouter.name}-chronology`} headers={[
              {
                name: "Address",
                key: "address",
                export: true,
                class: "text-left"
              },
              {
                name: "Banned",
                key: "banned",
                export: true,
                class: ""
              },
              {
                name: "Actions",
                key: "actions",
                export: false,
                class: "text-right"
              }
            ]} data={
              chronology.map((e) => {
                return (
                  {
                    id: e._id,
                    address: {
                      value: e.address,
                      class: ""
                    },
                    banned: {
                      value: e.banned ? "Yes" : "No",
                      class: "text-center"
                    },
                    actions: {
                      value: <div className="flex">
                        <div className="cursor-pointer h-6" onClick={() => {
                          mutateBan({ _id: e._id, banned: false })
                        }}>
                          <Tick className="h-full" />
                        </div>
                        <div className="cursor-pointer h-6" onClick={() => {
                          mutateBan({ _id: e._id, banned: true })
                        }}>
                          <Cross className="h-full" />
                        </div>
                      </div>,
                      class: ""
                    }
                  }
                )
              })
            } />
          }
        </div>
      </div>
      <div className="w-auto lg:w-3/5 px-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.connections")}</h3>
          {connections.length === 0 &&
            <div className="h-full w-full flex flex-col justify-center items-center">
              <FireworkSpinner size="10" sizeUnit="rem" />
              <h3>Listening for connections...</h3>
            </div>}
          {
            connections.length !== 0 && <TablePagination tableName={`box-${routerData.getRouter.name}-connections`} headers={[
              {
                name: "Address",
                key: "address",
                export: true,
                class: ""
              },
              {
                name: "Actions",
                key: "actions",
                export: false,
                class: "text-right"
              }
            ]} data={
              connections.map((e) => {
                return (
                  {
                    id: e._id,
                    address: {
                      value: e.address,
                      class: ""
                    },
                    actions: {
                      value: <div className="flex justify-end">
                        <div className="cursor-pointer h-8" onClick={async () => {
                          mutateBan({ _id: e._id, banned: false })
                          updateChronology(e)
                        }}>
                          <Tick className="h-full" />
                        </div>
                        <div className="cursor-pointer h-8" onClick={async () => {
                          mutateBan({ _id: e._id, banned: true })
                        }}>
                          <Cross className="h-full" />
                        </div>
                      </div>,
                      class: "text-right"
                    }
                  }
                )
              })
            } />
          }

        </div>
      </div>
      <div className="w-auto lg:w-1/5 px-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.services")}</h3>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h3>Coming Soon...</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
