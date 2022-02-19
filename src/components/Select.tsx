import React, { useEffect, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import useWhyDidYouUpdate from "../hooks/useWhyDidYouUpdate";
import useLocalStorage from "../hooks/useLocalStorage";
import useKeyPress from "../hooks/useKeyPress";
import useHover from "../hooks/useHover";
import usePrevious from "../hooks/usePrevious";
import useAsync from "../hooks/useAsync";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import Option from "./Option";
import "./Select.css";

interface SelectProps {
  options?: string[];
}

// An async function for testing our hook.
// Will be successful 50% of the time.
const myFunction = async (): Promise<string> => {
  console.log('myFunction')
  return new Promise((resolve, reject) => {
    console.log('Promise')
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd <= 5
        ? resolve("Submitted successfully 🙌")
        : reject("Oh no there was an error 😞");
    }, 3000);
  });
};

const Select: React.FC<SelectProps> = (props) => {
  const { options = ["Option 1", "Option 2", "Option 3"] } = props;
  const [opened, toggleOpen] = React.useState(false);
  const [selected, setSelectValue] = React.useState<string | null>(null);
  const ref = React.useRef(null);

  const onOutsideClick = () => {
    toggleOpen(false);
  };

  const handler = () => {
    // console.log("handler");
    onOutsideClick()
  };

  const onSelect = (option: string) => {
    setSelectValue(option);
    toggleOpen(false);
  };

  const [clickOutsideCount] = useOnClickOutside({
    ref,
    handler: onOutsideClick,
  });
  const [clickOutsideCountPrev] = usePrevious<number>(clickOutsideCount);

  useEffect(() => {
    // console.log("clickOutsideCount", clickOutsideCount);
    // console.log("clickOutsideCountPrev", clickOutsideCountPrev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickOutsideCount]);

  const refInput = React.useRef(null);
  const [happyPress] = useKeyPress({
    ref: refInput,
    handler,
    targetKey: "h",
  });
  const [sadPress] = useKeyPress({
    ref: refInput,
    handler,
    targetKey: "s",
  });
  // const [esc] = useKeyPress({ handler, targetKey: "Escape" });
  const [esc] = useKeyPress({ ref, handler, targetKey: "Escape" });
  const [foxPress] = useKeyPress({
    ref: refInput,
    handler,
    targetKey: "f",
  });

  const [rating, setRating] = useLocalStorage<number>({
    key: "ID1",
    keyPrefix: "godareRating",
    initialValue: 5,
  });

  useEffect(() => {
    setRating(clickOutsideCount);
  }, [clickOutsideCount, rating, setRating]);

  const [isHovered] = useHover({ ref: refInput, handler });

  const [immediate, setImmediate] = useState(false);
  const {
    handler: asyncHandler,
    status,
    value,
    error,
  } = useAsync<string>(myFunction, immediate);
  useLockBodyScroll(immediate)

  // useWhyDidYouUpdate("Select", {
  //   ...props,
  //   opened,
  //   toggleOpen,
  //   selected,
  //   setSelectValue,
  //   rating,
  //   setRating,
  //   clickOutsideCount,
  //   isHovered,
  //   foxPress,
  //   esc,
  //   sadPress,
  //   happyPress,
  // });

  return (
    <div>
      <p>Outside click hook example</p>
      <p>Click outside count: {clickOutsideCount}</p>

      <div>
        {status === "idle" && (
          <div>Start your journey by clicking a button</div>
        )}
        {status === "success" && <div>{value}</div>}
        {status === "error" && <div>{error}</div>}
        <button
          onClick={() => {
            setImmediate(!immediate);
          }}
        >
          setImmediate
        </button>
        <button onClick={asyncHandler} disabled={status === "pending"}>
          {status !== "pending" ? "Click me" : "Loading..."}
        </button>
      </div>

      <input type="text" ref={refInput} />
      <div>
        {happyPress && "😊"}
        {sadPress && "😢"}
        {esc && "🤖"}
        {foxPress && "🦊"}
      </div>

      <div>{isHovered ? "😁" : "☹️"}</div>

      <div ref={ref} className="select-wrapper" tabIndex={0}>
        <div className="select" onClick={() => toggleOpen(true)}>
          <span>{selected || "null"}</span>
        </div>

        {opened && (
          <div className="ul-wrapper">
            <ul>
              {options.map((item, index) => (
                <Option key={index} option={item} onSelect={onSelect} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// export default withWhyDidYouUpdateHook(Select);
export default React.memo(Select);
