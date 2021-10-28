import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_BANS_FOR_ROUTER, GET_ROUTER, ON_BAN_CREATED, UPDATE_BAN } from "../utils/apollo";
import { useEffect, useState } from "react";
import LoadingPage from "./Loading";
import TablePagination from "../components/Table";
import { toast } from "react-toastify";
// import Tick from "../images/Tick";
// import Cross from "../images/Cross";
import { Spinner, Table, Tick, Close } from "@vivitek/toolbox";

const BoxDetails = () => {
  const { id } = useParams();
  const { loading, error, data: routerData } = useQuery(GET_ROUTER, {
    variables: { routerId: id },
  });
  const { data: historyData } = useQuery(GET_BANS_FOR_ROUTER, {
    variables: { routerId: id }
  });
  const [updateBan] = useMutation(UPDATE_BAN)
  const [name, setName] = useState("");
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
        setName(localStorage.getItem(routerData.getRouter._id + "_name"))
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
      <div className="w-auto 2xl:w-1/5 lg:w-2/5 md:w-full sm:w-2/5 px-4 flex flex-col">
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col mb-2">
          <h3 className="font-itc uppercase font-medium">{t("boxDetails.information")}</h3>
          <div className="flex justify-between mt-2">
            <h4 className="font-itc font-light">{t("boxDetails.name")}</h4>
            <span>{name || routerData.getRouter.name}</span>
          </div>
          <div className="flex justify-between mt-1">
            <h4 className="font-itc font-light">{t("boxDetails.id")}</h4>
            <span>{routerData.getRouter._id.match(/.{1,6}/g).join('-')}</span>
          </div>
          <div className="flex justify-between mt-4 items-center">
            <h4 className="font-itc font-light">{t("boxDetails.status")}</h4>
            {isRouterOnline ? <div className="bg-green-500 h-3 w-3 mt-2 rounded-full"></div> : <div className="bg-red-500 h-4 w-4 mt-2 rounded-full"></div>}
          </div>
          <div className="flex justify-evenly mt-4">
            <button className="bg-viviRed text-white px-6 py-2 rounded-full hover:bg-viviRed-500 transition duration-200 each-in-out font-sans font-bold text-sm">{t("boxDetails.off")}</button>
            <button className="bg-viviBlue text-white px-6 py-2 rounded-full hover:bg-viviBlue-500 transition duration-200 each-in-out font-sans font-bold text-sm">{t("boxDetails.reboot")}</button>
          </div>
        </div>
        <div className="dark:bg-darkBlue rounded-lg p-4 flex flex-col h-full mt-2">
          <h3 className="font-itc uppercase font-medium md:mb-0 mb-4">{t("boxDetails.chronology")}</h3>
          {chronology.length === 0 ?
            <div className="h-full w-full flex flex-col justify-center items-center">
              <Spinner size="150px"></Spinner>
              <h3 className="mt-4">{t("boxDetails.chronologyLoading")}</h3>
            </div>
          :
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
                class: ""
              }
            ]} data={
              chronology.map((e) => {
                return (
                  {
                    id: e._id,
                    address: {
                      value: e.address,
                      class: "px-3"
                    },
                    banned: {
                      value: e.banned ? "Yes" : "No",
                      class: "text-center"
                    },
                    actions: {
                      value: <div className="flex justify-evenly sm:px-4 md:px-2">
                        <div className="cursor-pointer h-4" onClick={() => {
                          mutateBan({ _id: e._id, banned: false })
                        }}>
                          <Tick color="white" size={20} />
                        </div>
                        <div className="cursor-pointer h-6" onClick={() => {
                          mutateBan({ _id: e._id, banned: true })
                        }}>
                          <Close className="" color="white" />
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
      <div className="w-auto 2xl:w-4/5 sm:w-3/5 lg:w-3/5 md:w-full mt-4 px-4 2xl:px-0 2xl:pr-4 xl:mt-0 lg:px-0 lg:pr-4 lg:mt-0 md:px-4 md:mt-4">
        <div className="h-full dark:bg-darkBlue rounded-lg flex flex-col p-4">
          <h3 className="font-itc uppercase font-medium md:mb-0 mb-4">{t("boxDetails.connections")}</h3>
          {connections.length === 0 ?
            <div className="h-full w-full flex flex-col justify-center items-center">
              <Spinner size="250px"></Spinner>
              <h3 className="mt-4">{t("boxDetails.listening")}</h3>
            </div>
            :
              <Table
                className=""
                itemsPerPage={15}
                headers={[
                  { name: "address", cellClassName: "h-12 ", headerClassName: ""},
                  { name: "actions", cellClassName: "h-12 flex justify-evenly", headerClassName: "text-center w-1/4"},
                ]}
                data={connections.map(c => {return {
                  address: c.address,
                  actions: (
                    <div className='flex justify-between' style={{width: "5rem"}}>
                      <button onClick={async () => {
                          console.log('not banned')
                          mutateBan({ _id: c._id, banned: false })
                          updateChronology(c)
                      }}>
                        <Tick color="white" size={20}/>
                      </button>
                      <button onClick={async () => {
                        console.log("banned")
                        mutateBan({ _id: c._id, banned: true })
                        updateChronology(c)
                      }}>
                        <Close color="white"/>
                      </button>
                    </div>
                  )
                }})}
              />
            }

          {/* {
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
          } */}

        </div>
      </div>
    </div>
  );
};

export default BoxDetails;
