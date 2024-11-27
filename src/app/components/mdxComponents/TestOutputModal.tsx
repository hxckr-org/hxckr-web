import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Highlight, themes } from 'prism-react-renderer';

interface TestOutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
}

const TestOutputModal = ({ isOpen, onClose, output }: TestOutputModalProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Function to minimize the modal
  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  // Function to maximize/restore the modal
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false);
  };

  // Function to restore from minimized state
  const handleRestore = () => {
    setIsMinimized(false);
  };

  // Extract test results and format them
  const formatOutput = (output: string) => {
    const lines = output.split('\n');
    let formattedOutput = '';
    
    lines.forEach(line => {
      if (line.includes('(pass)')) {
        formattedOutput += line.replace('(pass)', '✓') + '\n';
      } else if (line.includes('(fail)')) {
        formattedOutput += line.replace('(fail)', '✗') + '\n';
      } else {
        formattedOutput += line + '\n';
      }
    });

    return formattedOutput;
  };

  // Function to get test summary
  const getTestSummary = (output: string) => {
    const lines = output.split('\n');
    const passCount = lines.filter(line => line.includes('(pass)')).length;
    const failCount = lines.filter(line => line.includes('(fail)')).length;
    return { passCount, failCount };
  };

  // Function to get condensed output for minimized view
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
      </div>
    );
  };

  const modalContentClass = `
    fixed transition-all duration-300 ease-in-out
    bg-[#1C1D21] text-white overflow-hidden data-[state=open]:animate-contentShow z-[101]
    rounded-lg
    ${isMaximized 
      ? 'left-0 top-0 w-screen h-screen rounded-none' 
      : isMinimized
        ? 'right-4 bottom-4 w-[480px] h-12 rounded-t-lg shadow-lg hover:shadow-xl' 
        : 'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[60vw] max-h-[85vh]'
    }
  `;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className={`fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow z-[100] ${
            isMinimized ? 'hidden' : ''
          }`} 
        />
        <Dialog.Content className={modalContentClass}>
          {/* Terminal header */}
          <div 
            className={`flex items-center px-4 py-2 bg-[#2D2E33] border-b border-gray-600 ${
              isMinimized ? 'cursor-pointer hover:bg-[#383940] transition-colors' : ''
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
            <div className={`p-6 font-mono text-sm overflow-y-auto ${
              isMaximized ? 'h-[calc(100vh-3rem)]' : 'max-h-[calc(85vh-4rem)]'
            }`}>
              <Highlight
                theme={themes.nightOwl}
                code={formatOutput(output)}
                language="typescript"
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={{ ...style, background: 'transparent' }}>
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