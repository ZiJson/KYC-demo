import Input from "@/components/Input";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [value, setValue] = useState<string>("");
  const [date, setDate] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (value: string) => {
    setValue(value);
    console.log(value);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-40">
      <Input type="phone" placeholder="Name" />
      <Select value={value} onChange={handleChange} options={mockOptions} />
      <DatePicker onChange={setDate} value={date} />
      <FileUpload onChange={setFiles} value={files} />
    </div>
  );
}

export default App;

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
  { value: "option6", label: "Option 6" },
  { value: "option7", label: "Option 7" },
  { value: "option8", label: "Option 8" },
  { value: "option9", label: "Option 9" },
  { value: "option10", label: "Option 10" },
];
