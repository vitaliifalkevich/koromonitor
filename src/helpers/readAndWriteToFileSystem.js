export const makeCountryRecord = (countries, callBackResult) => {
  tizen.filesystem.resolve('documents', function(dir) {
    function onsuccess(files) {
      let coromonitorDir;
      let isDirectoryExists = files.find(
        item => item.name === 'coromonitor' && item.isDirectory
      );
      coromonitorDir = isDirectoryExists;
      if (!isDirectoryExists) {
        coromonitorDir = dir.createDirectory('coromonitor');
      }
      coromonitorDir.listFiles(files => {
        let chosenCountriesFile;
        let isFile = files.find(
          item => item.name === 'chosenCountries.txt' && item.isFile
        );
        chosenCountriesFile = isFile;
        if (!isFile) {
          chosenCountriesFile = coromonitorDir.createFile(
            'chosenCountries.txt'
          );
        }
        chosenCountriesFile.openStream(
          'w',
          function(fs) {
            fs.write(countries);
            fs.close();
            callBackResult(true);
          },
          function(e) {
            console.log('Error ' + e.message);
            callBackResult(e.message);
          },
          'UTF-8'
        );
      });
    }

    function onerror(error) {
      console.log(
        'The error ' +
          error.message +
          ' occurred when listing the files in the selected folder'
      );
    }

    dir.listFiles(onsuccess, onerror);
  });
};

export const readCountriesFromTizenFileSystem = callBackResult => {
  /*TODO write validation of directories and files such like in write function above*/
  tizen.filesystem.resolve('documents', function(dir) {
    function onsuccess(files) {
      let isDirectoryExists = files.find(
        item => item.name === 'coromonitor' && item.isDirectory
      );

      if (!isDirectoryExists) {
        callBackResult(null);
        return;
      }

      let fileToRead = dir.resolve('coromonitor/chosenCountries.txt');
      if (fileToRead.isFile) {
        fileToRead.openStream(
          'r',
          function(fs) {
            try {
              let text = fs.read(fileToRead.fileSize);
              fs.close();
              callBackResult(text);
            } catch (err) {
              callBackResult(null);
            }
          },
          function(e) {
            callBackResult(null);
          },
          'UTF-8'
        );
      } else {
        callBackResult(null);
      }
    }

    function onerror(error) {
      console.log(
        'The error ' +
          error.message +
          ' occurred when listing the files in the selected folder'
      );
    }

    dir.listFiles(onsuccess, onerror);
  });
};

export const deleteFiles = () => {
  tizen.filesystem.resolve('documents', function(dir) {
    /*Firstly choose what to delete*/
    let fileToDelete = dir.resolve('coromonitor/chosenCountries.txt');
    let directory1 = dir.resolve('coromonitor');

    /*Delete*/
    dir.deleteFile(
      fileToDelete.fullPath,
      function() {
        console.log('File Deleted');
      },
      function(e) {
        console.log('Error' + e.message);
      }
    );
    dir.deleteDirectory(
      directory1.fullPath,
      true,
      function() {
        console.log('coromonitor Deleted');
      },
      function(e) {
        console.log('Error' + e.message);
      }
    );
  });
};
