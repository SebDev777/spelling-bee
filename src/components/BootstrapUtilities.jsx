export function OffCanvas({ name, title, content }) {
  return (
    <>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        {name}
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
            {title}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div>{content ? content : <h1>Empty.</h1>}</div>
        </div>
      </div>
    </>
  );
}

export function toggleInput({ content, checked, onChange }) {
  return (
    <>
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={checked}
        onChange={onChange}
        style={{ transform: "scale(1.5)" }}
      ></input>
      <label
        class="form-check-label mx-4"
        for="flexSwitchCheckChecked"
        style={{ transform: "scale(1.15)" }}
      >
        {content + ` (${checked ? "ON" : "OFF"})`}
      </label>
    </>
  );
}

export function FormSelectOption({value, defaultValue=false}) {
  return (
    <option value={value} selected>{`${defaultValue ? "(Default) " : ""}` + value}</option>
  )
}

export function FormSelect({onChange, options}) {
  return (
    <select
      class="form-select mx-3"
      id="inputGroupSelect04"
      aria-label="Example select with button addon"
      onChange={onChange}
    >
      {options}
    </select>
  );
}
