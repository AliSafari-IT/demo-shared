import { useState, useEffect } from "react";
import "./App.css";
import { InputFields } from "@asafarim/shared";
import "@asafarim/shared/dist/styles.css";
import "@asafarim/react-themes/styles.css"; // Optional base styles
import { ThemeProvider, ThemeToggle } from "@asafarim/react-themes";

function App() {
  interface FormState {
    [key: string]: string | boolean | number;
    radioGroup: string;
    switch: boolean;
    range: string;
    color: string;
    checkbox: boolean;
    select: string;
    text: string;
    email: string;
    tel: string;
    textarea: string;
    date: string;
    time: string;
    file: string;
    count: number;
  }

  const [demoValue, setDemoValue] = useState<FormState>({
    switch: false,
    text: "",
    email: "",
    tel: "",
    textarea: "",
    range: "50",
    color: "#000000",
    checkbox: false,
    radioGroup: "R1",
    select: "Option1",
    date: "",
    time: "",
    file: "",
    count: 1,
  });

  useEffect(() => {
    console.log(demoValue);
  }, [demoValue]);

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | string
      | boolean,
    name?: string,
    optionValue?: string
  ) => {
    if (name === "radioGroup" && optionValue) {
      setDemoValue((prev) => ({ ...prev, radioGroup: optionValue }));
      return;
    }

    if (typeof e === "string" || typeof e === "boolean") {
      if (name) {
        setDemoValue((prev) => ({ ...prev, [name]: e }));
      }
      return;
    }

    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const fieldName = target.name || name;
    if (!fieldName) return;

    let value: string | boolean = "";

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        value = target.checked;
      } else if (target.type === "radio") {
        if (!target.checked) return; // ignore unselected radios
        value = target.value;
      } else {
        value = target.value;
      }
    } else {
      value = target.value;
    }
    setDemoValue((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log("Submitting:", demoValue);
  };

  const handleReset = () => {
    setDemoValue({
      switch: false,
      text: "",
      email: "",
      tel: "",
      textarea: "",
      range: "50",
      color: "#000000",
      checkbox: false,
      radioGroup: "R1",
      select: "Option1",
      date: "",
      time: "",
      file: "",
      count: 1,
    });
  };

  const handleCount = () => {
    setDemoValue((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  return (
    <ThemeProvider defaultMode="dark" persistMode={true}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                A
              </div>
              <h1 className="text-xl font-semibold">ASafariM Components</h1>
            </div>
            <ThemeToggle
              size="sm"
              showLabels={false}
              className="border-0 flex items-center justify-center h-8 w-8"
            />
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-blue-500 font-medium">
                Components
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Examples
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Component Playground</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Test and interact with all available form components
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save changes
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <InputFields.Text
                label="Full Name"
                placeholder="Enter full name"
                name="text"
                onChange={handleChange}
              />
              <InputFields.Email
                label="Email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              />
              <InputFields.Tel
                label="Phone"
                placeholder="Enter phone"
                name="tel"
                onChange={handleChange}
              />
              <InputFields.Textarea
                label="Message"
                name="textarea"
                onChange={handleChange}
              />

              <div className="flex space-x-1">
                {["xs", "sm", "md", "lg"].map((size) => (
                  <InputFields.Checkbox
                    key={`checkbox-${size}`}
                    label={`Checkbox ${size}`}
                    name={`checkbox${size}`}
                    checked={Boolean(demoValue[`checkbox${size}`])}
                    onChange={handleChange}
                    size={size as any}
                  />
                ))}
              </div>

              <InputFields.Switch
                label="Switch"
                name="switch"
                checked={Boolean(demoValue.switch)}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Radio Group
                </label>
                <div className="flex space-x-4 p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                  {["R1", "R2", "R3"].map((option) => {
                    const isChecked = demoValue.radioGroup === option;
                    return (
                      <InputFields.Radio
                        key={option}
                        name="radioGroup"
                        label={option}
                        checked={isChecked}
                        onChange={() =>
                          handleChange(true, "radioGroup", option)
                        }
                        size="sm"
                        className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                          isChecked
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100 shadow-inner"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <InputFields.Select
                name="select"
                options={[
                  { value: "Option1", label: "Option 1" },
                  { value: "Option2", label: "Option 2" },
                  { value: "Option3", label: "Option 3" },
                ]}
                value={demoValue.select}
                onChange={handleChange}
              />

              <InputFields.Date
                label="Date"
                name="date"
                value={demoValue.date}
                onChange={handleChange}
              />
              <InputFields.Time
                label="Time"
                name="time"
                value={demoValue.time}
                onChange={handleChange}
              />
              <InputFields.File
                label="Upload File"
                name="file"
                onChange={handleChange}
              />

              <InputFields.Range
                label="Range"
                name="range"
                min={0}
                max={100}
                value={demoValue.range}
                onChange={handleChange}
                icon="📏"
                iconPosition="right"
                title="Range"
                size="sm"
              />

              <InputFields.Text
                label="Range Selected"
                value={demoValue.range}
                readOnly
              />

              <InputFields.Color
                label="Color"
                name="color"
                value={demoValue.color as string}
                onChange={handleChange}
              />

              <InputFields.Text
                label="Selected Color"
                value={demoValue.color as string}
                readOnly
              />
              <InputFields.Search
                label="Search Default"
                name="search"
                onChange={handleChange}
                key="search_01"
                placeholder="Enter search"
                styling="default"
                icon="🔍"
              />
              <InputFields.Search
                label="Search Compact"
                name="search"
                onChange={handleChange}
                key="search_02"
                placeholder="Enter search"
                styling="compact"
              />
              <InputFields.Search
                label="Search Minimal"
                name="search"
                onChange={handleChange}
                key="search_03"
                placeholder="Enter search"
                styling="minimal"
              />
            </form>
          </div>

          {/* Counter Section */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Counter Example</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Click the button to increment the counter
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">{demoValue.count}</span>
                <button
                  type="button"
                  onClick={handleCount}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Increment
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().getFullYear()} ASafariM Components. All rights
                reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <a
                  href="https://www.npmjs.com/package/@asafarim/shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm font-medium"
                >
                  View on npm →
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
