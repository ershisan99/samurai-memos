const Component = (props: componentPropTypes) => {
  return (
    <div>{`Hello, my name is ${props.name}, I am ${
      props.age
    } years old and I am ${props.isMarried ? "" : "not"} married`}</div>
  );
};
