export async function checkProxy(proxy) {
  let request = require("request");

  const { type, ipport } = proxy;
  const timeout = 2000;
  const proxy_type = type;

  let options = {
    uri: "http://nodejs.org/api/",
    method: "GET",
    agent: getAgent(proxy_type, ipport),
    timeout: Number(timeout),
  };
  console.log(JSON.stringify(options));

  return new Promise((resolve, reject) => {
    let req = request.get(options);
    req.on("response", (res) => {
      resolve(res);
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

function getAgent(proxyType, ipPort) {
  let { SocksProxyAgent } = require("socks-proxy-agent");
  let HttpProxyAgent = require("http-proxy-agent");
  let HttpsProxyAgent = require("https-proxy-agent");
  if (proxyType === "http") {
    return new HttpProxyAgent(proxyType + "://" + ipPort);
  }
  return proxyType === "https"
    ? // eslint-disable-next-line no-undef
      new HttpsProxyAgent(proxyType + "://" + ipPort)
    : // eslint-disable-next-line no-undef
      new SocksProxyAgent(proxyType + "://" + ipPort);
}

export async function checkHttpProxy(proxy_address) {
  var url = require("url");
  var http = require("http");
  var HttpProxyAgent = require("http-proxy-agent");

  // HTTP/HTTPS proxy to connect to
  var proxy = process.env.http_proxy || "http://" + proxy_address.ipport;
  console.log("using proxy server %j", proxy);

  // HTTP endpoint for the proxy to connect to
  var endpoint = process.argv[2] || "http://nodejs.org/api/";
  console.log("attempting to GET %j", endpoint);
  var opts = url.parse(endpoint);

  // create an instance of the `HttpProxyAgent` class with the proxy server information
  var agent = new HttpProxyAgent(proxy);
  opts.agent = agent;

  return new Promise((resolve, reject) => {
    let req = http.get(opts);
    req.on("response", (res) => {
      resolve(res);
    });
    req.on("error", (err) => {
      reject(err);
    });
    req.end();
  });
}
export async function checkProxyStatus(proxy) {
  var url = require("url");
  var http = require("http");
  var { SocksProxyAgent } = require("socks-proxy-agent");

  // SOCKS proxy to connect to
  var ipport = "socks://" + proxy.ipport || "socks://47.243.95.228:10080";
  console.log("using proxy server %j", ipport);

  // HTTP endpoint for the proxy to connect to
  var endpoint = process.argv[2] || "http://nodejs.org/api/";
  console.log("attempting to GET %j", endpoint);
  var opts = url.parse(endpoint);

  // create an instance of the `SocksProxyAgent` class with the proxy server information
  var agent = new SocksProxyAgent(ipport);
  opts.agent = agent;

  const res = http.get(opts);
  //  function (res) {
  // console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
  const { statusCode } = res;
  // const contentType = res.headers["content-type"];
  if (statusCode === 200) {
    return "ALIVE";
  } else return "DIE";
}

export async function checkProxyByUserPassword(address, username, password) {
  var https = require("https");
  var { SocksProxyAgent } = require("socks-proxy-agent");

  const info = {
    hostname: address,
    userId: username,
    password: password,
  };
  const agent = new SocksProxyAgent(info);

  https.get("https://ipinfo.io", { agent }, (res) => {
    console.log(res);
    res.pipe(process.stdout);
  });
}
