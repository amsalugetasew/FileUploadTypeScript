module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("File", {
      FileName: {
        type: Sequelize.STRING
      },
      FileSize: {
        type: Sequelize.STRING
      },
      FileUploadDate: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return File;
  };