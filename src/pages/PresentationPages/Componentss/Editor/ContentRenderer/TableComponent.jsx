"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "../../../../../context/StoreContext";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "src/components/ui/resizable";

const TableComponent = ({
  content,
  onChange,
  initialColSize = 3,
  initialRowSize = 3,
  isEditable = true,
  isPreview = false,
}) => {
  const { currentTheme } = useStore();
  const [rowSizes, setRowSizes] = useState([]);
  const [colSizes, setColSizes] = useState([]);
  const [tableData, setTableData] = useState(() => {
    // Handle AI-generated JSON table format
    if (content && content.table) {
      const { header, rows } = content.table;
      if (header && rows) {
        // Convert the JSON table format to the expected 2D array format
        const headerRow = header;
        const dataRows = rows.map((row) => Object.values(row));
        return [headerRow, ...dataRows];
      }
    }

    // Handle existing 2D array format
    if (
      Array.isArray(content) &&
      content.length > 0 &&
      Array.isArray(content[0])
    ) {
      return content;
    }

    // Default empty table
    return Array(initialRowSize || 3)
      .fill()
      .map(() => Array(initialColSize || 3).fill(""));
  });

  const handleResizeCol = (index, newSize) => {
    if (!isEditable) return;
    const newSizes = [...colSizes];
    newSizes[index] = newSize;
    setColSizes(newSizes);
  };

  const updateCell = (rowIndex, colIndex, value) => {
    if (!isEditable) return;

    // Create a deep copy of the tableData to avoid mutation issues
    const newData = tableData.map((row) => [...row]);
    newData[rowIndex][colIndex] = value;

    setTableData(newData);

    // If onChange is provided, call it with the updated data
    if (typeof onChange === "function") {
      onChange(newData);
    }
  };

  useEffect(() => {
    // Only update sizes if tableData is valid
    if (tableData && tableData.length > 0 && tableData[0].length > 0) {
      setRowSizes(new Array(tableData.length).fill(100 / tableData.length));
      setColSizes(
        new Array(tableData[0].length).fill(100 / tableData[0].length)
      );
    }
  }, []); // Only run once on mount to avoid infinite loops

  // Preview mode for the table
  if (isPreview) {
    return (
      <div className="w-full overflow-x-auto text-xs">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {tableData[0]?.map((cell, index) => (
                <th
                  key={index}
                  className="p-2 border bg-muted/20"
                  style={{ width: `${colSizes[index]}%` }}
                >
                  {cell || "Header"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ height: `${rowSizes[rowIndex + 1]}%` }}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 border">
                    {cell || "Cell data"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Editable mode with resizable panels
  return (
    <div
      className="w-full h-full relative"
      style={{
        background:
          currentTheme?.gradientBackground ||
          currentTheme?.backgroundColor ||
          "white",
        borderRadius: "8px",
      }}
    >
      <ResizablePanelGroup
        direction="vertical"
        className={`h-full w-full rounded-lg border ${
          tableData[0]?.length <= 2
            ? "min-h-[100px]"
            : tableData[0]?.length <= 3
            ? "min-h-[150px]"
            : "min-h-[200px]"
        }`}
        onLayout={(sizes) => setRowSizes(sizes)}
      >
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex > 0 && <ResizableHandle />}
            <ResizablePanel defaultSize={100 / tableData.length}>
              <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes) => setColSizes(sizes)}
                className="w-full h-full"
              >
                {row.map((cell, colIndex) => (
                  <React.Fragment key={colIndex}>
                    {colIndex > 0 && <ResizableHandle />}
                    <ResizablePanel
                      defaultSize={100 / row.length}
                      onResize={(size) => handleResizeCol(colIndex, size)}
                      className="w-full h-full min-h-9"
                    >
                      <div className="relative w-full h-full min-h-3">
                        <input
                          value={cell || ""}
                          onChange={(e) =>
                            updateCell(rowIndex, colIndex, e.target.value)
                          }
                          className="w-full h-full p-4 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                          style={{ color: currentTheme?.fontColor || "black" }}
                          placeholder={rowIndex === 0 ? "Header" : "Type here"}
                          readOnly={!isEditable}
                        />
                      </div>
                    </ResizablePanel>
                  </React.Fragment>
                ))}
              </ResizablePanelGroup>
            </ResizablePanel>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default TableComponent;
