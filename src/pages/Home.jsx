const Home = () => {
    return (
    <div className="bg-grayBlue text-white h-full">
      <iframe
        title="server statistics"
        style={{height: "100%", width: "100%"}}
        src="https://grafana.server.vincipit.com/d/3ipsWfViz/traefik?orgId=1&refresh=10sw"
      />
    </div>
    );
};

export default Home;
