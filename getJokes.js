const { exec } = require("child_process");

module.exports = async () => {
  return new Promise((resolve, reject) => {
    try {
      exec("curl https://icanhazdadjoke.com", (error, stdout, stderr) => {
        return resolve(stdout);
      });
    } catch (error) {
      return reject(error);
    }
  });
};