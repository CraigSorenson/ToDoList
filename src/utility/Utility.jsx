const makeFileDateTime = (ms) => {
    // Create date for file save in format YYYYMMDD_HHMM 20240531_1347
    const dateObj = new Date(ms);
    let dateStamp = "";
    dateStamp += dateObj.getFullYear().toString();
    dateStamp += (dateObj.getMonth() + 1).toString().padStart(2, "0");
    dateStamp += dateObj.getDate().toString().padStart(2, "0");
    dateStamp += "_";
    dateStamp += dateObj.getHours().toString().padStart(2, "0");
    dateStamp += dateObj.getMinutes().toString().padStart(2, "0");
    dateStamp += dateObj.getSeconds().toString().padStart(2, "0");
    return dateStamp;
  };
  
  export const exportJSON = async (
    toDoData,
    filename = `${makeFileDateTime(Date.now())}-todolist.json`
  ) => {
    const data = {
      version: "1.0.0",
      timestamp: Date.now(),
      data: toDoData,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.addEventListener("click", (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  export const readJsonFile = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });

  const mergeLists = (oldList=[], newList=[]) => {
    // we prefer items from the newer list if IDs conflict
    const newListIDs = new Set(newList.map(item => item.uuid));
    const result = oldList.filter(item => 
      (newListIDs.has(item.uuid) === false)
    )  
    return [...result, ...newList];
  }

  export const FileInput = (props) => {
    const {callback, list} = props;
    const onChange = async (event) => {
      if (event.target.files) {
        const parsedData = await readJsonFile(event.target.files[0]);
        const merged = mergeLists(parsedData.data, list); 
        callback(merged);
      }
    };
  
    return (
      <input type="file" accept=".json,application/json" onChange={onChange} />
    );
  };