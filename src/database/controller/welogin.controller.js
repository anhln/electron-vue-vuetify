import db from "../models/index";

const Proxy = db.proxies;
const Group = db.groups;
const Profile = db.profiles;

export const createProxy = (proxy) => {
  return Proxy.create({
    type: proxy.type,
    ipport: proxy.ipport,
    username: proxy.username,
    password: proxy.password,
    status: proxy.status,
  })
    .then((proxy) => {
      console.log(">> Created proxy: " + JSON.stringify(proxy, null, 4));
      return proxy;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

export const updateProxy = (proxy) => {
  return Proxy.update(
    {
      type: proxy.type,
      ipport: proxy.ipport,
      username: proxy.username,
      password: proxy.password,
      status: proxy.status,
    },
    { where: { id: proxy.id } }
  );
};

export const fetchProxyList = () => {
  const proxyList = Proxy.findAll({ raw: true });
  return proxyList;
};

export const fetchGroupsList = () => {
  return Group.findAll({ raw: true });
};

export const createGroup = (group) => {
  Group.create({
    name: group.name,
    description: group.description,
  });
};

export const updateGroup = (group) => {
  return Group.update(
    {
      name: group.name,
      description: group.description,
    },
    { where: { id: group.id } }
  );
};

/* ---------- PRofiles -------*/

export const fetchProfilesList = () => {
  return Profile.findAll({ raw: true, include: Proxy });
};

export const createProfile = (profile) => {
  Profile.create({
    name: profile.name,
    note: profile.note,
    proxyId: profile.proxyId,
    groupId: profile.groupId,
  });
};

export const updateProfile = (profile) => {
  return Profile.update(
    {
      name: profile.name,
      note: profile.description,
      ProxyId: profile.ProxyId,
      GroupId: profile.GroupId,
    },
    { where: { id: profile.id } }
  );
};
