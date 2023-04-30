import React from "react";

const TagComponent = (props) => {
  return (
    <div className="tagComponent badge mb-2">
      <div className="tagComponent__text">{props.text}</div>
      <div
        className="tagComponent__close bg-light"
        onClick={() => {
          props.cullTagFromTags(props.text);
        }}
      >
        x
      </div>
      <div className="clearfix"></div>
    </div>
  );
};

const TagInput = (props) => {
  const [tags, setTags] = React.useState([]);
  const inputRef = React.useRef();
  const [inputValue, setInputValue] = React.useState("");

  const inputValueChangeHandler = (inputChange) => {
    setInputValue(inputChange);
    if (inputChange[inputChange.length - 1] === "," && inputChange.length > 1) {
      setTags([...tags, inputChange.slice(0, inputChange.length - 1)]);
      setInputValue("");
    }
  };
  const cullTagFromTags = (tag) => {
    setTags([...tags.filter((element) => element !== tag)]);
  };

  return (
    <div className="tagArea mb-3">
      <div className="tagArea__displayArea">
        {tags.map((tag) => (
          <TagComponent text={tag} cullTagFromTags={cullTagFromTags} />
        ))}
      </div>
      <input
        id="tags"
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={(event) => inputValueChangeHandler(event.target.value)}
        placeholder="Add tags separated by commas"
        className="tagArea__input form-control shadow"
      />
    </div>
  );
};

export default TagInput;
