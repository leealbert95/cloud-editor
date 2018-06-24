const nameToExt = {
  Any: "",
  Text: ".txt",
  Javascript: ".js",
  JSON: ".json",
  HTML: ".html",
  CSS: ".css",
  CSV: ".csv"
};

const extToName = {};
Object.keys(nameToExt).forEach((name) => {
  extToName[nameToExt[name]] = name;
})

console.log(extToName);

module.exports = {
  nameToExt: nameToExt,
  extToName: extToName
}