import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Highlight, themes } from "prism-react-renderer";

interface TestOutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
}

const TestOutputModal = ({ isOpen, onClose, output }: TestOutputModalProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const formatOutput = (output: string) => {
    const lines = output.split("\n");
    let formattedOutput = "";
    let isCapturingPythonOutput = false;

    lines.forEach((line) => {
      // Skip Python output capture headers/footers
      if (line.includes("Captured stdout") || line.includes("===")) {
        isCapturingPythonOutput = line.includes("Captured stdout");
        formattedOutput += line + "\n";
        return;
      }

      // Handle Python test summary lines
      if (line.match(/(\d+) passed in \d+\.\d+s/)) {
        const [passed] = line.match(/\d+/g) || [];
        formattedOutput += `${passed} (pass) 0 (fail)\n`;
        return;
      }
      if (line.match(/(\d+) failed, (\d+) passed in/)) {
        const [failed, passed] = line.match(/\d+/g) || [];
        formattedOutput += `${passed} (pass) ${failed} (fail)\n`;
        return;
      }

      // Handle individual Python test results
      if (line.includes("FAILED") || line.includes("PASSED")) {
        const status = line.includes("FAILED") ? "(fail)" : "(pass)";
        // Extract test name, handling both formats
        let testName = line.split("::")[1]?.split(" -")[0]?.trim();
        if (!testName) {
          // Handle the format where test name comes first
          testName = line.split("PASSED")[0]?.split("FAILED")[0]?.trim();
        }
        if (testName) {
          // Remove percentage indicators if present
          testName = testName.replace(/\[\s*\d+%\s*\]/g, "").trim();
          formattedOutput += `${testName} ${status}\n`;
        } else {
          formattedOutput += line + "\n";
        }
        return;
      }

      // Handle captured output and other lines
      if (
        isCapturingPythonOutput ||
        (!line.trim().startsWith("===") && line.trim())
      ) {
        formattedOutput += line + "\n";
      }
    });

    return formattedOutput;
  };

  const getTestSummary = (output: string) => {
    const lines = output.split("\n");
    let passCount = 0;
    let failCount = 0;
    let foundSummary = false;

    // First try to find the summary line
    for (const line of lines) {
      // Python style summary line - all passed
      const allPassedMatch = line.match(/(\d+) passed in \d+\.\d+s/);
      if (allPassedMatch) {
        passCount = parseInt(allPassedMatch[1]);
        failCount = 0;
        foundSummary = true;
        break;
      }

      // Python style summary line - mixed results
      const mixedResultsMatch = line.match(/(\d+) failed, (\d+) passed in/);
      if (mixedResultsMatch) {
        failCount = parseInt(mixedResultsMatch[1]);
        passCount = parseInt(mixedResultsMatch[2]);
        foundSummary = true;
        break;
      }
    }

    // If no summary line found, count individual test results
    if (!foundSummary) {
      for (const line of lines) {
        if (line.includes("PASSED")) passCount++;
        if (line.includes("FAILED")) failCount++;
        if (line.includes("(pass)")) passCount++;
        if (line.includes("(fail)")) failCount++;
      }
    }

    return { passCount, failCount };
  };

  const getCondensedOutput = (output: string) => {
    const { passCount, failCount } = getTestSummary(output);
    return (
      <div className="flex items-center gap-4 ml-4 text-sm">
        {passCount > 0 && (
          <span className="text-[#28C840] flex items-center gap-1">
            <span className="text-xs">✓</span> {passCount} passing
          </span>
        )}
        {failCount > 0 && (
          <span className="text-[#FF5F57] flex items-center gap-1">
            <span className="text-xs">✗</span> {failCount} failing
          </span>
        )}
        {passCount === 0 && failCount === 0 && (
          <span className="text-gray-400">No tests run</span>
        )}
      </div>
    );
  };

  const modalContentClass = `
    fixed transition-all duration-300 ease-in-out
    bg-[#1C1D21] text-white overflow-hidden data-[state=open]:animate-contentShow z-[101]
    rounded-lg
    ${
      isMaximized
        ? "left-0 top-0 w-screen h-screen rounded-none"
        : isMinimized
        ? "right-4 bottom-4 w-[480px] h-12 rounded-t-lg shadow-lg hover:shadow-xl"
        : "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[60vw] max-h-[85vh]"
    }
  `;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow z-[100] ${
            isMinimized ? "hidden" : ""
          }`}
        />
        <Dialog.Title className="sr-only">Test Results</Dialog.Title>
        <Dialog.Description className="sr-only">
          Test Results
        </Dialog.Description>
        <Dialog.Content
          className={modalContentClass}
          aria-describedby="test-results"
        >
          <div
            className={`flex items-center px-4 py-2 bg-[#2D2E33] border-b border-gray-600 ${
              isMinimized
                ? "cursor-pointer hover:bg-[#383940] transition-colors"
                : ""
            }`}
            onClick={isMinimized ? handleRestore : undefined}
          >
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
                aria-label="Close"
                title="Close"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMinimize();
                }}
                className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors"
                aria-label="Minimize"
                title="Minimize"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMaximize();
                }}
                className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors"
                aria-label="Maximize"
                title={isMaximized ? "Restore" : "Maximize"}
              />
            </div>
            <div className="ml-4 text-sm text-gray-400">Test Results</div>
            {isMinimized ? (
              getCondensedOutput(output)
            ) : (
              <Dialog.Close asChild>
                <button
                  className="ml-auto text-gray-400 hover:text-white rounded-full h-6 w-6 inline-flex items-center justify-center"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            )}
          </div>

          {/* Terminal content */}
          {!isMinimized && (
            <div
              className={`p-6 font-mono text-sm overflow-y-auto ${
                isMaximized ? "h-[calc(100vh-3rem)]" : "max-h-[calc(85vh-4rem)]"
              }`}
            >
              <Highlight
                theme={themes.nightOwl}
                code={formatOutput(output)}
                language="typescript"
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={className}
                    style={{ ...style, background: "transparent" }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TestOutputModal;
