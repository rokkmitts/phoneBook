import { useState, useEffect } from "react";
import Contact from "./Contact";
import Form from "./Form.jsx";
import tether from "./services/tether";
//
//
//
// Main Rendering Component
const App = () => {
  //
  //
  //
  //
  // UseStates for inputs and ClientSide data
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [data, setData] = useState([]);
  //
  //
  //
  //
  // listener for name input
  const nameInput = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  // listener for number input
  const numInput = (e) => {
    setNum(e.target.value);
    console.log(e.target.value);
  };
  //
  //
  //
  //
  // immediate setting client data with server data
  useEffect(() => {
    tether.getServerData().then((response) => setData(response));
  }, []);
  //
  //
  //
  //
  // conditionally invoked - builds Obj - sends to server - updates Client
  const dataBuilder = () => {
    const newObj = {
      name: name,
      phone: num,
      important: Math.random() > 0.5,
    };

    tether
      .addItemToServer(newObj)
      .then((response) => setData(data.concat(response)))
      .catch((error) => {
        console.log(`${error} --failure occured`);
      });

    setName("");
    setNum("");
  };
  //
  //
  //
  //
  // conditonally invoked - Checks for name matches
  const nameCheck = () => {
    const finder = data.some((e) => {
      return e.name === name;
    });

    return finder;
  };
  //
  //
  //
  //
  // main Fx to create contacts - processor that invokes other Fx's
  const dataProcessor = (e) => {
    e.preventDefault();

    if (!name || !num) {
      window.alert("Error! Enter values to continue");
      return;
    }

    if (!nameCheck()) {
      dataBuilder();
      return;
    }

    if (window.confirm("Change existing contacts number to whats entered?")) {
      const foundIt = data.find((e) => {
        return e.name === name;
      });

      const newObj = {
        ...foundIt,
        phone: num,
      };

      tether.construct(newObj.id, newObj).then((response) => {
        setData(data.map((n) => (n.id !== newObj.id ? n : response)));
      });
      setName("");
      setNum("");
      return;
    }
  };
  //
  //
  //
  //
  // toggles items importance values
  const changeImportance = (item) => {
    const newObj = {
      ...item,
      important: !item.important,
    };

    tether.construct(item.id, newObj).then((response) => {
      setData(data.map((n) => (n.id !== item.id ? n : response)));
    });
  };
  //
  //
  //
  //
  // handles onlick operations to delete item
  const removeItem = (item) => {
    if (window.confirm("Are you sure?")) {
      tether
        .deletion(item)
        .then((response) =>
          setData(data.filter((item) => item.id !== response.id))
        );
      window.alert("deleted");
    } else {
      window.alert("Canceling");
    }
  };
  //
  //
  //
  //
  // rendering space
  return (
    <>
      <Form
        dataProcessor={dataProcessor}
        nameInput={nameInput}
        numInput={numInput}
        name={name}
        num={num}
      />

      <div id="contacts-container">
        <ul>
          {data.length === 0 ? (
            <p>
              <i>No Contacts Availabe</i>
            </p>
          ) : (
            data.map((item) => {
              return (
                <Contact
                  changeImportance={changeImportance}
                  removeItem={removeItem}
                  item={item}
                  key={item.id}
                />
              );
            })
          )}
        </ul>
      </div>
    </>
  );
};

export default App;
