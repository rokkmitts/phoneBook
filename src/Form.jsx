const Form = ({ nameInput, numInput, name, num, dataProcessor }) => {
  return (
    <>
      <h2>Contacts Catalog</h2>
      <form action="">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={nameInput}
        />
        <input
          type="number"
          placeholder="Cell-Phone"
          value={num}
          onChange={numInput}
        />

        <button className="formBtn" onClick={dataProcessor}>
          Create Contact
        </button>
      </form>
    </>
  );
};
export default Form;
