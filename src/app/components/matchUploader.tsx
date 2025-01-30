"use client";

import { useState, ChangeEvent, useRef } from "react";
import * as XLSX from "xlsx";

type TableRow = Record<string, Record<string, unknown>>;

export default function MatchUploader() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]); // Store headers separately
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      // Check if the file is an Excel file
      const allowedExtensions = ["xlsx", "xls"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = e.target?.result;
          if (data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0]; // Read the first sheet
            if (sheetName === undefined) {
              //removing red squiggly even though this can never happen
              return;
            }
            const worksheet = workbook.Sheets[sheetName];
            if (worksheet === undefined) {
              //removing red squiggly even though this can never happen
              return;
            }
            const jsonData: TableRow[] = XLSX.utils.sheet_to_json(worksheet);
            // Extract headers (keys from the first row of the JSON data)
            if (jsonData[0] === undefined) {
              return;
            }

            // Time on HH:MM:SS is in decimal right now. Decimal is representing the percent of a day.
            // Conversion is multiply by 24 to get the hours, for the remainder multiply by 60 to get the minutes
            // for the remainder multiply by 60 to get the seconds.

            jsonData.map((row) => {
              row["video"] = row["VIDEO"];
              //Brain too small using both ["HH:MM:SS"] and ["(s)"] for the time stamps
              row["timeStampedHours"] = Math.floor(row["HH:MM:SS"] * 24);
              row["timeStampedMinutes"] = Math.floor(row["(s)"] / 60) % 60;
              row["timeStampedSeconds"] = row["(s)"] % 60;
              row["startingSeconds"] = row["(s)"];
              row["hyperlinkSeconds"] =
                row["timeStampedHours"].toString().padStart(2, "0") +
                "h" +
                row["timeStampedMinutes"].toString().padStart(2, "0") +
                "m" +
                row["timeStampedSeconds"].toString().padStart(2, "0") +
                "s";
              row["playerOneName"] = row["1P NAME"];
              row["playerOneChar"] = row["1P CHAR"];
              row["playerOneSA"] = row["1P SA"];
              if (row["1P WIN/LOSS"] === "O") {
                row["playerOneWinLoss"] = true;
              } else {
                row["playerOneWinLoss"] = false;
              }
              if (row["1P Perfect"] === undefined) {
                row["playerOnePerfect"] = 0;
              } else {
                row["playerOnePerfect"] = row["1P Perfect"];
              }
              row["playerTwoName"] = row["2P NAME"];
              row["playerTwoChar"] = row["2P CHAR"];
              row["playerTwoSA"] = row["2P SA"];
              if (row["2P WIN/LOSS"] === "O") {
                row["playerTwoWinLoss"] = true;
              } else {
                row["playerTwoWinLoss"] = false;
              }
              if (row["2P Perfect"] === undefined) {
                row["playerTwoPerfect"] = 0;
              } else {
                row["playerTwoPerfect"] = row["2P Perfect"];
              }
              if (row["Mirror"] === undefined) {
                row["mirror"] = "";
              } else {
                row["mirror"] = row["Mirror"];
              }
              row["event"] = row["EVENT"];
              row["type"] = row["Type"];
              row["date"] = row["DATE"];
              row["location"] = row["Location"];
              row["breakdown"] = row["Breakdown"];
              row["version"] = row["Version"];
              row["ytDescription"] = row["YT description"];
              delete row["VIDEO"];
              delete row["HH:MM:SS"];
              delete row["(s)"];
              delete row["&t="];
              delete row["1P NAME"];
              delete row["1P CHAR"];
              delete row["1P SA"];
              delete row["1P WIN/LOSS"];
              delete row["2P NAME"];
              delete row["2P CHAR"];
              delete row["2P SA"];
              delete row["2P WIN/LOSS"];
              delete row["1P Perfect"];
              delete row["2P Perfect"];
              delete row["Mirror"];
              delete row["EVENT"];
              delete row["Type"];
              delete row["DATE"];
              delete row["Location"];
              delete row["Breakdown"];
              delete row["Version"];
              delete row["YT description"];
            });

            console.log(jsonData);

            if (jsonData.length > 0) {
              setHeaders(Object.keys(jsonData[0]));
            }

            setTableData(jsonData);
          }
        };
        reader.readAsBinaryString(file);
      } else {
        alert("Please upload a valid Excel file (.xlsx or .xls)");
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger the file input click
    }
  };

  const handlePushToDatabase = async () => {
    if (tableData.length === 0) {
      alert("No data to upload!");
      return;
    }

    try {
      const response = await fetch("/api/uploadMatches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tableData),
      });

      if (response.ok) {
        alert("Data uploaded successfully!");
      } else {
        alert("Error uploading data.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading data.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#f5f5f5", // Light font for dark background
      }}
    >
      {"UPLOAD EVENT MATCHES"}
      <br />
      <br />

      <button
        type="button"
        onClick={handleButtonClick}
        style={{
          backgroundColor: "#1E88E5",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        Upload Excel File
      </button>
      <input
        ref={fileInputRef} // Attach the ref to the input
        type="file"
        accept=".xlsx, .xls"
        style={{ display: "none" }} // Keep the input hidden
        onChange={handleFileUpload}
      />
      {/* Display the table if data is available */}
      {tableData.length > 0 && (
        <div>
          <table
            style={{
              overflowX: "auto",
              marginTop: "20px",
              width: "100%",
              borderCollapse: "collapse",
              color: "#333", // Dark font for table content
              backgroundColor: "#fff", // Light table background
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1976D2", color: "#fff" }}>
                {headers.map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      fontWeight: "bold",
                      borderBottom: "2px solid #ddd",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        borderBottom: "1px solid #ddd",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <button
            type="button"
            onClick={handlePushToDatabase}
            style={{
              backgroundColor: "#1E88E5",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginBottom: "20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Push to database
          </button>
        </div>
      )}
    </div>
  );
}
