const Contact = ({ item, changeImportance, removeItem }) => {
  const important = item.important ? "friend" : "business";
  return (
    <>
      <li key={item.id}>
        <button
          className="contactDel"
          onClick={() => {
            removeItem(item);
          }}
        >
          <span>
            {item.name} {" - "}
            {item.phone}
          </span>
        </button>

        <button
          id="contactBtn"
          onClick={() => {
            changeImportance(item);
          }}
          className={important}
        >
          {important}
        </button>
      </li>
    </>
  );
};

export default Contact;
