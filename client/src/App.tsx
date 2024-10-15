import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the interface for form data
interface IFormInput {
  name: string;
  receiptId: string;
  desc: string;
  occupation: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(); // Add generic type for useForm
  const [formData, setFormData] = useState<IFormInput>({
    name: "",
    receiptId: "0",
    desc: "",
    occupation: "",
  });

  const createDownloadPdf: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await axios.post("http://localhost:5000/create-pdf", data);
      const secResult = await axios.get("http://localhost:5000/fetch-pdf", {
        responseType: "blob",
      });
      const pdfBlob = new Blob([secResult.data], { type: "application/pdf" });
      saveAs(pdfBlob, "certifiicate.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="App"
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>PDF GENERATOR</h1>
      <form onSubmit={handleSubmit(createDownloadPdf)}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: errors.name ? "5px" : "10px",
            }}
          />
          {errors.name && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="number"
            placeholder="Number"
            {...register("receiptId", { required: "Number is required" })}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: errors.receiptId ? "5px" : "10px",
            }}
          />
          {errors.receiptId && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.receiptId.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Write Something here..."
            {...register("desc", { required: "Description is required" })}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: errors.desc ? "5px" : "10px",
            }}
          />
          {errors.desc && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.desc.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Occupation"
            {...register("occupation", { required: "Occupation is required" })}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: errors.occupation ? "5px" : "10px",
            }}
          />
          {errors.occupation && (
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.occupation.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Download Pdf
        </button>
      </form>
    </div>
  );
}

export default App;
